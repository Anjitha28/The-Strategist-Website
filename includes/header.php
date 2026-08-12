<?php
require_once __DIR__ . '/functions.php';
$__page   = $__page   ?? '';
$__title  = $__title  ?? setting('site_name', 'The Strategist');
$__desc   = $__desc   ?? setting('seo_description');
$nav = [
  'index.php'    => 'Home',
  'about.php'    => 'About',
  'services.php' => 'Services',
  'training.php' => 'Training',
  'projects.php' => 'Projects',
  'blog.php'     => 'Blog',
  'contact.php'  => 'Contact',
];
$cur = basename($_SERVER['SCRIPT_NAME']);
$logo = resolve_image(setting('logo_url'));
?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= e($__title) ?> — <?= e(setting('site_name')) ?></title>
<meta name="description" content="<?= e($__desc) ?>">
<meta name="keywords" content="<?= e(setting('seo_keywords')) ?>">
<?php if ($fav = resolve_image(setting('favicon_url'))): ?>
<link rel="icon" href="<?= e($fav) ?>">
<?php endif; ?>
<meta property="og:title" content="<?= e($__title) ?>">
<meta property="og:description" content="<?= e($__desc) ?>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="<?= e(url('assets/css/style.css')) ?>">
<style>
  :root{
    --primary: <?= e(setting('color_primary','#6D4AFF')) ?>;
    --secondary: <?= e(setting('color_secondary','#FF6B5E')) ?>;
    --accent: <?= e(setting('color_accent','#FF4E8E')) ?>;
    --dark: <?= e(setting('color_dark','#241246')) ?>;
  }
</style>
<?php if ($gt = setting('gtag_id')): ?>
<script async src="https://www.googletagmanager.com/gtag/js?id=<?= e($gt) ?>"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','<?= e($gt) ?>');</script>
<?php endif; ?>
</head>
<body>
<header class="site-header" id="siteHeader">
  <div class="container header-inner">
    <a class="brand" href="<?= e(url('index.php')) ?>">
      <?php if ($logo): ?>
        <img src="<?= e($logo) ?>" alt="<?= e(setting('site_name')) ?>" class="brand-logo" referrerpolicy="no-referrer">
      <?php else: ?>
        <span class="brand-mark">TS</span>
      <?php endif; ?>
      <span class="brand-name"><?= e(setting('site_name')) ?></span>
    </a>
    <button class="nav-toggle" id="navToggle" aria-label="Menu"><span></span><span></span><span></span></button>
    <nav class="main-nav" id="mainNav">
      <?php foreach ($nav as $file => $label): ?>
        <a href="<?= e(url($file)) ?>" class="<?= $cur === $file ? 'active' : '' ?>"><?= e($label) ?></a>
      <?php endforeach; ?>
      <a href="<?= e(url('contact.php')) ?>" class="btn btn-primary nav-cta">Get a Quote</a>
    </nav>
  </div>
</header>
<main>
