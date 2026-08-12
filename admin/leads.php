<?php
require_once __DIR__ . '/layout.php';
require_login();
function csrf_get_check(){ if(!hash_equals($_SESSION['acsrf']??'', $_GET['t']??'')) die('Invalid token.'); }

$id = (int)($_GET['id'] ?? 0);
$do = $_GET['do'] ?? '';
if ($do && $id) {
    csrf_get_check();
    if ($do === 'read')    q("UPDATE leads SET status='read' WHERE id=?", [$id]);
    if ($do === 'archive') q("UPDATE leads SET status='archived' WHERE id=?", [$id]);
    if ($do === 'new')     q("UPDATE leads SET status='new' WHERE id=?", [$id]);
    if ($do === 'delete')  { q('DELETE FROM leads WHERE id=?', [$id]); flash('Enquiry deleted.'); }
    header('Location: ' . url('admin/leads.php')); exit;
}
$filter = $_GET['filter'] ?? 'all';
$where = $filter === 'new' ? "WHERE status='new'" : ($filter === 'archived' ? "WHERE status='archived'" : "WHERE status<>'archived'");
if ($filter === 'all') $where = '';
$rows = fetchAll("SELECT * FROM leads $where ORDER BY created_at DESC");
admin_header('leads.php');
?>
<div class="panel">
  <div class="panel-head">
    <h2>Enquiries / Leads</h2>
    <div class="actions">
      <a class="btn btn-sm <?= $filter==='all'?'btn-primary':'btn-light' ?>" href="?filter=all">All</a>
      <a class="btn btn-sm <?= $filter==='new'?'btn-primary':'btn-light' ?>" href="?filter=new">New</a>
      <a class="btn btn-sm <?= $filter==='archived'?'btn-primary':'btn-light' ?>" href="?filter=archived">Archived</a>
    </div>
  </div>
  <table class="tbl">
    <thead><tr><th>From</th><th>Subject & Message</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>
    <?php if ($rows): foreach ($rows as $r): ?>
      <tr>
        <td>
          <b><?= e($r['name']) ?></b><br>
          <a class="hint" href="mailto:<?= e($r['email']) ?>" style="color:var(--primary)"><?= e($r['email']) ?></a>
          <?php if ($r['phone']): ?><br><span class="hint"><?= e($r['phone']) ?></span><?php endif; ?>
        </td>
        <td style="max-width:340px">
          <b><?= e($r['subject']) ?></b>
          <div class="hint" style="margin-top:4px"><?= nl2br(e($r['message'])) ?></div>
        </td>
        <td><?= e(date('M j, Y', strtotime($r['created_at']))) ?><br><span class="hint"><?= e(date('g:i a', strtotime($r['created_at']))) ?></span></td>
        <td><span class="badge badge-<?= $r['status']==='new'?'new':'read' ?>"><?= e($r['status']) ?></span></td>
        <td class="actions">
          <a class="btn btn-light btn-sm" href="mailto:<?= e($r['email']) ?>?subject=Re: <?= e(rawurlencode($r['subject'])) ?>">Reply</a>
          <?php if ($r['status']!=='read'): ?><a class="btn btn-light btn-sm" href="?do=read&id=<?= $r['id'] ?>&t=<?= csrf_token() ?>">Mark read</a><?php endif; ?>
          <?php if ($r['status']!=='archived'): ?><a class="btn btn-light btn-sm" href="?do=archive&id=<?= $r['id'] ?>&t=<?= csrf_token() ?>">Archive</a><?php endif; ?>
          <a class="btn btn-danger btn-sm" href="?do=delete&id=<?= $r['id'] ?>&t=<?= csrf_token() ?>" onclick="return confirm('Delete this enquiry?')">Delete</a>
        </td>
      </tr>
    <?php endforeach; else: ?><tr><td colspan="5" class="empty-row">No enquiries in this view.</td></tr><?php endif; ?>
    </tbody>
  </table>
</div>
<?php admin_footer(); ?>
