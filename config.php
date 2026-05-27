<?php
// Load environment variables
if (file_exists(__DIR__ . '/.env')) {
    $env = parse_ini_file(__DIR__ . '/.env');
    foreach ($env as $key => $value) {
        putenv("$key=$value");
    }
}

// Database Configuration
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASSWORD', getenv('DB_PASSWORD') ?: '');
define('DB_NAME', getenv('DB_NAME') ?: 'village_portal');

// Application Configuration
define('APP_NAME', getenv('APP_NAME') ?: 'Village Complaint Portal');
define('APP_ENV', getenv('APP_ENV') ?: 'development');
define('APP_DEBUG', getenv('APP_DEBUG') ?: 'false');
define('APP_URL', getenv('APP_URL') ?: 'http://localhost');

// Security
define('ADMIN_PASSWORD', getenv('SECURE_ADMIN_PASSWORD') ?: 'admin123');

// API Keys
define('OPENWEATHER_API_KEY', getenv('OPENWEATHER_API_KEY') ?: '');

// Session Configuration
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Error Handling
if (APP_DEBUG === 'true') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
    ini_set('display_errors', 0);
    ini_set('log_errors', 1);
    ini_set('error_log', __DIR__ . '/logs/error.log');
}

// Security Headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: 1; mode=block');
if (strpos(APP_URL, 'https') === 0) {
    header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
}

?>