<?php

include 'db.php';

// Sanitize and validate input
$name = htmlspecialchars(trim($_POST['name']));
$phone = htmlspecialchars(trim($_POST['phone']));
$problem_type = htmlspecialchars(trim($_POST['problem_type']));
$description = htmlspecialchars(trim($_POST['description']));

// Validate phone number
if (!preg_match('/^[0-9]{10}$/', $phone)) {
    echo "<h2 style='color: red;'>Invalid phone number! Please enter a 10-digit number.</h2>";
    echo "<a href='index.html'>Go Back</a>";
    exit();
}

// Use prepared statements to prevent SQL injection
$stmt = $conn->prepare("INSERT INTO complaints(name, phone, problem_type, description) VALUES(?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $phone, $problem_type, $description);

if($stmt->execute()) {
    echo "<h2 style='color: green;'>Complaint Submitted Successfully!</h2>";
    echo "<p>Your complaint has been registered. Our team will look into it.</p>";
    echo "<a href='index.html'>Go Back to Home</a>";
} else {
    echo "<h2 style='color: red;'>Error: " . $stmt->error . "</h2>";
    echo "<a href='index.html'>Go Back</a>";
}

$stmt->close();
$conn->close();

?>