<?php
require_once __DIR__ . '/includes/functions.php';
$__title = 'Home';
$services = fetchAll('SELECT * FROM services WHERE active=1 ORDER BY sort, id LIMIT 6');
$projects = fetchAll('SELECT * FROM projects WHERE active=1 ORDER BY featured DESC, sort, id LIMIT 3');
$posts    = fetchAll("SELECT * FROM blog_posts WHERE status='published' ORDER BY published_at DESC LIMIT 3");
$clients  = fetchAll('SELECT * FROM clients WHERE active=1 ORDER BY sort, id');
$heroImg  = resolve_image(block('home','hero_image'));
include __DIR__ . '/includes/header.php';
?>
<?php
// Split the hero title so the last word(s) get a coloured gradient highlight
$htitle = block('home','hero_title','Analytics That Drive Decisions');
$words = explode(' ', $htitle);
$hl = ''; $head = $htitle;
if (count($words) > 2) { $hl = array_pop($words); $hl = array_pop($words) . ' ' . $hl; $head = implode(' ', $words); }
?>
<section class="hero">
  <div class="container hero-grid">
    <div class="hero-copy reveal">
      <span class="eyebrow"><?= e(block('home','hero_eyebrow','EXPLORE DATA')) ?></span>
      <h1><?= e($head) ?><?php if ($hl): ?> <span class="hl"><?= e($hl) ?></span><?php endif; ?></h1>
      <p class="lead"><?= e(block('home','hero_subtitle')) ?></p>
      <div class="hero-cta">
        <a href="<?= e(url(block('home','hero_cta_link','projects.php'))) ?>" class="btn btn-primary"><?= e(block('home','hero_cta_text','Explore Our Work')) ?></a>
        <a href="<?= e(url('contact.php')) ?>" class="btn btn-outline">Talk to Us</a>
      </div>
      <?php
        $hs = ['social_linkedin'=>'in','social_twitter'=>'tw','social_facebook'=>'fb','social_instagram'=>'ig'];
        $hasSocial = false; foreach ($hs as $k=>$v){ if(setting($k) && setting($k)!=='#'){ $hasSocial=true; break; } }
      ?>
      <?php if ($hasSocial): ?>
      <div class="hero-social">
        <?php foreach ($hs as $k=>$lbl): $lnk=setting($k); if($lnk && $lnk!=='#'): ?>
          <a href="<?= e($lnk) ?>" target="_blank" rel="noopener" aria-label="<?= e($k) ?>"><?= e($lbl) ?></a>
        <?php endif; endforeach; ?>
      </div>
      <?php endif; ?>
    </div>
    <div class="hero-visual reveal">
      <span class="fx diamond d1"></span>
      <span class="fx diamond d2"></span>
      <span class="fx dot p1"></span>
      <span class="fx ring"></span>
      <?php if ($heroImg): ?>
        <img src="<?= e($heroImg) ?>" alt="Data analytics" referrerpolicy="no-referrer">
      <?php else: ?>
        <div class="hero-cards">
          <div class="hc hc-1">
            <span class="hc-ic"><?= service_icon('analytics') ?></span>
            <div><b>Data Analytics</b><small>Answers from your data</small></div>
          </div>
          <div class="hc hc-2">
            <span class="hc-ic"><?= service_icon('automation') ?></span>
            <div><b>Report Automation</b><small>Delivered on schedule</small></div>
          </div>
          <div class="hc hc-3">
            <span class="hc-ic"><?= service_icon('gear') ?></span>
            <div><b>Expert Training</b><small>Upskill your team</small></div>
          </div>
        </div>
      <?php endif; ?>
    </div>
  </div>
</section>

<div class="container stats" style="position:relative;z-index:5">
  <div class="stats-grid">
    <div class="stat"><b data-count="<?= e(block('home','stats_projects','120+')) ?>"><?= e(block('home','stats_projects','120+')) ?></b><span>Projects Delivered</span></div>
    <div class="stat"><b data-count="<?= e(block('home','stats_clients','40+')) ?>"><?= e(block('home','stats_clients','40+')) ?></b><span>Organisations Served</span></div>
    <div class="stat"><b data-count="<?= e(block('home','stats_trained','2,500+')) ?>"><?= e(block('home','stats_trained','2,500+')) ?></b><span>Professionals Trained</span></div>
    <div class="stat"><b data-count="<?= e(block('home','stats_years','10+')) ?>"><?= e(block('home','stats_years','10+')) ?></b><span>Years of Experience</span></div>
  </div>
