</main>
<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <div class="brand">
        <?php $flogo = resolve_image(setting('logo_url')); if ($flogo): ?>
          <img src="<?= e($flogo) ?>" alt="<?= e(setting('site_name')) ?>" class="brand-logo" referrerpolicy="no-referrer">
        <?php else: ?>
          <span class="brand-mark">TS</span>
        <?php endif; ?>
        <span class="brand-name"><?= e(setting('site_name')) ?></span>
      </div>
      <p class="footer-text"><?= e(setting('footer_text')) ?></p>
      <div class="socials">
        <?php
        $socials = [
          'social_linkedin'  => 'LinkedIn',
          'social_twitter'   => 'Twitter',
          'social_facebook'  => 'Facebook',
          'social_instagram' => 'Instagram',
        ];
        foreach ($socials as $k => $name):
          $link = setting($k);
          if ($link && $link !== '#'):
        ?>
          <a href="<?= e($link) ?>" target="_blank" rel="noopener" aria-label="<?= e($name) ?>"><?= e(substr($name,0,2)) ?></a>
        <?php endif; endforeach; ?>
      </div>
    </div>
    <div class="footer-col">
      <h4>Explore</h4>
      <a href="<?= e(url('about.php')) ?>">About Us</a>
      <a href="<?= e(url('services.php')) ?>">Services</a>
      <a href="<?= e(url('training.php')) ?>">Training</a>
      <a href="<?= e(url('projects.php')) ?>">Projects</a>
      <a href="<?= e(url('blog.php')) ?>">Blog</a>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <?php if ($em = setting('contact_email')): ?><a href="mailto:<?= e($em) ?>"><?= e($em) ?></a><?php endif; ?>
      <?php if ($ph = setting('contact_phone')): ?><a href="tel:<?= e($ph) ?>"><?= e($ph) ?></a><?php endif; ?>
      <?php if ($ad = setting('contact_address')): ?><span><?= e($ad) ?></span><?php endif; ?>
      <a href="<?= e(url('contact.php')) ?>" class="btn btn-outline" style="margin-top:14px;display:inline-block">Send a Message</a>
    </div>
  </div>
  <div class="footer-bottom container">
    <span>© <?= date('Y') ?> <?= e(setting('site_name')) ?>. All rights reserved.</span>
    <span>Managed from the <a href="<?= e(url('admin/')) ?>">Admin Panel</a></span>
  </div>
</footer>
<script src="<?= e(url('assets/js/main.js')) ?>"></script>
</body>
</html>
