<?php
/* Database connection (PDO) + tiny query helpers */
require_once __DIR__ . '/config.php';

function db() {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ]);
        } catch (PDOException $e) {
            if (DEBUG) {
                die('Database connection failed: ' . htmlspecialchars($e->getMessage())
                    . '<br><br>Edit <code>config/config.php</code> with your database details, '
                    . 'and make sure you have imported <code>config/schema.sql</code>.');
            }
            die('The site is temporarily unavailable. Please try again later.');
        }
    }
    return $pdo;
}

/* Run a query with params, return statement */
function q($sql, $params = []) {
    $st = db()->prepare($sql);
    $st->execute($params);
    return $st;
}

/* Fetch one row */
function fetch1($sql, $params = []) { return q($sql, $params)->fetch(); }

/* Fetch all rows */
function fetchAll($sql, $params = []) { return q($sql, $params)->fetchAll(); }
