<?php
include 'db.php';

// Simple password protection (use proper authentication in production)
$admin_password = "admin123"; // Change this!

if (!isset($_SESSION['admin_logged_in'])) {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $password = $_POST['password'] ?? '';
        if ($password === $admin_password) {
            $_SESSION['admin_logged_in'] = true;
        } else {
            $error = "Invalid password!";
        }
    }
}

if (!isset($_SESSION['admin_logged_in'])) {
    ?>
    <!DOCTYPE html>
    <html>
    <head>
        <title>Admin Login</title>
        <style>
            body {
                font-family: Arial;
                background: #f5f5f5;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            .login-box {
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
                width: 300px;
            }
            h1 {
                text-align: center;
                color: green;
            }
            input {
                width: 100%;
                padding: 10px;
                margin: 10px 0;
                border: 1px solid #ddd;
                border-radius: 5px;
                box-sizing: border-box;
            }
            button {
                width: 100%;
                padding: 10px;
                background: green;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
            }
            button:hover {
                background: darkgreen;
            }
            .error {
                color: red;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="login-box">
            <h1>Admin Login</h1>
            <?php if (isset($error)) echo "<p class='error'>$error</p>"; ?>
            <form method="POST">
                <input type="password" name="password" placeholder="Enter Admin Password" required>
                <button type="submit">Login</button>
            </form>
        </div>
    </body>
    </html>
    <?php
    exit();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Panel</title>
    <style>
        body {
            font-family: Arial;
            background: #f5f5f5;
            padding: 20px;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        h1 {
            text-align: center;
            color: green;
        }
        .logout {
            background: red;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }
        .logout:hover {
            background: darkred;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: center;
        }
        th {
            background: green;
            color: white;
        }
        tr:hover {
            background: #f9f9f9;
        }
        select, button {
            padding: 5px;
            border: 1px solid #ccc;
            border-radius: 3px;
            cursor: pointer;
        }
        button {
            background: green;
            color: white;
            border: none;
        }
        button:hover {
            background: darkgreen;
        }
    </style>
</head>
<body>

<div class="header">
    <h1>Admin Complaint Dashboard</h1>
    <a href="?logout=true" class="logout">Logout</a>
</div>

<?php
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: admin.php");
}
?>

<table>
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Phone</th>
        <th>Problem</th>
        <th>Description</th>
        <th>Status</th>
        <th>Update</th>
    </tr>

    <?php
    $result = mysqli_query($conn, "SELECT * FROM complaints ORDER BY id DESC");

    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
    ?>
    <tr>
        <td><?php echo htmlspecialchars($row['id']); ?></td>
        <td><?php echo htmlspecialchars($row['name']); ?></td>
        <td><?php echo htmlspecialchars($row['phone']); ?></td>
        <td><?php echo htmlspecialchars($row['problem_type']); ?></td>
        <td><?php echo htmlspecialchars($row['description']); ?></td>
        <td><?php echo htmlspecialchars($row['status']); ?></td>
        <td>
            <form action="update_status.php" method="POST" style="display:inline;">
                <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
                <select name="status">
                    <option value="Pending" <?php if($row['status'] == 'Pending') echo 'selected'; ?>>Pending</option>
                    <option value="In Progress" <?php if($row['status'] == 'In Progress') echo 'selected'; ?>>In Progress</option>
                    <option value="Resolved" <?php if($row['status'] == 'Resolved') echo 'selected'; ?>>Resolved</option>
                </select>
                <button type="submit">Update</button>
            </form>
        </td>
    </tr>
    <?php
        }
    } else {
        echo "<tr><td colspan='7'>No complaints found</td></tr>";
    }
    ?>
</table>

</body>
</html>

<?php
$conn->close();
?>