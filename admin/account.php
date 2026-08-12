<?php
require_once __DIR__ . '/layout.php';
require_login();
$admin = current_admin();
$msg = ''; $err = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $name  = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $user  = trim($_POST['username'] ?? '');
    $cur   = $_POST['current_password'] ?? '';
    $new   = $_POST['new_password'] ?? '';
    $conf  = $_POST['confirm_password'] ?? '';

    if ($name === '' || $user === '' || $email === '') {
        $err = 'Name, username and email are required.';
    } elseif ($new !== '' && !password_verify($cur, $admin['password_hash'])) {
        $err = 'To change your password, enter your current password correctly.';
    } elseif ($new !== '' && $new !== $conf) {
        $err = 'New password and confirmation do not match.';
    } elseif ($new !== '' && strlen($new) < 6) {
        $err = 'New password must be at least 6 characters.';
    } else {
        // unique username/email check
        $clash = fetch1('SELECT id FROM admin_users WHERE (username=? OR email=?) AND id<>?', [$user, $email, $admin['id']]);
        if ($clash) {
            $err = 'That username or email is already in use.';
        } else {
            if ($new !== '') {
                q('UPDATE admin_users SET name=?,username=?,email=?,password_hash=? WHERE id=?',
                  [$name,$user,$email,password_hash($new, PASSWORD_BCRYPT),$admin['id']]);
            } else {
                q('UPDATE admin_users SET name=?,username=?,email=? WHERE id=?', [$name,$user,$email,$admin['id']]);
            }
            flash('Account updated.' . ($new!==''?' Password changed.':''));
            header('Location: ' . url('admin/account.php')); exit;
        }
    }
    $admin = array_merge($admin, ['name'=>$name,'username'=>$user,'email'=>$email]);
}
admin_header('account.php');
?>
<div class="panel" style="max-width:640px">
  <h2>My Account</h2>
  <p class="sub">Update your login details. Change the default password here for security.</p>
  <?php if ($err): ?><div class="alert alert-error"><?= e($err) ?></div><?php endif; ?>
  <form method="post">
    <?= csrf_field() ?>
    <div class="grid-2c">
      <div class="field"><label>Full name</label><input type="text" name="name" value="<?= e($admin['name']) ?>" required></div>
      <div class="field"><label>Username</label><input type="text" name="username" value="<?= e($admin['username']) ?>" required></div>
    </div>
    <div class="field"><label>Email</label><input type="email" name="email" value="<?= e($admin['email']) ?>" required></div>
    <hr class="section-divider">
    <p class="hint" style="margin-bottom:14px">Leave the password fields blank to keep your current password.</p>
    <div class="field"><label>Current password</label><input type="password" name="current_password" autocomplete="current-password"></div>
    <div class="grid-2c">
      <div class="field"><label>New password</label><input type="password" name="new_password" autocomplete="new-password"></div>
      <div class="field"><label>Confirm new password</label><input type="password" name="confirm_password" autocomplete="new-password"></div>
    </div>
    <div class="form-actions"><button class="btn btn-primary">Save Account</button></div>
  </form>
</div>
<?php admin_footer(); ?>
