<?php
require_once __DIR__ . '/layout.php';
require_login();
function csrf_get_check(){ if(!hash_equals($_SESSION['acsrf']??'', $_GET['t']??'')) die('Invalid token.'); }

$action = $_GET['action'] ?? 'list';
$id = (int)($_GET['id'] ?? 0);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $title = trim($_POST['title'] ?? '');
    $slug  = trim($_POST['slug'] ?? '');
    if ($slug === '') $slug = slugify($title);
    else $slug = slugify($slug);
    // ensure unique slug
    $exists = fetch1('SELECT id FROM blog_posts WHERE slug=? AND id<>?', [$slug, $id]);
    if ($exists) $slug .= '-' . substr(md5(uniqid()),0,4);

    $data = [
      $title, $slug, trim($_POST['excerpt'] ?? ''), $_POST['content'] ?? '',
      trim($_POST['image_url'] ?? ''), trim($_POST['author'] ?? 'The Strategist'),
      trim($_POST['category'] ?? 'Insights'), ($_POST['status'] ?? 'published'),
    ];
    if ($id) { q('UPDATE blog_posts SET title=?,slug=?,excerpt=?,content=?,image_url=?,author=?,category=?,status=? WHERE id=?', array_merge($data,[$id])); flash('Post updated.'); }
    else     { q('INSERT INTO blog_posts (title,slug,excerpt,content,image_url,author,category,status) VALUES (?,?,?,?,?,?,?,?)', $data); flash('Post published.'); }
    header('Location: ' . url('admin/blog.php')); exit;
}
if ($action === 'delete' && $id) { csrf_get_check(); q('DELETE FROM blog_posts WHERE id=?', [$id]); flash('Post deleted.'); header('Location: '.url('admin/blog.php')); exit; }

$editing = $action === 'edit' && $id ? fetch1('SELECT * FROM blog_posts WHERE id=?', [$id]) : null;
$isForm = ($action === 'new' || $editing);
admin_header('blog.php');
?>
<?php if ($isForm): $s = $editing ?: ['title'=>'','slug'=>'','excerpt'=>'','content'=>'','image_url'=>'','author'=>'The Strategist','category'=>'Insights','status'=>'published']; ?>
<div class="panel">
  <div class="panel-head"><h2><?= $editing?'Edit':'New' ?> Blog Post</h2><a class="btn btn-light btn-sm" href="<?= e(url('admin/blog.php')) ?>">← Back</a></div>
  <form method="post" action="<?= e(url('admin/blog.php' . ($editing?'?action=edit&id='.$id:''))) ?>">
    <?= csrf_field() ?>
    <div class="field"><label>Title</label><input type="text" name="title" value="<?= e($s['title']) ?>" required></div>
    <div class="grid-2c">
      <div class="field"><label>URL slug <span class="tip">(leave blank to auto-generate)</span></label><input type="text" name="slug" value="<?= e($s['slug']) ?>"></div>
      <div class="field"><label>Category</label><input type="text" name="category" value="<?= e($s['category']) ?>"></div>
    </div>
    <div class="field"><label>Short summary <span class="tip">(shown on the blog list)</span></label><textarea name="excerpt" rows="2"><?= e($s['excerpt']) ?></textarea></div>
    <div class="field img-field"><label>Cover image link <span class="tip">(Drive/OneDrive)</span></label>
      <input type="text" name="image_url" value="<?= e($s['image_url']) ?>" data-preview="#pv" placeholder="Paste Google Drive / OneDrive link">
      <div class="preview" id="pv"></div>
    </div>
    <div class="field"><label>Content <span class="tip">(HTML allowed: &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, &lt;img&gt;…)</span></label>
      <textarea name="content" rows="12"><?= e($s['content']) ?></textarea></div>
    <div class="grid-2c">
      <div class="field"><label>Author</label><input type="text" name="author" value="<?= e($s['author']) ?>"></div>
      <div class="field"><label>Status</label><select name="status">
        <option value="published" <?= $s['status']==='published'?'selected':'' ?>>Published (visible)</option>
        <option value="draft" <?= $s['status']==='draft'?'selected':'' ?>>Draft (hidden)</option>
      </select></div>
    </div>
    <div class="form-actions"><button class="btn btn-primary">Save Post</button></div>
  </form>
</div>
<?php else: $rows = fetchAll('SELECT * FROM blog_posts ORDER BY published_at DESC'); ?>
<div class="panel">
  <div class="panel-head"><h2>Blog Posts</h2><a class="btn btn-primary btn-sm" href="<?= e(url('admin/blog.php?action=new')) ?>">+ New Post</a></div>
  <table class="tbl">
    <thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>
    <?php if ($rows): foreach ($rows as $r): ?>
      <tr>
        <td><b><?= e($r['title']) ?></b></td>
        <td><?= e($r['category']) ?></td>
        <td><?= e(date('M j, Y', strtotime($r['published_at']))) ?></td>
        <td><span class="badge badge-<?= $r['status']==='published'?'on':'read' ?>"><?= e($r['status']) ?></span></td>
        <td class="actions">
          <a class="btn btn-light btn-sm" href="<?= e(url('blog-single.php?slug='.urlencode($r['slug']))) ?>" target="_blank">View</a>
          <a class="btn btn-light btn-sm" href="<?= e(url('admin/blog.php?action=edit&id='.$r['id'])) ?>">Edit</a>
          <a class="btn btn-danger btn-sm" href="<?= e(url('admin/blog.php?action=delete&id='.$r['id'].'&t='.csrf_token())) ?>" onclick="return confirm('Delete this post?')">Delete</a>
        </td>
      </tr>
    <?php endforeach; else: ?><tr><td colspan="5" class="empty-row">No posts yet. Click “New Post”.</td></tr><?php endif; ?>
    </tbody>
  </table>
</div>
<?php endif; ?>
<?php admin_footer(); ?>
