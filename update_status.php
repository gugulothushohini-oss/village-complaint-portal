<?php

include 'db.php';

$id = intval($_POST['id']);
$status = htmlspecialchars(trim($_POST['status']));

// Use prepared statement to prevent SQL injection
$stmt = $conn->prepare("UPDATE complaints SET status=? WHERE id=?");
$stmt->bind_param("si", $status, $id);

if($stmt->execute()) {
    header("Location: admin.php");
} else {
    echo "Error updating status: " . $stmt->error;
}

$stmt->close();
$conn->close();

?>