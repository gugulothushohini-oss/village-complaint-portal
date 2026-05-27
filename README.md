# Village Complaint Portal

A web-based platform for villagers to raise complaints and for admins to manage them efficiently.

## Features

✅ Online complaint submission
✅ Sarpanch details display
✅ Admin dashboard
✅ Complaint status tracking (Pending, In Progress, Resolved)
✅ Database storage with MySQL
✅ Responsive design
✅ Security improvements (prepared statements, input validation)

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** PHP
- **Database:** MySQL
- **Server:** Apache (XAMPP)

## Installation & Setup

### Step 1: Install Required Software

1. **Visual Studio Code:** [https://code.visualstudio.com](https://code.visualstudio.com)
2. **XAMPP:** [https://www.apachefriends.org](https://www.apachefriends.org)

### Step 2: Create Project Folder

Create a folder `village-complaint-portal` inside:
```
htdocs/
   └── village-complaint-portal/
```

### Step 3: Copy Files

Copy these files into your project folder:
- `index.html` - Main website page
- `style.css` - Styling
- `db.php` - Database connection
- `submit_complaint.php` - Process complaint submission
- `admin.php` - Admin dashboard
- `update_status.php` - Update complaint status
- `village.sql` - Database schema

### Step 4: Create Database

1. Start **Apache** and **MySQL** in XAMPP
2. Open: `http://localhost/phpmyadmin`
3. Create a new database named `village_portal`
4. Import `village.sql` file (or run the SQL commands)

SQL Commands:
```sql
CREATE DATABASE village_portal;

USE village_portal;

CREATE TABLE complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    problem_type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Step 5: Configure Database Connection

Edit `db.php` if needed:
```php
$host = "localhost";
$user = "root";           // Your MySQL username
$password = "";           // Your MySQL password
$database = "village_portal";
```

### Step 6: Run the Website

1. Start XAMPP (Apache + MySQL)
2. Open your browser
3. Visit: `http://localhost/village-complaint-portal`

### Step 7: Access Admin Panel

- URL: `http://localhost/village-complaint-portal/admin.php`
- **Default Password:** `admin123`
- ⚠️ **Change this password in `admin.php` file!**

## Project Structure

```
village-complaint-portal/
├── index.html                # Main website
├── style.css                 # Website styling
├── db.php                    # Database connection
├── submit_complaint.php      # Complaint submission handler
├── admin.php                 # Admin dashboard with login
├── update_status.php         # Status update handler
├── village.sql               # Database schema
└── README.md                 # This file
```

## How It Works

1. **Villager visits the website** → `index.html`
2. **Fills and submits complaint form** → `submit_complaint.php`
3. **Complaint stored in database** → MySQL
4. **Admin logs into dashboard** → `admin.php`
5. **Admin views all complaints** and updates status
6. **Status changes reflected immediately**

## Security Features

✅ Prepared statements (prevent SQL injection)
✅ Input sanitization (prevent XSS)
✅ Phone number validation
✅ Admin password protection
✅ HTML output escaping

## Future Improvements

- User login system with registration
- OTP verification for security
- Complaint tracking page for users
- Image upload support
- SMS/Email notifications
- Multi-language support (Telugu, Hindi, etc.)
- Mobile app
- AI chatbot support
- Advanced search and filters
- User ratings and feedback

## Important Notes

⚠️ **Before Deployment:**

1. Change admin password in `admin.php`
2. Use proper authentication instead of simple password
3. Implement HTTPS (SSL/TLS)
4. Add CAPTCHA to prevent spam
5. Set up email notifications
6. Backup database regularly
7. Keep software updated

## Troubleshooting

### Database Connection Error
- Ensure XAMPP MySQL is running
- Check database credentials in `db.php`
- Verify database `village_portal` exists

### Complaint Not Submitting
- Check form field names match PHP variables
- Verify MySQL user has INSERT permissions
- Check PHP error logs

### Admin Page Not Loading
- Start Apache and MySQL in XAMPP
- Check database connection
- Clear browser cache

## Contact & Support

For issues or questions, please open an issue in the repository.

## License

Free to use for educational and community projects.

---

**Happy Coding! 🚀**