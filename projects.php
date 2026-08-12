<?php
require_once __DIR__ . '/includes/functions.php';
$__title = 'Projects';
$projects = fetchAll('SELECT * FROM projects WHERE active=1 ORDER BY featured DESC, sort, id');
include __DIR__ . '/includes/header.php';
?>
<section class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="<?= e(url('index.php')) ?>">Home</a> / Projects</div>
    <h1><?= e(block('projects','title','Projects & Case Studies')) ?></h1>
    <p><?= e(block('projects','subtitle')) ?></p>
  </div>
</section>
<section>
  <div class="container">
    <?php if ($projects): ?>
    <div class="grid-3">
      <?php foreach ($projects as $p): $pi = resolve_image($p['image_url']); ?>
      <div class="media-card">
        <div class="thumb <?= $pi ? '' : 'placeholder' ?>">
          <?php if ($pi): ?><img src="<?= e($pi) ?>" alt="<?= e($p['title']) ?>" referrerpolicy="no-referrer">
          <?php else: ?><?= service_icon('chart') ?><?php endif; ?>
        </div>
        <div class="body">
          <span class="tag"><?= e($p['category']) ?></span>
          <h3><?= e($p['title']) ?></h3>
          <?php if ($p['client']): ?><div class="meta"><span>Client: <b><?= e($p['client']) ?></b></span></div><?php endif; ?>
          <p style="margin-top:10px"><?= e($p['description']) ?></p>
          <?php if ($p['link']): ?><a href="<?= e($p['link']) ?>" target="_blank" rel="noopener" class="card-link">View project →</a><?php endif; ?>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
    <?php else: ?><div class="empty">No projects yet. Add them from the admin panel.</div><?php endif; ?>
  </div>
</section>
<section style="background:var(--bg-soft)">
  <div class="container"><div class="cta-band"><h2>Your project could be next</h2><p>Tell us what you're trying to achieve with your data.</p><a href="<?= e(url('contact.php')) ?>" class="btn btn-light">Start Your Project</a></div></div>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
