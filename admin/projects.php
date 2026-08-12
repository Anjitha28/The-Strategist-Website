<?php
require_once __DIR__ . '/layout.php';
require_login();
function csrf_get_check(){ if(!hash_equals($_SESSION['acsrf']??'', $_GET['t']??'')) die('Invalid token.'); }

$action = $_GET['action'] ?? 'list';
$id = (int)($_GET['id'] ?? 0);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $data = [
      trim($_POST['title'] ?? ''), trim($_POST['category'] ?? ''), trim($_POST['client'] ?? ''),
      trim($_POST['description'] ?? ''), trim($_POST['image_url'] ?? ''), trim($_POST['link'] ?? ''),
      isset($_POST['featured'])?1:0, (int)($_POST['sort'] ?? 0), isset($_POST['active'])?1:0,
    ];
    if ($id) { q('UPDATE projects SET title=?,category=?,client=?,description=?,image_url=?,link=?,featured=?,sort=?,active=? WHERE id=?', array_merge($data,[$id])); flash('Project updated.'); }
    else     { q('INSERT INTO projects (title,category,client,description,image_url,link,featured,sort,active) VALUES (?,?,?,?,?,?,?,?,?)', $data); flash('Project added.'); }
    header('Location: ' . url('admin/projects.php')); exit;
}
if ($action === 'delete' && $id) { csrf_get_check(); q('DELETE FROM projects WHERE id=?', [$id]); flash('Project deleted.'); header('Location: '.url('admin/projects.php')); exit; }

$editing = $action === 'edit' && $id ? fetch1('SELECT * FROM projects WHERE id=?', [$id]) : null;
$isForm = ($action === 'new' || $editing);
admin_header('projects.php');
?>
<?php if ($isForm): $s = $editing ?: ['title'=>'','category'=>'Analytics','client'=>'','description'=>'','image_url'=>'','link'=>'','featured'=>0,'sort'=>0,'active'=>1]; ?>
<div class="panel">
  <div class="panel-head"><h2><?= $editing?'Edit':'Add' ?> Project</h2><a class="btn btn-light btn-sm" href="<?= e(url('admin/projects.php')) ?>">← Back</a></div>
  <form method="post" action="<?= e(url('admin/projects.php' . ($editing?'?action=edit&id='.$id:''))) ?>">
    <?= csrf_field() ?>
    <div class="field"><label>Project Title</label><input type="text" name="title" value="<?= e($s['title']) ?>" required></div>
    <div class="grid-2c">
      <div class="field"><label>Category</label><input type="text" name="category" value="<?= e($s['category']) ?>" placeholder="e.g. Visualisation"></div>
      <div class="field"><label>Client <span class="tip">(optional)</span></label><input type="text" name="client" value="<?= e($s['client']) ?>"></div>
    </div>
    <div class="field"><label>Description</label><textarea name="description" rows="3"><?= e($s['description']) ?></textarea></div>
    <div class="field img-field"><label>Image link <span class="tip">(Drive/OneDrive)</span></label>
      <input type="text" name="image_url" value="<?= e($s['image_url']) ?>" data-preview="#pv" placeholder="Paste Google Drive / OneDrive link">
      <div class="preview" id="pv"></div>
    </div>
    <div class="grid-2c">
      <div class="field"><label>External link <span class="tip">(optional)</span></label><input type="text" name="link" value="<?= e($s['link']) ?>" placeholder="https://..."></div>
      <div class="field"><label>Sort order</label><input type="number" name="sort" value="<?= (int)$s['sort'] ?>"></div>
    </div>
    <div class="field"><label><input type="checkbox" name="featured" <?= $s['featured']?'checked':'' ?>> Feature on home page</label></div>
    <div class="field"><label><input type="checkbox" name="active" <?= $s['active']?'checked':'' ?>> Show on website</label></div>
    <div class="form-actions"><button class="btn btn-primary">Save Project</button></div>
  </form>
</div>
<?php else: $rows = fetchAll('SELECT * FROM projects ORDER BY featured DESC, sort, id'); ?>
<div class="panel">
  <div class="panel-head"><h2>Projects & Portfolio</h2><a class="btn btn-primary btn-sm" href="<?= e(url('admin/projects.php?action=new')) ?>">+ Add Project</a></div>
  <table class="tbl">
    <thead><tr><th>Project</th><th>Category</th><th>Featured</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>
    <?php if ($rows): foreach ($rows as $r): ?>
      <tr>
        <td><b><?= e($r['title']) ?></b><?php if($r['client']):?><br><span class="hint"><?= e($r['client']) ?></span><?php endif;?></td>
        <td><?= e($r['category']) ?></td>
        <td><?= $r['featured']?'★ Yes':'—' ?></td>
        <td><span class="badge badge-<?= $r['active']?'on':'off' ?>"><?= $r['active']?'Live':'Hidden' ?></span></td>
        <td class="actions">
          <a class="btn btn-light btn-sm" href="<?= e(url('admin/projects.php?action=edit&id='.$r['id'])) ?>">Edit</a>
          <a class="btn btn-danger btn-sm" href="<?= e(url('admin/projects.php?action=delete&id='.$r['id'].'&t='.csrf_token())) ?>" onclick="return confirm('Delete this project?')">Delete</a>
        </td>
      </tr>
    <?php endforeach; else: ?><tr><td colspan="5" class="empty-row">No projects yet. Click “Add Project”.</td></tr><?php endif; ?>
    </tbody>
  </table>
</div>
<?php endif; ?>
<?php admin_footer(); ?>
