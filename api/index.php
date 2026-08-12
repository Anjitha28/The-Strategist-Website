<?php
// Get the requested URI path
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Clean up the URI (remove leading/trailing slashes)
$path = trim($uri, '/');

function run_php_file($filepath, $request_path) {
    $_SERVER['SCRIPT_NAME'] = '/' . ltrim($request_path, '/');
    $_SERVER['PHP_SELF'] = '/' . ltrim($request_path, '/');
    require $filepath;
    exit;
}

// If empty, serve index.php from root
if ($path === '') {
    run_php_file(__DIR__ . '/../index.php', '/index.php');
}

// Check if we are requesting an admin page
if (strpos($path, 'admin/') === 0 || $path === 'admin') {
    if ($path === 'admin') {
        run_php_file(__DIR__ . '/../admin/index.php', '/admin/index.php');
    }
    
    $admin_subpath = substr($path, 6); // length of "admin/"
    
    $admin_file = __DIR__ . '/../admin/' . $admin_subpath;
    if (file_exists($admin_file) && !is_dir($admin_file)) {
        run_php_file($admin_file, '/admin/' . $admin_subpath);
    }
    
    $admin_php = __DIR__ . '/../admin/' . $admin_subpath . '.php';
    if (file_exists($admin_php)) {
        run_php_file($admin_php, '/admin/' . $admin_subpath . '.php');
    }
}

// Normal page (e.g. about, contact, blog)
$file_direct = __DIR__ . '/../' . $path;
if (file_exists($file_direct) && !is_dir($file_direct)) {
    run_php_file($file_direct, '/' . $path);
}

$file_php = __DIR__ . '/../' . $path . '.php';
if (file_exists($file_php)) {
    run_php_file($file_php, '/' . $path . '.php');
}

// Page not found
http_response_code(404);
echo "404 Not Found";
