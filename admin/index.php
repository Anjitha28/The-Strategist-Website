<?php
require_once __DIR__ . '/layout.php';
require_login();
$c = [
  'services' => fetch1('SELECT COUNT(*) n FROM services')['n'],
  'training' => fetch1('SELECT COUNT(*) n FROM training')['n'],
  'projects' => fetch1('SELECT COUNT(*) n FROM projects')['n'],
  'posts'    => fetch1('SELECT COUNT(*) n FROM blog_posts')['n'],
  'leads'    => fetch1('SELECT COUNT(*) n FROM leads')['n'],
  'new'      => fetch1("SELECT COUNT(*) n FROM leads WHERE status='new'")['n'],
];
$recent = fetchAll('SELECT * FROM leads ORDER BY created_at DESC LIMIT 6');
admin_header('index.php');
?>
<div class="help-note">👋 Welcome! Use the menu on the left to edit any part of your website. Everything you change here appears on the live site instantly. Start with <b>Page Content</b> to edit text, or <b>Settings &amp; Branding</b> to change your logo and colours.</div>

<div class="kpis">
  <div class="kpi k1"><b><?= (int)$c['projects'] ?></b><span>Projects</span></div>
  <div class="kpi k2"><b><?= (int)$c['training'] ?></b><span>Courses</span></div>
  <div class="kpi k3"><b><?= (int)$c['posts'] ?></b><span>Blog Posts</span></div>
  <div class="kpi k4"><b><?= (int)$c['new'] ?></b><span>New Leads</span></div>
</div>

<div class="panel">
  <div class="panel-head"><h2>Quick actions</h2></div>
  <div class="actions">
    <a class="btn btn-light" href="<?= e(url('admin/content.php')) ?>">✎ Edit page text</a>
    <a class="btn btn-light" href="<?= e(url('admin/services.php')) ?>">⚙ Manage services</a>
    <a class="btn btn-light" href="<?= e(url('admin/training.php')) ?>">🎓 Manage courses</a>
    <a class="btn btn-light" href="<?= e(url('admin/projects.php')) ?>">📁 Manage projects</a>
    <a class="btn btn-light" href="<?= e(url('admin/blog.php')) ?>">📝 Write a blog post</a>
    <a class="btn btn-light" href="<?= e(url('admin/settings.php')) ?>">🎨 Branding &amp; colours</a>
  </div>
</div>

<div class="panel">
  <div class="panel-head"><h2>Recent enquiries</h2><a class="btn btn-light btn-sm" href="<?= e(url('admin/leads.php')) ?>">View all (<?= (int)$c['leads'] ?>)</a></div>
  <table class="tbl">
    <thead><tr><th>Name</th><th>Subject</th><th>Received</th><th>Status</th></tr></thead>
    <tbody>
    <?php if ($recent): foreach ($recent as $l): ?>
      <tr>
        <td><b><?= e($l['name']) ?></b><br><span class="hint"><?= e($l['email']) ?></span></td>
        <td><?= e($l['subject']) ?></td>
        <td><?= e(date('M j, Y', strtotime($l['created_at']))) ?></td>
        <td><span class="badge badge-<?= $l['status']==='new'?'new':'read' ?>"><?= e($l['status']) ?></span></td>
      </tr>
    <?php endforeach; else: ?>
      <tr><td colspan="4" class="empty-row">No enquiries yet.</td></tr>
    <?php endif; ?>
    </tbody>
  </table>
</div>
<?php admin_footer(); ?>
