<?php
require_once __DIR__ . '/includes/functions.php';
if (session_status() === PHP_SESSION_NONE) { session_name(SESSION_NAME); session_start(); }
$__title = 'Contact';

$sent = false; $error = '';
$name = $email = $phone = $subject = $message = '';
$subject = $_GET['subject'] ?? '';

// simple CSRF token
if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(16));

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token   = $_POST['csrf'] ?? '';
    $name    = trim($_POST['name'] ?? '');
    $email   = trim($_POST['email'] ?? '');
    $phone   = trim($_POST['phone'] ?? '');
    $subject = trim($_POST['subject'] ?? '');
    $message = trim($_POST['message'] ?? '');
    $hp      = trim($_POST['website'] ?? ''); // honeypot

    if (!hash_equals($_SESSION['csrf'], $token))         $error = 'Your session expired. Please try again.';
    elseif ($hp !== '')                                   $error = 'Spam detected.';
    elseif ($name === '' || $email === '' || $message === '') $error = 'Please fill in your name, email and message.';
    elseif (!filter_var($email, FILTER_VALIDATE_EMAIL))  $error = 'Please enter a valid email address.';
    else {
        q('INSERT INTO leads (name,email,phone,subject,message) VALUES (?,?,?,?,?)',
          [$name, $email, $phone, $subject ?: 'General Enquiry', $message]);
        // Optional email notification to admin
        $to = setting('contact_email');
        if ($to) {
            $body = "New enquiry from the website:\n\nName: $name\nEmail: $email\nPhone: $phone\nSubject: $subject\n\n$message";
            @mail($to, 'New website enquiry: ' . ($subject ?: 'General'), $body, 'From: ' . $to);
        }
        $sent = true;
        $name = $email = $phone = $subject = $message = '';
        $_SESSION['csrf'] = bin2hex(random_bytes(16));
    }
}
$mapEmbed = trim(setting('map_embed'));
include __DIR__ . '/includes/header.php';
?>
<section class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="<?= e(url('index.php')) ?>">Home</a> / Contact</div>
    <h1><?= e(block('contact','title','Get in Touch')) ?></h1>
    <p><?= e(block('contact','subtitle')) ?></p>
  </div>
</section>
<section>
  <div class="container contact-grid">
    <div class="contact-info">
      <span class="eyebrow">Contact details</span>
      <h2 style="font-size:1.6rem">We'd love to hear from you</h2>
      <div style="margin-top:26px">
        <?php if ($em = setting('contact_email')): ?>
        <div class="info-row"><span class="ic">@</span><div><b>Email</b><br><a href="mailto:<?= e($em) ?>" style="color:var(--primary)"><?= e($em) ?></a></div></div>
        <?php endif; ?>
        <?php if ($ph = setting('contact_phone')): ?>
        <div class="info-row"><span class="ic">☎</span><div><b>Phone</b><br><a href="tel:<?= e($ph) ?>" style="color:var(--primary)"><?= e($ph) ?></a></div></div>
        <?php endif; ?>
        <?php if ($ad = setting('contact_address')): ?>
        <div class="info-row"><span class="ic">⌂</span><div><b>Address</b><br><?= e($ad) ?></div></div>
        <?php endif; ?>
      </div>
      <?php if ($mapEmbed): ?>
      <div style="margin-top:20px;border-radius:16px;overflow:hidden;box-shadow:var(--shadow)"><?= $mapEmbed ?></div>
      <?php endif; ?>
    </div>
    <div class="form-card">
      <?php if ($sent): ?>
        <div class="alert alert-success">Thank you! Your message has been sent. We'll get back to you soon.</div>
      <?php elseif ($error): ?>
        <div class="alert alert-error"><?= e($error) ?></div>
      <?php endif; ?>
      <form method="post" novalidate>
        <input type="hidden" name="csrf" value="<?= e($_SESSION['csrf']) ?>">
        <div style="position:absolute;left:-9999px" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
        <div class="field"><label>Your Name *</label><input type="text" name="name" value="<?= e($name) ?>" required></div>
        <div class="field"><label>Email Address *</label><input type="email" name="email" value="<?= e($email) ?>" required></div>
        <div class="field"><label>Phone</label><input type="text" name="phone" value="<?= e($phone) ?>"></div>
        <div class="field"><label>Subject</label><input type="text" name="subject" value="<?= e($subject) ?>"></div>
        <div class="field"><label>Message *</label><textarea name="message" rows="5" required><?= e($message) ?></textarea></div>
        <button type="submit" class="btn btn-primary" style="width:100%">Send Message</button>
      </form>
    </div>
  </div>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
