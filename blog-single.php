<?php
require_once __DIR__ . '/includes/functions.php';
$slug = $_GET['slug'] ?? '';
$post = fetch1("SELECT * FROM blog_posts WHERE slug = ? AND status='published'", [$slug]);
if (!$post) {
    http_response_code(404);
    $__title = 'Post not found';
    include __DIR__ . '/includes/header.php';
    echo '<section><div class="container"><div class="empty">Sorry, this post could not be found. <a href="' . e(url('blog.php')) . '">Back to blog</a></div></div></section>';
    include __DIR__ . '/includes/footer.php';
    exit;
}
$__title = $post['title'];
$__desc  = $post['excerpt'] ?: excerpt($post['content']);
$bi = resolve_image($post['image_url']);
$more = fetchAll("SELECT title, slug FROM blog_posts WHERE status='published' AND id <> ? ORDER BY published_at DESC LIMIT 3", [$post['id']]);
include __DIR__ . '/includes/header.php';
?>
<section class="page-hero">
  <div class="container" style="max-width:820px">
    <div class="breadcrumb"><a href="<?= e(url('index.php')) ?>">Home</a> / <a href="<?= e(url('blog.php')) ?>">Blog</a> / <?= e($post['category']) ?></div>
    <h1><?= e($post['title']) ?></h1>
    <p style="margin-top:8px"><?= e($post['author']) ?> · <?= e(date('F j, Y', strtotime($post['published_at']))) ?></p>
  </div>
</section>
<section>
  <div class="container">
    <?php if ($bi): ?><div class="post-hero-img"><img src="<?= e($bi) ?>" alt="<?= e($post['title']) ?>" referrerpolicy="no-referrer"></div><?php endif; ?>
    <div class="post-body"><?= $post['content'] ?></div>
    <div style="text-align:center;margin-top:44px"><a href="<?= e(url('blog.php')) ?>" class="btn btn-outline">← Back to Blog</a></div>
  </div>
</section>
<?php if ($more): ?>
<section style="background:var(--bg-soft)">
  <div class="container">
    <div class="section-head"><h2>Keep reading</h2></div>
    <div class="grid-3">
      <?php foreach ($more as $m): ?>
      <a class="card" href="<?= e(url('blog-single.php?slug=' . urlencode($m['slug']))) ?>"><h3 style="font-size:1.1rem"><?= e($m['title']) ?></h3><span class="card-link">Read →</span></a>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php endif; ?>
<?php include __DIR__ . '/includes/footer.php'; ?>
