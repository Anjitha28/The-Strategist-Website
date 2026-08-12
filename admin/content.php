<?php
require_once __DIR__ . '/layout.php';
require_login();

$pages = ['home'=>'Home Page','about'=>'About Page','services'=>'Services Page',
          'training'=>'Training Page','projects'=>'Projects Page','blog'=>'Blog Page','contact'=>'Contact Page'];
$page = $_GET['page'] ?? 'home';
if (!isset($pages[$page])) $page = 'home';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $vals = $_POST['block'] ?? [];
    foreach ($vals as $key => $val) {
        q('UPDATE content_blocks SET value = ? WHERE page = ? AND block_key = ?', [$val, $page, $key]);
    }
    flash('Content for "' . $pages[$page] . '" saved.');
    header('Location: ' . url('admin/content.php?page=' . $page));
    exit;
}

$blocks = fetchAll('SELECT * FROM content_blocks WHERE page = ? ORDER BY sort, id', [$page]);
admin_header('content.php');
?>
<div class="panel">
  <div class="panel-head">
    <div><h2>Edit Page Content</h2><p class="sub">Change the text and images shown on each page.</p></div>
    <form method="get"><select name="page" onchange="this.form.submit()">
      <?php foreach ($pages as $k=>$label): ?><option value="<?= e($k) ?>" <?= $k===$page?'selected':'' ?>><?= e($label) ?></option><?php endforeach; ?>
    </select></form>
  </div>
  <div class="help-note">Editing: <b><?= e($pages[$page]) ?></b>. Fields marked <i>(Drive/OneDrive link)</i> accept a shared image link — make sure the link sharing is set to <b>“Anyone with the link.”</b></div>

  <form method="post">
    <?= csrf_field() ?>
    <?php foreach ($blocks as $b): $id='blk_'.$b['id']; ?>
      <div class="field">
        <label><?= e($b['label']) ?></label>
        <?php if ($b['type']==='textarea' || $b['type']==='html'): ?>
          <textarea name="block[<?= e($b['block_key']) ?>]" rows="<?= $b['type']==='html'?7:3 ?>"><?= e($b['value']) ?></textarea>
          <?php if ($b['type']==='html'): ?><span class="hint">HTML allowed (e.g. &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;&lt;li&gt;).</span><?php endif; ?>
        <?php elseif ($b['type']==='image'): ?>
          <div class="img-field">
            <input type="text" name="block[<?= e($b['block_key']) ?>]" id="<?= $id ?>" value="<?= e($b['value']) ?>" data-preview="#pv_<?= $b['id'] ?>" placeholder="Paste Google Drive / OneDrive image link">
            <div class="preview" id="pv_<?= $b['id'] ?>"></div>
          </div>
        <?php else: ?>
          <input type="text" name="block[<?= e($b['block_key']) ?>]" value="<?= e($b['value']) ?>">
        <?php endif; ?>
      </div>
    <?php endforeach; ?>
    <div class="form-actions">
      <button class="btn btn-primary">Save Changes</button>
      <a class="btn btn-light" href="<?= e(url($page==='home'?'index.php':$page.'.php')) ?>" target="_blank">↗ Preview page</a>
    </div>
  </form>
</div>
<?php admin_footer(); ?>
