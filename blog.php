<?php
require_once __DIR__ . '/includes/functions.php';
$__title = 'Blog';
$posts = fetchAll("SELECT * FROM blog_posts WHERE status='published' ORDER BY published_at DESC");
include __DIR__ . '/includes/header.php';
?>
<section class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="<?= e(url('index.php')) ?>">Home</a> / Blog</div>
    <h1><?= e(block('blog','title','Insights & Blog')) ?></h1>
    <p><?= e(block('blog','subtitle')) ?></p>
  </div>
</section>
<section>
  <div class="container">
    <?php if ($posts): ?>
    <div class="grid-3">
      <?php foreach ($posts as $p): $bi = resolve_image($p['image_url']); ?>
      <a class="media-card" href="<?= e(url('blog-single.php?slug=' . urlencode($p['slug']))) ?>">
        <div class="thumb <?= $bi ? '' : 'placeholder' ?>">
          <?php if ($bi): ?><img src="<?= e($bi) ?>" alt="<?= e($p['title']) ?>" referrerpolicy="no-referrer">
          <?php else: ?><?= service_icon('data') ?><?php endif; ?>
        </div>
        <div class="body">
          <span class="tag"><?= e($p['category']) ?></span>
          <h3><?= e($p['title']) ?></h3>
          <p><?= e($p['excerpt'] ?: excerpt($p['content'])) ?></p>
          <div class="meta"><span><?= e($p['author']) ?></span><span><?= e(date('M j, Y', strtotime($p['published_at']))) ?></span></div>
        </div>
      </a>
      <?php endforeach; ?>
    </div>
    <?php else: ?><div class="empty">No posts yet. Add them from the admin panel.</div><?php endif; ?>
  </div>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
