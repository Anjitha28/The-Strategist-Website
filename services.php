<?php
require_once __DIR__ . '/includes/functions.php';
$__title = 'Services';
$services = fetchAll('SELECT * FROM services WHERE active=1 ORDER BY sort, id');
include __DIR__ . '/includes/header.php';
?>
<section class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="<?= e(url('index.php')) ?>">Home</a> / Services</div>
    <h1><?= e(block('services','title','Our Services')) ?></h1>
    <p><?= e(block('services','subtitle')) ?></p>
  </div>
</section>
<section>
  <div class="container">
    <?php if ($services): ?>
    <div class="grid-3">
      <?php foreach ($services as $s): ?>
      <div class="card">
        <div class="ic">
          <?php if ($img = resolve_image($s['image_url'])): ?>
            <img src="<?= e($img) ?>" alt="" style="width:34px;height:34px;object-fit:contain" referrerpolicy="no-referrer">
          <?php else: ?><?= service_icon($s['icon']) ?><?php endif; ?>
        </div>
        <h3><?= e($s['title']) ?></h3>
        <p><?= e($s['description']) ?></p>
      </div>
      <?php endforeach; ?>
    </div>
    <?php else: ?><div class="empty">No services yet. Add them from the admin panel.</div><?php endif; ?>
  </div>
</section>
<section style="background:var(--bg-soft)">
  <div class="container"><div class="cta-band"><h2>Not sure where to start?</h2><p>Tell us your goal and we'll recommend the right service for you.</p><a href="<?= e(url('contact.php')) ?>" class="btn btn-light">Get a Free Consultation</a></div></div>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
