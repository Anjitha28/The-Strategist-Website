<?php
require_once __DIR__ . '/includes/functions.php';
$__title = 'About Us';
$img = resolve_image(block('about','image'));
include __DIR__ . '/includes/header.php';
?>
<section class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="<?= e(url('index.php')) ?>">Home</a> / About</div>
    <h1><?= e(block('about','title','About The Strategist')) ?></h1>
    <p><?= e(block('about','intro')) ?></p>
  </div>
</section>

<section>
  <div class="container split">
    <div class="media">
      <?php if ($img): ?><img src="<?= e($img) ?>" alt="About us" referrerpolicy="no-referrer"><?php endif; ?>
    </div>
    <div>
      <span class="eyebrow">Our Story</span>
      <div style="color:var(--ink)"><?= block('about','story') ?></div>
    </div>
  </div>
</section>

<section style="background:var(--bg-soft)">
  <div class="container grid-2">
    <div class="card">
      <div class="ic"><?= service_icon('project') ?></div>
      <h3>Our Mission</h3>
      <p><?= e(block('about','mission')) ?></p>
    </div>
    <div class="card">
      <div class="ic"><?= service_icon('analytics') ?></div>
      <h3>Our Vision</h3>
      <p><?= e(block('about','vision')) ?></p>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-head"><span class="eyebrow">Why Us</span><h2>What sets us apart</h2></div>
    <div class="grid-3">
      <div class="card"><div class="ic"><?= service_icon('data') ?></div><h3>10+ Years Experience</h3><p>A decade delivering analytics, visualisation and automation across industries.</p></div>
      <div class="card"><div class="ic"><?= service_icon('automation') ?></div><h3>Project-First Approach</h3><p>We focus on real, deployed outcomes — not slideware.</p></div>
      <div class="card"><div class="ic"><?= service_icon('gear') ?></div><h3>Training Built In</h3><p>We upskill your team so the value lasts long after handover.</p></div>
    </div>
  </div>
</section>

<section style="background:var(--bg-soft)">
  <div class="container"><div class="cta-band"><h2>Let's build something with your data</h2><p>From a single report to a full analytics programme — we're ready.</p><a href="<?= e(url('contact.php')) ?>" class="btn btn-light">Start a Conversation</a></div></div>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
