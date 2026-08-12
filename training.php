<?php
require_once __DIR__ . '/includes/functions.php';
$__title = 'Training & Courses';
$courses = fetchAll('SELECT * FROM training WHERE active=1 ORDER BY sort, id');
include __DIR__ . '/includes/header.php';
?>
<section class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="<?= e(url('index.php')) ?>">Home</a> / Training</div>
    <h1><?= e(block('training','title','Training & Courses')) ?></h1>
    <p><?= e(block('training','subtitle')) ?></p>
  </div>
</section>
<section>
  <div class="container">
    <?php if ($courses): ?>
    <div class="grid-3">
      <?php foreach ($courses as $c): $ci = resolve_image($c['image_url']); ?>
      <div class="media-card">
        <div class="thumb <?= $ci ? '' : 'placeholder' ?>">
          <?php if ($ci): ?><img src="<?= e($ci) ?>" alt="<?= e($c['title']) ?>" referrerpolicy="no-referrer">
          <?php else: ?><?= service_icon('gear') ?><?php endif; ?>
        </div>
        <div class="body">
          <span class="tag"><?= e($c['audience']) ?></span>
          <h3><?= e($c['title']) ?></h3>
          <p><?= e($c['description']) ?></p>
          <div class="meta">
            <span>Level: <b><?= e($c['level']) ?></b></span>
            <span>Duration: <b><?= e($c['duration']) ?></b></span>
            <?php if ($c['price'] !== ''): ?><span>Fee: <b><?= e($c['price']) ?></b></span><?php endif; ?>
          </div>
          <a href="<?= e(url('contact.php?subject=' . urlencode('Enquiry: ' . $c['title']))) ?>" class="btn btn-primary" style="margin-top:18px">Enquire / Enrol</a>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
    <?php else: ?><div class="empty">No courses yet. Add them from the admin panel.</div><?php endif; ?>
  </div>
</section>
<section style="background:var(--bg-soft)">
  <div class="container"><div class="cta-band"><h2>Training for your college or company?</h2><p>We design custom cohorts and curricula. Let's talk about your goals.</p><a href="<?= e(url('contact.php')) ?>" class="btn btn-light">Request a Custom Programme</a></div></div>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
