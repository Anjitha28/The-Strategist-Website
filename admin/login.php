<?php
require_once __DIR__ . '/auth.php';
if (is_logged_in()) { header('Location: ' . url('admin/index.php')); exit; }

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $u = trim($_POST['username'] ?? '');
    $p = $_POST['password'] ?? '';
    $user = fetch1('SELECT * FROM admin_users WHERE username = ? OR email = ?', [$u, $u]);
    if ($user && password_verify($p, $user['password_hash'])) {
        session_regenerate_id(true);
        $_SESSION['admin_id'] = $user['id'];
        header('Location: ' . url('admin/index.php'));
        exit;
    }
    $error = 'Incorrect username or password.';
}
?><!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Admin Login — <?= e(setting('site_name')) ?></title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="<?= e(url('admin/assets/admin.css')) ?>">
<style>:root{--primary:<?= e(setting('color_primary')) ?>;--secondary:<?= e(setting('color_secondary')) ?>;--dark:<?= e(setting('color_dark')) ?>}</style>
</head><body class="login-page">
<div class="login-card">
  <div class="login-brand"><span class="brand-mark">TS</span><h1><?= e(setting('site_name')) ?></h1><p>Admin Panel</p></div>
  <?php if ($error): ?><div class="alert alert-error"><?= e($error) ?></div><?php endif; ?>
  <form method="post">
    <?= csrf_field() ?>
    <div class="field"><label>Username or Email</label><input type="text" name="username" autofocus required></div>
    <div class="field"><label>Password</label><input type="password" name="password" required></div>
    <button class="btn btn-primary" style="width:100%">Sign In</button>
  </form>
  <p class="login-hint">Default login: <b>admin</b> / <b>admin123</b> — change it after signing in.</p>
  <a class="login-back" href="<?= e(url('index.php')) ?>">← Back to website</a>
</div>
</body></html>
