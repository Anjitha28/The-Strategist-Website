<?php
/* =====================================================================
   Shared helper functions
   ===================================================================== */
require_once __DIR__ . '/../config/db.php';

/* ---- Escaping ---- */
function e($v) { return htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8'); }

/* ---- Base URL detection ---- */
function base_url() {
    if (defined('BASE_URL') && BASE_URL !== '') return rtrim(BASE_URL, '/');
    $https  = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
    $scheme = $https ? 'https' : 'http';
    $host   = $_SERVER['HTTP_HOST'] ?? 'localhost';
    // directory of the front controller, works in sub-folders too
    $dir = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/'));
    $dir = rtrim($dir, '/');
    // if we are inside /admin, step up one level for the public base
    if (substr($dir, -6) === '/admin') $dir = substr($dir, 0, -6);
    return $scheme . '://' . $host . $dir;
}
function url($path = '') { return base_url() . '/' . ltrim($path, '/'); }

/* ---- Settings (cached) ---- */
function all_settings() {
    static $cache = null;
    if ($cache === null) {
        $cache = [];
        foreach (fetchAll('SELECT skey, svalue FROM settings') as $r) {
            $cache[$r['skey']] = $r['svalue'];
        }
    }
    return $cache;
}
function setting($key, $default = '') {
    $s = all_settings();
    return array_key_exists($key, $s) && $s[$key] !== null && $s[$key] !== '' ? $s[$key] : $default;
}
function set_setting($key, $value) {
    q('INSERT INTO settings (skey, svalue) VALUES (?, ?)
       ON DUPLICATE KEY UPDATE svalue = VALUES(svalue)', [$key, $value]);
}

/* ---- Content blocks ---- */
function content_map($page) {
    static $cache = [];
    if (!isset($cache[$page])) {
        $cache[$page] = [];
        foreach (fetchAll('SELECT block_key, value, type FROM content_blocks WHERE page = ?', [$page]) as $r) {
            $cache[$page][$r['block_key']] = $r;
        }
    }
    return $cache[$page];
}
function block($page, $key, $default = '') {
    $m = content_map($page);
    if (isset($m[$key]) && $m[$key]['value'] !== null && $m[$key]['value'] !== '') return $m[$key]['value'];
    return $default;
}

/* =====================================================================
   IMAGE LINK RESOLVER
   Accepts a Google Drive / OneDrive / Dropbox share link (or any normal
   image URL) and returns a URL the browser can display directly.
   ===================================================================== */
function resolve_image($url, $fallback = '') {
    $url = trim((string)$url);
    if ($url === '') return $fallback;

    // ---- Google Drive ----
    // https://drive.google.com/file/d/FILEID/view?usp=sharing
    if (preg_match('~drive\.google\.com/file/d/([a-zA-Z0-9_-]+)~', $url, $m)) {
        return 'https://drive.google.com/thumbnail?id=' . $m[1] . '&sz=w1600';
    }
    // https://drive.google.com/open?id=FILEID  or  ...uc?id=FILEID
    if (preg_match('~drive\.google\.com/(?:open|uc)\?(?:export=\w+&)?id=([a-zA-Z0-9_-]+)~', $url, $m)) {
        return 'https://drive.google.com/thumbnail?id=' . $m[1] . '&sz=w1600';
    }
    // https://drive.google.com/thumbnail?... already direct
    if (strpos($url, 'drive.google.com/thumbnail') !== false) return $url;

    // ---- Google user content (already direct) ----
    if (strpos($url, 'googleusercontent.com') !== false) return $url;

    // ---- OneDrive / SharePoint share link ----
    // Convert 1drv.ms or onedrive.live.com share links to an embeddable form.
    if (strpos($url, '1drv.ms') !== false || strpos($url, 'onedrive.live.com') !== false ||
        strpos($url, 'sharepoint.com') !== false) {
        // If it already has a download/embed flag, keep it.
        if (strpos($url, 'download=1') !== false || strpos($url, 'embed') !== false) return $url;
        $sep = (strpos($url, '?') !== false) ? '&' : '?';
        return $url . $sep . 'download=1';
    }

    // ---- Dropbox ----
    if (strpos($url, 'dropbox.com') !== false) {
        $u = preg_replace('~\?dl=0~', '?raw=1', $url);
        if ($u === $url && strpos($url, 'raw=1') === false) {
            $sep = (strpos($url, '?') !== false) ? '&' : '?';
            $u = $url . $sep . 'raw=1';
        }
        return str_replace('www.dropbox.com', 'dl.dropboxusercontent.com', $u);
    }

    // ---- Anything else: return as-is (normal image URL) ----
    return $url;
}

/* Convenience: echo an <img> for a Drive/OneDrive link, with fallback */
function img($url, $alt = '', $class = '', $fallback = '') {
    $src = resolve_image($url, $fallback);
    if ($src === '') return '';
    return '<img src="' . e($src) . '" alt="' . e($alt) . '"' .
           ($class ? ' class="' . e($class) . '"' : '') .
           ' loading="lazy" referrerpolicy="no-referrer">';
}

/* ---- Slug helper ---- */
function slugify($text) {
    $text = strtolower(trim($text));
    $text = preg_replace('~[^a-z0-9]+~', '-', $text);
    return trim($text, '-') ?: 'post';
}

/* ---- Excerpt ---- */
function excerpt($html, $len = 160) {
    $t = trim(preg_replace('/\s+/', ' ', strip_tags($html)));
    return mb_strlen($t) > $len ? mb_substr($t, 0, $len) . '…' : $t;
}

/* ---- Simple icon set (inline SVG) for services ---- */
function service_icon($key) {
    $c = 'currentColor';
    $icons = [
      'analytics' => '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
      'chart'     => '<path d="M3 3v18h18"/><rect x="7" y="10" width="3" height="7"/><rect x="12" y="6" width="3" height="11"/><rect x="17" y="13" width="3" height="4"/>',
      'automation'=> '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
      'project'   => '<path d="M3 7h18v13H3z"/><path d="M8 7V4h8v3"/>',
      'data'      => '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
      'gear'      => '<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.6-2-3.4-2.4 1a7 7 0 0 0-1.7-1L14.5 2h-4l-.3 2.5a7 7 0 0 0-1.7 1l-2.4-1-2 3.4L4.1 11a7 7 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 1.7 1l.3 2.5h4l.3-2.5a7 7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.6a7 7 0 0 0 .1-1z"/>',
    ];
    $p = $icons[$key] ?? $icons['chart'];
    return '<svg viewBox="0 0 24 24" fill="none" stroke="' . $c . '" stroke-width="1.8" '
         . 'stroke-linecap="round" stroke-linejoin="round" width="34" height="34">' . $p . '</svg>';
}
