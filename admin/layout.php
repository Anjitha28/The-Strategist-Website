<?php
/* Admin chrome: call admin_header($active) at top, admin_footer() at bottom. */
require_once __DIR__ . '/auth.php';

function admin_header($active = '') {
    require_login();
    $admin = current_admin();
    $items = [
      'index.php'    => ['Overview','▤'],
      'content.php'  => ['Page Content','✎'],
      'services.php' => ['Services','⚙'],
      'training.php' => ['Training','🎓'],
      'projects.php' => ['Projects','📁'],
      'clients.php'  => ['Clients / Logos','🏢'],
      'blog.php'     => ['Blog','📝'],
      'leads.php'    => ['Leads','✉'],
      'settings.php' => ['Settings & Branding','🎨'],
      'account.php'  => ['My Account','👤'],
    ];
    $flash = get_flash();
    ?><!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Admin — <?= e(setting('site_name')) ?></title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="<?= e(url('admin/assets/admin.css')) ?>">
<style>:root{--primary:<?= e(setting('color_primary')) ?>;--secondary:<?= e(setting('color_secondary')) ?>;--accent:<?= e(setting('color_accent')) ?>;--dark:<?= e(setting('color_dark')) ?>}</style>
</head><body>
<div class="admin-shell">
  <aside class="sidebar" id="sidebar">
    <a class="side-brand" href="<?= e(url('admin/index.php')) ?>"><span class="brand-mark">TS</span><span><?= e(setting('site_name')) ?><small>Admin</small></span></a>
    <nav class="side-nav">
      <?php foreach ($items as $file => $it): ?>
        <a href="<?= e(url('admin/' . $file)) ?>" class="<?= $active === $file ? 'active' : '' ?>"><span class="ico"><?= $it[1] ?></span><?= e($it[0]) ?></a>
      <?php endforeach; ?>
    </nav>
    <div class="side-foot">
      <a href="<?= e(url('index.php')) ?>" target="_blank">↗ View Website</a>
      <a href="<?= e(url('admin/logout.php')) ?>" class="logout">⏻ Logout</a>
    </div>
  </aside>
  <div class="admin-main">
    <header class="admin-top">
      <button class="menu-btn" id="menuBtn">☰</button>
      <div class="top-title"><?= e($items[$active][0] ?? 'Admin') ?></div>
      <div class="top-user">👤 <?= e($admin['name']) ?></div>
    </header>
    <div class="admin-content">
      <?php if ($flash): ?><div class="alert alert-<?= e($flash['t']) ?>"><?= e($flash['m']) ?></div><?php endif; ?>
<?php
}

function admin_footer() {
    ?>
    </div>
  </div>
</div>
<script>
  var mb=document.getElementById('menuBtn'),sb=document.getElementById('sidebar');
  if(mb&&sb)mb.addEventListener('click',function(){sb.classList.toggle('open')});
  // auto-preview image links
  document.querySelectorAll('[data-preview]').forEach(function(inp){
    var box=document.querySelector(inp.getAttribute('data-preview'));
    function upd(){var v=inp.value.trim();if(box){box.innerHTML=v?'<img src="'+resolveImg(v)+'" referrerpolicy="no-referrer" onerror="this.parentNode.innerHTML=\'<span class=bad>Could not load image — check the link is set to <b>Anyone with the link</b></span>\'">':'<span class=hint>Paste a Google Drive / OneDrive link to preview</span>';}}
    inp.addEventListener('input',upd);upd();
  });
  function resolveImg(u){
    var m=u.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);if(m)return'https://drive.google.com/thumbnail?id='+m[1]+'&sz=w1600';
    m=u.match(/drive\.google\.com\/(?:open|uc)\?(?:export=\w+&)?id=([a-zA-Z0-9_-]+)/);if(m)return'https://drive.google.com/thumbnail?id='+m[1]+'&sz=w1600';
    if(/1drv\.ms|onedrive\.live\.com|sharepoint\.com/.test(u)&&!/download=1|embed/.test(u))return u+(u.indexOf('?')>-1?'&':'?')+'download=1';
    return u;
  }
</script>
</body></html>
<?php
}
