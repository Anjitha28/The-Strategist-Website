<?php
/* Admin authentication guard + helpers. Include at top of every admin page. */
require_once __DIR__ . '/../includes/functions.php';

if (session_status() === PHP_SESSION_NONE) {
    session_name(SESSION_NAME);
    session_start();
}

function is_logged_in() { return !empty($_SESSION['admin_id']); }

function require_login() {
    if (!is_logged_in()) {
        header('Location: ' . url('admin/login.php'));
        exit;
    }
}

function current_admin() {
    if (!is_logged_in()) return null;
    static $a = null;
    if ($a === null) $a = fetch1('SELECT * FROM admin_users WHERE id = ?', [$_SESSION['admin_id']]);
    return $a;
}

/* CSRF */
function csrf_token() {
    if (empty($_SESSION['acsrf'])) $_SESSION['acsrf'] = bin2hex(random_bytes(16));
    return $_SESSION['acsrf'];
}
function csrf_field() { return '<input type="hidden" name="csrf" value="' . e(csrf_token()) . '">'; }
function csrf_check() {
    if (($_POST['csrf'] ?? '') === '' || !hash_equals($_SESSION['acsrf'] ?? '', $_POST['csrf'] ?? '')) {
        die('Invalid or expired form token. Go back and try again.');
    }
}

/* Flash messages */
function flash($msg, $type = 'success') { $_SESSION['flash'] = ['m' => $msg, 't' => $type]; }
function get_flash() {
    if (empty($_SESSION['flash'])) return null;
    $f = $_SESSION['flash']; unset($_SESSION['flash']); return $f;
}
