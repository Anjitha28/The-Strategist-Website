<?php
require_once __DIR__ . '/layout.php';
require_login();
function csrf_get_check(){ if(!hash_equals($_SESSION['acsrf']??'', $_GET['t']??'')) die('Invalid token.'); }

$action = $_GET['action'] ?? 'list';
$id = (int)($_GET['id'] ?? 0);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $data = [
      trim($_POST['title'] ?? ''), trim($_POST['description'] ?? ''), trim($_POST['audience'] ?? ''),
      trim($_POST['level'] ?? ''), trim($_POST['duration'] ?? ''), trim($_POST['price'] ?? ''),
      trim($_POST['image_url'] ?? ''), (int)($_POST['sort'] ?? 0), isset($_POST['active'])?1:0,
    ];
    if ($id) { q('UPDATE training SET title=?,description=?,audience=?,level=?,duration=?,price=?,image_url=?,sort=?,active=? WHERE id=?', array_merge($data,[$id])); flash('Course updated.'); }
    else     { q('INSERT INTO training (title,description,audience,level,duration,price,image_url,sort,active) VALUES (?,?,?,?,?,?,?,?,?)', $data); flash('Course added.'); }
    header('Location: ' . url('admin/training.php')); exit;
}
if ($action === 'delete' && $id) { csrf_get_check(); q('DELETE FROM training WHERE id=?', [$id]); flash('Course deleted.'); header('Location: '.url('admin/training.php')); exit; }

$editing = $action === 'edit' && $id ? fetch1('SELECT * FROM training WHERE id=?', [$id]) : null;
$isForm = ($action === 'new' || $editing);
admin_header('training.php');
?>
<?php if ($isForm): $s = $editing ?: ['title'=>'','description'=>'','audience'=>'Professionals','level'=>'All levels','duration'=>'4 weeks','price'=>'','image_url'=>'','sort'=>0,'active'=>1]; ?>
<div class="panel">
  <div class="panel-head"><h2><?= $editing?'Edit':'Add' ?> Course</h2><a class="btn btn-light btn-sm" href="<?= e(url('admin/training.php')) ?>">← Back</a></div>
  <form method="post" action="<?= e(url('admin/training.php' . ($editing?'?action=edit&id='.$id:''))) ?>">
    <?= csrf_field() ?>
    <div class="field"><label>Course Title</label><input type="text" name="title" value="<?= e($s['title']) ?>" required></div>
    <div class="field"><label>Description</label><textarea name="description" rows="3"><?= e($s['description']) ?></textarea></div>
    <div class="grid-3c">
      <div class="field"><label>Audience</label><input type="text" name="audience" value="<?= e($s['audience']) ?>" placeholder="e.g. College Students"></div>
      <div class="field"><label>Level</label><input type="text" name="level" value="<?= e($s['level']) ?>" placeholder="Beginner / Intermediate"></div>
      <div class="field"><label>Duration</label><input type="text" name="duration" value="<?= e($s['duration']) ?>" placeholder="e.g. 6 weeks"></div>
    </div>
    <div class="grid-2c">
      <div class="field"><label>Fee <span class="tip">(optional)</span></label><input type="text" name="price" value="<?= e($s['price']) ?>" placeholder="e.g. ₹12,000 or Free"></div>
      <div class="field"><label>Sort order</label><input type="number" name="sort" value="<?= (int)$s['sort'] ?>"></div>
    </div>
    <div class="field img-field"><label>Image link <span class="tip">(optional — Drive/OneDrive)</span></label>
      <input type="text" name="image_url" value="<?= e($s['image_url']) ?>" data-preview="#pv" placeholder="Paste Google Drive / OneDrive link">
      <div class="preview" id="pv"></div>
    </div>
    <div class="field"><label><input type="checkbox" name="active" <?= $s['active']?'checked':'' ?>> Show on website</label></div>
    <div class="form-actions"><button class="btn btn-primary">Save Course</button></div>
  </form>
</div>
<?php else: $rows = fetchAll('SELECT * FROM training ORDER BY sort, id'); ?>
<div class="panel">
  <div class="panel-head"><h2>Training & Courses</h2><a class="btn btn-primary btn-sm" href="<?= e(url('admin/training.php?action=new')) ?>">+ Add Course</a></div>
  <table class="tbl">
    <thead><tr><th>Course</th><th>Audience</th><th>Level</th><th>Duration</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>
    <?php if ($rows): foreach ($rows as $r): ?>
      <tr>
        <td><b><?= e($r['title']) ?></b></td>
        <td><?= e($r['audience']) ?></td><td><?= e($r['level']) ?></td><td><?= e($r['duration']) ?></td>
        <td><span class="badge badge-<?= $r['active']?'on':'off' ?>"><?= $r['active']?'Live':'Hidden' ?></span></td>
        <td class="actions">
          <a class="btn btn-light btn-sm" href="<?= e(url('admin/training.php?action=edit&id='.$r['id'])) ?>">Edit</a>
          <a class="btn btn-danger btn-sm" href="<?= e(url('admin/training.php?action=delete&id='.$r['id'].'&t='.csrf_token())) ?>" onclick="return confirm('Delete this course?')">Delete</a>
        </td>
      </tr>
    <?php endforeach; else: ?><tr><td colspan="6" class="empty-row">No courses yet. Click “Add Course”.</td></tr><?php endif; ?>
    </tbody>
  </table>
</div>
<?php endif; ?>
<?php admin_footer(); ?>
