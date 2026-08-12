<?php
require_once __DIR__ . '/layout.php';
require_login();
function csrf_get_check(){ if(!hash_equals($_SESSION['acsrf']??'', $_GET['t']??'')) die('Invalid token.'); }

$action = $_GET['action'] ?? 'list';
$id = (int)($_GET['id'] ?? 0);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $data = [
      trim($_POST['name'] ?? ''), trim($_POST['logo_url'] ?? ''),
      trim($_POST['link'] ?? ''), (int)($_POST['sort'] ?? 0), isset($_POST['active'])?1:0,
    ];
    if ($id) { q('UPDATE clients SET name=?,logo_url=?,link=?,sort=?,active=? WHERE id=?', array_merge($data,[$id])); flash('Client updated.'); }
    else     { q('INSERT INTO clients (name,logo_url,link,sort,active) VALUES (?,?,?,?,?)', $data); flash('Client added.'); }
    header('Location: ' . url('admin/clients.php')); exit;
}
if ($action === 'delete' && $id) { csrf_get_check(); q('DELETE FROM clients WHERE id=?', [$id]); flash('Client deleted.'); header('Location: '.url('admin/clients.php')); exit; }

$editing = $action === 'edit' && $id ? fetch1('SELECT * FROM clients WHERE id=?', [$id]) : null;
$isForm = ($action === 'new' || $editing);
admin_header('clients.php');
?>
<?php if ($isForm): $s = $editing ?: ['name'=>'','logo_url'=>'','link'=>'','sort'=>0,'active'=>1]; ?>
<div class="panel">
  <div class="panel-head"><h2><?= $editing?'Edit':'Add' ?> Client</h2><a class="btn btn-light btn-sm" href="<?= e(url('admin/clients.php')) ?>">← Back</a></div>
  <div class="help-note">Paste the client's <b>logo image link</b> from Google Drive or OneDrive (set sharing to “Anyone with the link”). A transparent PNG logo looks best.</div>
  <form method="post" action="<?= e(url('admin/clients.php' . ($editing?'?action=edit&id='.$id:''))) ?>">
    <?= csrf_field() ?>
    <div class="field"><label>Client / Company name</label><input type="text" name="name" value="<?= e($s['name']) ?>" required></div>
    <div class="field img-field"><label>Logo image link <span class="tip">(Drive/OneDrive)</span></label>
      <input type="text" name="logo_url" value="<?= e($s['logo_url']) ?>" data-preview="#pv" placeholder="Paste logo image link">
      <div class="preview" id="pv"></div>
    </div>
    <div class="grid-2c">
      <div class="field"><label>Website link <span class="tip">(optional)</span></label><input type="text" name="link" value="<?= e($s['link']) ?>" placeholder="https://..."></div>
      <div class="field"><label>Sort order <span class="tip">(lower shows first)</span></label><input type="number" name="sort" value="<?= (int)$s['sort'] ?>"></div>
    </div>
    <div class="field"><label><input type="checkbox" name="active" <?= $s['active']?'checked':'' ?>> Show on website</label></div>
    <div class="form-actions"><button class="btn btn-primary">Save Client</button></div>
  </form>
</div>
<?php else: $rows = fetchAll('SELECT * FROM clients ORDER BY sort, id'); ?>
<div class="panel">
  <div class="panel-head"><h2>Clients / Logos</h2><a class="btn btn-primary btn-sm" href="<?= e(url('admin/clients.php?action=new')) ?>">+ Add Client</a></div>
  <div class="help-note">These logos appear in the “Clients” strip on your home page. Add each client's logo link and reorder with the sort number.</div>
  <table class="tbl">
    <thead><tr><th>Logo</th><th>Name</th><th>Order</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>
    <?php if ($rows): foreach ($rows as $r): $lg = resolve_image($r['logo_url']); ?>
      <tr>
        <td><?php if ($lg): ?><img src="<?= e($lg) ?>" alt="" class="thumb-sm" style="object-fit:contain;background:#fff;border:1px solid var(--line)" referrerpolicy="no-referrer"><?php else: ?><span class="hint">— no logo —</span><?php endif; ?></td>
        <td><b><?= e($r['name']) ?></b><?php if($r['link']):?><br><span class="hint"><?= e($r['link']) ?></span><?php endif;?></td>
        <td><?= (int)$r['sort'] ?></td>
        <td><span class="badge badge-<?= $r['active']?'on':'off' ?>"><?= $r['active']?'Live':'Hidden' ?></span></td>
        <td class="actions">
          <a class="btn btn-light btn-sm" href="<?= e(url('admin/clients.php?action=edit&id='.$r['id'])) ?>">Edit</a>
          <a class="btn btn-danger btn-sm" href="<?= e(url('admin/clients.php?action=delete&id='.$r['id'].'&t='.csrf_token())) ?>" onclick="return confirm('Delete this client?')">Delete</a>
        </td>
      </tr>
    <?php endforeach; else: ?><tr><td colspan="5" class="empty-row">No clients yet. Click “Add Client”.</td></tr><?php endif; ?>
    </tbody>
  </table>
</div>
<?php endif; ?>
<?php admin_footer(); ?>
