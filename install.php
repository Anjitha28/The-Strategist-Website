<?php
/* =====================================================================
   The Strategist — Web Installer
   Visit this page once in your browser (e.g. https://yoursite.com/install.php)
   after editing config/config.php. It creates all tables and the admin user.
   DELETE THIS FILE once setup is complete.
   ===================================================================== */
require_once __DIR__ . '/config/config.php';

$done = false; $error = ''; $steps = [];
$run = ($_SERVER['REQUEST_METHOD'] === 'POST');

if ($run) {
    try {
        $pdo = new PDO('mysql:host=' . DB_HOST . ';charset=utf8mb4', DB_USER, DB_PASS,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
        $pdo->exec('CREATE DATABASE IF NOT EXISTS `' . DB_NAME . '` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
        $steps[] = 'Database "' . DB_NAME . '" ready.';
        $pdo->exec('USE `' . DB_NAME . '`');

        $sql = file_get_contents(__DIR__ . '/config/schema.sql');
        if ($sql === false) throw new Exception('Could not read config/schema.sql');
        // Run the schema. Split on semicolons at line ends (simple, safe for this file).
        $pdo->exec($sql);
        $steps[] = 'All tables created and sample content loaded.';

        // Ensure the admin user has a correct, freshly-hashed password.
        $hash = password_hash('admin123', PASSWORD_BCRYPT);
        $exists = $pdo->query("SELECT id FROM admin_users WHERE username='admin'")->fetch();
        if ($exists) {
            $st = $pdo->prepare('UPDATE admin_users SET password_hash=? WHERE username=?');
            $st->execute([$hash, 'admin']);
        } else {
            $st = $pdo->prepare('INSERT INTO admin_users (name,username,email,password_hash,role) VALUES (?,?,?,?,?)');
            $st->execute(['Administrator','admin','admin@thestrategist.com',$hash,'superadmin']);
        }
        $steps[] = 'Admin account ready — username: admin, password: admin123';
        $done = true;
    } catch (Throwable $ex) {
        $error = $ex->getMessage();
    }
}
?><!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Install — The Strategist</title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<style>
body{font-family:Inter,sans-serif;background:#f4f4fb;color:#2b2b3a;display:grid;place-items:center;min-height:100vh;margin:0}
.box{background:#fff;width:min(560px,92%);padding:40px;border-radius:18px;box-shadow:0 20px 50px -24px rgba(45,42,84,.5)}
h1{font-family:'Plus Jakarta Sans';color:#2D2A54;margin:0 0 6px}
p.sub{color:#71718a;margin:0 0 22px}
.mark{width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#6C5CE7,#00B8D4);color:#fff;display:grid;place-items:center;font-weight:800;font-family:'Plus Jakarta Sans';margin-bottom:16px}
.btn{background:linear-gradient(135deg,#6C5CE7,#00B8D4);color:#fff;border:0;padding:13px 22px;border-radius:10px;font-weight:600;font-family:'Plus Jakarta Sans';cursor:pointer;font-size:1rem}
.ok{background:#e7f9f0;color:#0a7f52;border:1px solid #b6ecd3;padding:14px 16px;border-radius:10px;margin:8px 0}
.err{background:#fdeaee;color:#b3243c;border:1px solid #f6c9d3;padding:14px 16px;border-radius:10px;margin:14px 0}
.warn{background:#fff6e6;color:#a76a00;border:1px solid #ffe2ac;padding:14px 16px;border-radius:10px;margin:16px 0;font-size:.92rem}
code{background:#f0f0f8;padding:2px 6px;border-radius:5px}
ul{padding-left:18px} li{margin:6px 0}
a.cta{display:inline-block;margin-top:8px;color:#6C5CE7;font-weight:600}
.dl{font-size:.9rem;color:#71718a;line-height:1.7;background:#f7f7fc;padding:14px 16px;border-radius:10px;margin-top:18px}
</style></head><body>
<div class="box">
  <div class="mark">TS</div>
  <?php if ($done): ?>
    <h1>Installation complete 🎉</h1>
    <p class="sub">Your website is ready.</p>
    <?php foreach ($steps as $s): ?><div class="ok">✓ <?= htmlspecialchars($s) ?></div><?php endforeach; ?>
    <div class="warn"><b>Important — delete this file now.</b> For security, delete <code>install.php</code> from your server.</div>
    <p><a class="cta" href="admin/login.php">→ Go to the Admin Panel</a> &nbsp;·&nbsp; <a class="cta" href="index.php">View Website</a></p>
    <div class="dl"><b>Your login:</b><br>Username: <code>admin</code><br>Password: <code>admin123</code><br>Change this immediately under <b>My Account</b>.</div>
  <?php else: ?>
    <h1>Install The Strategist</h1>
    <p class="sub">This will create the database tables and sample content.</p>
    <?php if ($error): ?>
      <div class="err"><b>Something went wrong:</b><br><?= htmlspecialchars($error) ?></div>
      <p class="sub">Check your database details in <code>config/config.php</code> and try again.</p>
    <?php endif; ?>
    <div class="dl">
      <b>Before you click:</b>
      <ul>
        <li>Open <code>config/config.php</code> and enter your database name, username and password.</li>
        <li>Make sure the database user has permission to create tables.</li>
      </ul>
      Current target: host <code><?= htmlspecialchars(DB_HOST) ?></code>, database <code><?= htmlspecialchars(DB_NAME) ?></code>, user <code><?= htmlspecialchars(DB_USER) ?></code>.
    </div>
    <form method="post" style="margin-top:20px"><button class="btn">Run Installation</button></form>
  <?php endif; ?>
</div>
</body></html>
