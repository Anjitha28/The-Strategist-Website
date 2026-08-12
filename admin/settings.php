<?php
require_once __DIR__ . '/layout.php';
require_login();

$fields = [
  'Brand' => [
    'site_name'   => ['Site / Company name','text'],
    'tagline'     => ['Tagline','text'],
    'logo_url'    => ['Logo image link (Drive/OneDrive)','image'],
    'favicon_url' => ['Favicon / tab icon link','image'],
  ],
  'Colours' => [
    'color_primary'   => ['Primary colour','color'],
    'color_secondary' => ['Secondary colour','color'],
    'color_accent'    => ['Accent colour','color'],
    'color_dark'      => ['Dark / heading colour','color'],
  ],
  'Contact' => [
    'contact_email'   => ['Contact email','text'],
    'contact_phone'   => ['Contact phone','text'],
    'contact_address' => ['Address','textarea'],
    'map_embed'       => ['Google Maps embed code (optional)','textarea'],
  ],
  'Social links' => [
    'social_linkedin'  => ['LinkedIn URL','text'],
    'social_twitter'   => ['Twitter / X URL','text'],
    'social_facebook'  => ['Facebook URL','text'],
    'social_instagram' => ['Instagram URL','text'],
  ],
  'Footer & SEO' => [
    'footer_text'     => ['Footer tagline','textarea'],
    'seo_description' => ['Default SEO description','textarea'],
    'seo_keywords'    => ['SEO keywords','textarea'],
    'gtag_id'         => ['Google Analytics ID (optional, e.g. G-XXXX)','text'],
  ],
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    foreach ($fields as $group) {
        foreach ($group as $key => $meta) {
            if (array_key_exists($key, $_POST)) set_setting($key, trim($_POST[$key]));
        }
    }
    flash('Settings saved. Refresh the website to see changes.');
    header('Location: ' . url('admin/settings.php')); exit;
}
admin_header('settings.php');
?>
<div class="help-note">🎨 These settings control your logo, colours, contact info and SEO across the whole website. Change a colour and every button, heading and highlight updates automatically.</div>
<form method="post">
  <?= csrf_field() ?>
  <?php foreach ($fields as $group => $items): ?>
  <div class="panel">
    <h2><?= e($group) ?></h2>
    <?php if ($group==='Colours'): ?><p class="sub">Pick colours that match your brand. The whole site theme updates instantly.</p><?php endif; ?>
    <?php foreach ($items as $key => $meta): [$label,$type] = $meta; $val = setting($key); ?>
      <div class="field">
        <label><?= e($label) ?></label>
        <?php if ($type==='textarea'): ?>
          <textarea name="<?= e($key) ?>" rows="<?= $key==='map_embed'?3:2 ?>"><?= e($val) ?></textarea>
        <?php elseif ($type==='color'): ?>
          <div class="color-row">
            <input type="color" value="<?= e($val ?: '#6C5CE7') ?>" oninput="this.nextElementSibling.value=this.value">
            <input type="text" name="<?= e($key) ?>" value="<?= e($val) ?>" oninput="this.previousElementSibling.value=this.value">
          </div>
        <?php elseif ($type==='image'): ?>
          <div class="img-field">
            <input type="text" name="<?= e($key) ?>" value="<?= e($val) ?>" data-preview="#pv_<?= e($key) ?>" placeholder="Paste Google Drive / OneDrive link">
            <div class="preview" id="pv_<?= e($key) ?>"></div>
          </div>
        <?php else: ?>
          <input type="text" name="<?= e($key) ?>" value="<?= e($val) ?>">
        <?php endif; ?>
      </div>
    <?php endforeach; ?>
  </div>
  <?php endforeach; ?>
  <div class="panel"><div class="form-actions"><button class="btn btn-primary">Save All Settings</button><a class="btn btn-light" href="<?= e(url('index.php')) ?>" target="_blank">↗ View website</a></div></div>
</form>
<?php admin_footer(); ?>
