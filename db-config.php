<?php
include 'config.php';

// Create connection
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

// Check connection
if (!$conn) {
    if (APP_DEBUG === 'true') {
        die("Connection Failed: " . mysqli_connect_error());
    } else {
        die("Database connection error. Please try again later.");
    }
}

// Set charset to UTF-8
mysqli_set_charset($conn, "utf8mb4");

?>