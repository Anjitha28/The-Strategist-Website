<?php
/* =====================================================================
   The Strategist — Configuration
   EDIT THE DATABASE DETAILS BELOW to match your hosting (cPanel/MySQL).
   ===================================================================== */

// ---- Database credentials ----
define('DB_HOST', 'localhost');
define('DB_NAME', 'strategist');      // the database you created
define('DB_USER', 'root');            // your DB username
define('DB_PASS', '');                // your DB password

// ---- Site base URL (no trailing slash). Leave '' to auto-detect. ----
define('BASE_URL', '');

// ---- Session name ----
define('SESSION_NAME', 'strategist_sess');

// Error display: set to false on a live site.
define('DEBUG', true);

if (DEBUG) { error_reporting(E_ALL); ini_set('display_errors', 1); }
else       { error_reporting(0);     ini_set('display_errors', 0); }

date_default_timezone_set('Asia/Kolkata');