</div>

<?php if ($clients): ?>
<section class="clients-section">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Clients &amp; Partners</span>
      <h2><?= e(block('home','clients_title','Trusted by teams we work with')) ?></h2>
      <p><?= e(block('home','clients_subtitle')) ?></p>
    </div>
    <div class="logos-strip">
      <?php foreach ($clients as $cl): $lg = resolve_image($cl['logo_url']); ?>
        <?php if ($cl['link']): ?><a href="<?= e($cl['link']) ?>" target="_blank" rel="noopener" class="logo-item" title="<?= e($cl['name']) ?>"><?php else: ?><div class="logo-item" title="<?= e($cl['name']) ?>"><?php endif; ?>
          <?php if ($lg): ?>
            <img src="<?= e($lg) ?>" alt="<?= e($cl['name']) ?>" referrerpolicy="no-referrer">
          <?php else: ?>
            <span class="logo-name"><?= e($cl['name']) ?></span>
          <?php endif; ?>
        <?php echo $cl['link'] ? '</a>' : '</div>'; ?>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php endif; ?>

<section>
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Services</span>
      <h2><?= e(block('home','services_title','What We Do')) ?></h2>
      <p><?= e(block('home','services_subtitle')) ?></p>
    </div>
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
        <a href="<?= e(url('services.php')) ?>" class="card-link">Learn more →</a>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<?php if ($projects): ?>
<section style="background:var(--bg-soft)">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Portfolio</span>
      <h2>Featured Projects</h2>
      <p>Real outcomes we have delivered for organisations.</p>
    </div>
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
          <p><?= e(excerpt($p['description'],110)) ?></p>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
    <div style="text-align:center;margin-top:40px"><a href="<?= e(url('projects.php')) ?>" class="btn btn-primary">View All Projects</a></div>
  </div>
</section>
<?php endif; ?>

<section>
  <div class="container split">
    <div class="media">
      <?php if ($ai = resolve_image(block('about','image'))): ?>
        <img src="<?= e($ai) ?>" alt="About The Strategist" referrerpolicy="no-referrer">
      <?php endif; ?>
    </div>
    <div>
      <span class="eyebrow">Training</span>
      <h2>We don't just deliver — we teach</h2>
      <p style="color:var(--muted)">Beyond projects, we run practical, project-based training for colleges and working professionals, so your teams can own their data long after we leave.</p>
      <div class="value-list">
        <div class="v"><span class="dot">✓</span><div><b>Hands-on & project-based</b><br><span style="color:var(--muted)">Learn by building real reports and data pipelines.</span></div></div>
        <div class="v"><span class="dot">✓</span><div><b>For colleges & professionals</b><br><span style="color:var(--muted)">Curricula tailored to students and working teams.</span></div></div>
        <div class="v"><span class="dot">✓</span><div><b>Industry-ready tools</b><br><span style="color:var(--muted)">Excel, SQL, Python, Power BI and more.</span></div></div>
      </div>
      <a href="<?= e(url('training.php')) ?>" class="btn btn-primary" style="margin-top:24px">Explore Training</a>
    </div>
  </div>
</section>

<?php if ($posts): ?>
<section style="background:var(--bg-soft)">
  <div class="container">
    <div class="section-head"><span class="eyebrow">Blog</span><h2>Latest Insights</h2></div>
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
          <p><?= e($p['excerpt'] ?: excerpt($p['content'],110)) ?></p>
        </div>
      </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php endif; ?>

<section>
  <div class="container">
    <div class="cta-band">
      <h2><?= e(block('home','cta_title','Ready to make your data work harder?')) ?></h2>
      <p><?= e(block('home','cta_subtitle')) ?></p>
      <a href="<?= e(url('contact.php')) ?>" class="btn btn-light">Get in Touch</a>
    </div>
  </div>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
