<?php
require_once __DIR__ . '/layout.php';
require_login();

$action = $_GET['action'] ?? 'list';
$id = (int)($_GET['id'] ?? 0);
$icons = ['analytics'=>'Analytics','chart'=>'Bar chart','automation'=>'Automation','project'=>'Project','data'=>'Database','gear'=>'Gear'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $data = [
      trim($_POST['title'] ?? ''), trim($_POST['description'] ?? ''),
      $_POST['icon'] ?? 'chart', trim($_POST['image_url'] ?? ''),
      (int)($_POST['sort'] ?? 0), isset($_POST['active']) ? 1 : 0,
    ];
    if ($id) {
        q('UPDATE services SET title=?,description=?,icon=?,image_url=?,sort=?,active=? WHERE id=?', array_merge($data,[$id]));
        flash('Service updated.');
    } else {
        q('INSERT INTO services (title,description,icon,image_url,sort,active) VALUES (?,?,?,?,?,?)', $data);
        flash('Service added.');
    }
    header('Location: ' . url('admin/services.php')); exit;
}
if ($action === 'delete' && $id) { csrf_get_check(); q('DELETE FROM services WHERE id=?', [$id]); flash('Service deleted.'); header('Location: '.url('admin/services.php')); exit; }

function csrf_get_check(){ if(!hash_equals($_SESSION['acsrf']??'', $_GET['t']??'')) die('Invalid token.'); }

$editing = $action === 'edit' && $id ? fetch1('SELECT * FROM services WHERE id=?', [$id]) : null;
$isForm = ($action === 'new' || $editing);
admin_header('services.php');
?>
<?php if ($isForm): $s = $editing ?: ['title'=>'','description'=>'','icon'=>'chart','image_url'=>'','sort'=>0,'active'=>1]; ?>
<div class="panel">
  <div class="panel-head"><h2><?= $editing?'Edit':'Add' ?> Service</h2><a class="btn btn-light btn-sm" href="<?= e(url('admin/services.php')) ?>">← Back</a></div>
  <form method="post" action="<?= e(url('admin/services.php' . ($editing?'?action=edit&id='.$id:''))) ?>">
    <?= csrf_field() ?>
    <div class="field"><label>Title</label><input type="text" name="title" value="<?= e($s['title']) ?>" required></div>
    <div class="field"><label>Description</label><textarea name="description" rows="3"><?= e($s['description']) ?></textarea></div>
    <div class="grid-2c">
      <div class="field"><label>Icon</label><select name="icon">
        <?php foreach ($icons as $k=>$lbl): ?><option value="<?= e($k) ?>" <?= $s['icon']===$k?'selected':'' ?>><?= e($lbl) ?></option><?php endforeach; ?>
      </select><span class="hint">Used if no image link is provided.</span></div>
      <div class="field"><label>Sort order <span class="tip">(lower shows first)</span></label><input type="number" name="sort" value="<?= (int)$s['sort'] ?>"></div>
    </div>
    <div class="field img-field"><label>Image link <span class="tip">(optional — Drive/OneDrive)</span></label>
      <input type="text" name="image_url" value="<?= e($s['image_url']) ?>" data-preview="#pv" placeholder="Paste Google Drive / OneDrive link">
      <div class="preview" id="pv"></div>
    </div>
    <div class="field"><label><input type="checkbox" name="active" <?= $s['active']?'checked':'' ?>> Show on website</label></div>
    <div class="form-actions"><button class="btn btn-primary">Save Service</button></div>
  </form>
</div>
<?php else: $rows = fetchAll('SELECT * FROM services ORDER BY sort, id'); ?>
<div class="panel">
  <div class="panel-head"><h2>Services</h2><a class="btn btn-primary btn-sm" href="<?= e(url('admin/services.php?action=new')) ?>">+ Add Service</a></div>
  <table class="tbl">
    <thead><tr><th>Title</th><th>Icon</th><th>Order</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>
    <?php if ($rows): foreach ($rows as $r): ?>
      <tr>
        <td><b><?= e($r['title']) ?></b><br><span class="hint"><?= e(excerpt($r['description'],60)) ?></span></td>
        <td><?= e($icons[$r['icon']] ?? $r['icon']) ?></td>
        <td><?= (int)$r['sort'] ?></td>
        <td><span class="badge badge-<?= $r['active']?'on':'off' ?>"><?= $r['active']?'Live':'Hidden' ?></span></td>
        <td class="actions">
          <a class="btn btn-light btn-sm" href="<?= e(url('admin/services.php?action=edit&id='.$r['id'])) ?>">Edit</a>
          <a class="btn btn-danger btn-sm" href="<?= e(url('admin/services.php?action=delete&id='.$r['id'].'&t='.csrf_token())) ?>" onclick="return confirm('Delete this service?')">Delete</a>
        </td>
      </tr>
    <?php endforeach; else: ?><tr><td colspan="5" class="empty-row">No services yet. Click “Add Service”.</td></tr><?php endif; ?>
    </tbody>
  </table>
</div>
<?php endif; ?>
<?php admin_footer(); ?>
