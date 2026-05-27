# Deployment Guide for Village Complaint Portal

## 🚀 Live Website Deployment

Complete guide to deploy your application to a live server.

---

## Part 1: Choose Hosting Provider

### Option A: Traditional Web Hosting (Recommended for Full Stack)

**Providers:** Bluehost, HostGator, SiteGround, GoDaddy

**Requirements:**
- PHP 7.4+ support
- MySQL 5.7+ support
- cPanel access
- HTTPS/SSL certificate

**Cost:** $3-15/month

### Option B: Cloud Platforms

**AWS:**
- EC2 instance + RDS database
- Scalable and flexible
- Cost: Pay-as-you-go (~$5-20/month)

**Google Cloud / Azure:**
- Similar to AWS
- Free tier available
- Professional-grade infrastructure

### Option C: Free Platforms (Frontend Only)

**Netlify / Vercel:**
- Perfect for static HTML/CSS/JS
- Deploy clock, weather, todo apps
- Complaint portal requires backend

**Firebase:**
- Google's platform
- Free tier included
- Good for static + serverless functions

---

## Part 2: Prepare Files for Deployment

### Step 1: Set Up Environment Variables

1. **Create `.env` file** from `.env.example`:
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` with your production values:**
   ```
   OPENWEATHER_API_KEY=your_actual_api_key
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_secure_password
   DB_NAME=village_portal
   APP_URL=https://yourdomain.com
   APP_ENV=production
   SECURE_ADMIN_PASSWORD=your_secure_password
   ```

3. **Keep `.env` secure:**
   - Never commit to GitHub
   - Already in `.gitignore`
   - Only on your server

### Step 2: Create Essential Directories

```bash
mkdir -p logs
mkdir -p uploads
mkdir -p cache
chmod 755 logs uploads cache
```

### Step 3: Prepare Database

1. Import `village.sql` to your live database
2. Test connection with `db-config.php`
3. Verify all tables created

---

## Part 3A: Deploy to Traditional Hosting

### Using cPanel (GoDaddy, Bluehost, HostGator)

#### Step 1: Connect via FTP/SFTP

1. Get FTP credentials from cPanel
2. Use FileZilla or WinSCP
3. Connect to your server

#### Step 2: Upload Files

1. **Navigate to public_html:**
   ```
   public_html/village-complaint-portal/
   ```

2. **Upload all files:**
   - index.html, clock.html, weather.html, todo.html
   - style.css, clock-style.css, weather-style.css, todo-style.css
   - *.js files
   - PHP files (db.php, db-config.php, config.php, submit_complaint.php, admin.php, update_status.php)
   - .env file (⚠️ Keep secure!)

3. **Create folders:**
   - logs/
   - uploads/
   - cache/

#### Step 3: Configure Database

1. **In cPanel, go to MySQL Databases**
2. **Create new database:**
   - Name: yourusername_village
   - Note the hostname

3. **Create MySQL user:**
   - Username: yourusername_villageuser
   - Password: Very strong password!

4. **Update `.env`:**
   ```
   DB_HOST=localhost
   DB_USER=yourusername_villageuser
   DB_PASSWORD=your_password
   DB_NAME=yourusername_village
   ```

5. **Import database:**
   - Go to phpMyAdmin
   - Select your database
   - Import `village.sql`

#### Step 4: Enable SSL/HTTPS

1. **In cPanel:**
   - Go to "AutoSSL" or "SSL/TLS Status"
   - Install free Let's Encrypt certificate
   - Wait 15-30 minutes for activation

2. **Force HTTPS:**
   - Create/edit `.htaccess`:
   ```apache
   <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteCond %{HTTPS} off
       RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   </IfModule>
   ```

#### Step 5: Test Your Site

```
https://yourdomain.com/village-complaint-portal/
```

---

## Part 3B: Deploy to AWS EC2

### Step 1: Launch EC2 Instance

1. **Create Ubuntu 20.04 LTS instance**
2. **Select t2.micro (free tier)**
3. **Configure security group:**
   - Allow HTTP (80)
   - Allow HTTPS (443)
   - Allow SSH (22)

### Step 2: Connect & Install

```bash
# Connect via SSH
ssh -i your-key.pem ubuntu@your-instance-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install LAMP stack
sudo apt install apache2 mysql-server php php-mysql -y

# Enable Apache modules
sudo a2enmod rewrite
sudo a2enmod ssl

# Start services
sudo systemctl start apache2
sudo systemctl start mysql
sudo systemctl enable apache2
sudo systemctl enable mysql
```

### Step 3: Upload Files

```bash
# Create project directory
sudo mkdir -p /var/www/html/village-complaint-portal
sudo chown -R ubuntu:ubuntu /var/www/html/village-complaint-portal

# Use SCP to upload files
scp -i your-key.pem -r ./* ubuntu@your-instance-ip:/var/www/html/village-complaint-portal/

# Set permissions
sudo chmod 755 /var/www/html/village-complaint-portal
sudo chmod 755 /var/www/html/village-complaint-portal/logs
```

### Step 4: Configure Database

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE village_portal;
CREATE USER 'villageuser'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON village_portal.* TO 'villageuser'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Import schema
mysql -u villageuser -p village_portal < village.sql
```

### Step 5: Enable SSL/HTTPS

```bash
# Install Certbot
sudo apt install certbot python3-certbot-apache -y

# Get certificate (replace with your domain)
sudo certbot --apache -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo systemctl enable certbot.timer
```

### Step 6: Configure Apache

```bash
# Create virtual host config
sudo nano /etc/apache2/sites-available/village.conf
```

Add:
```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com
    DocumentRoot /var/www/html/village-complaint-portal
    
    <Directory /var/www/html/village-complaint-portal>
        AllowOverride All
        Require all granted
    </Directory>
    
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</VirtualHost>

<VirtualHost *:443>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com
    DocumentRoot /var/www/html/village-complaint-portal
    
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/yourdomain.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/yourdomain.com/privkey.pem
    
    <Directory /var/www/html/village-complaint-portal>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

```bash
# Enable site and reload
sudo a2ensite village.conf
sudo apache2ctl configtest
sudo systemctl reload apache2
```

---

## Part 3C: Deploy to Netlify (Frontend Only)

### Best For: Clock, Weather, To-Do apps

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```

2. **Connect to Netlify:**
   - Visit netlify.com
   - Click "New site from Git"
   - Select your GitHub repo
   - Build command: (leave blank)
   - Publish directory: . (root)

3. **Add Environment Variables:**
   - Site settings → Build & deploy → Environment
   - Add OPENWEATHER_API_KEY

4. **Deploy:**
   - Netlify auto-deploys on Git push

**URL:** https://yoursitename.netlify.app

---

## Part 4: Post-Deployment Checklist

### Security ✅
- [ ] HTTPS/SSL enabled
- [ ] `.env` file secured
- [ ] Admin password changed
- [ ] Database credentials updated
- [ ] Firewall configured
- [ ] Regular backups enabled

### Performance ✅
- [ ] Static files cached
- [ ] Gzip compression enabled
- [ ] Database optimized
- [ ] CDN configured (optional)

### Monitoring ✅
- [ ] Error logs checked
- [ ] Site uptime monitoring
- [ ] Database backups scheduled
- [ ] Security updates scheduled

### Testing ✅
- [ ] All pages load correctly
- [ ] Forms submit properly
- [ ] Weather API works
- [ ] Local storage working
- [ ] Mobile responsive
- [ ] HTTPS works

---

## Part 5: Domain Setup

### If buying domain separately:

1. **Buy domain from:**
   - GoDaddy, Namecheap, Google Domains, Bluehost

2. **Point domain to hosting:**
   - Get nameservers from hosting provider
   - Update nameservers in domain settings
   - Wait 24-48 hours for propagation

3. **Verify DNS:**
   ```bash
   nslookup yourdomain.com
   ```

---

## Part 6: Maintenance

### Regular Tasks

**Weekly:**
- Check error logs
- Verify site functionality

**Monthly:**
- Backup database
- Update dependencies
- Review security settings

**Quarterly:**
- Security audit
- Performance optimization
- Compliance check

### Backup Strategy

**Option 1: Automated**
- Use hosting provider's backup
- Most include daily backups

**Option 2: Manual**
```bash
# Backup database
mysqldump -u villageuser -p village_portal > backup.sql

# Backup files
tar -czf site-backup.tar.gz /var/www/html/village-complaint-portal/
```

---

## Part 7: Update Weather API Key in Production

### Method 1: Via .env File
1. Edit `.env` on server
2. Add your API key
3. Restart application

### Method 2: Via Admin Panel (if you create one)
1. Login to admin
2. Settings → API Keys
3. Update and save

---

## Troubleshooting

### Site shows blank page
- Check error logs: `logs/error.log`
- Verify PHP version: PHP 7.4+
- Check file permissions: `chmod 755`

### Database connection error
- Verify `.env` credentials
- Check MySQL is running
- Verify user permissions

### API not working
- Check OPENWEATHER_API_KEY in `.env`
- Verify API key is valid
- Check internet connection

### HTTPS not working
- Wait for SSL certificate propagation
- Clear browser cache
- Check certificate status

---

## Support & Resources

- **PHP Hosting Guide:** https://www.php.net/manual/en/install.php
- **MySQL Docs:** https://dev.mysql.com/doc/
- **Apache Docs:** https://httpd.apache.org/docs/
- **Let's Encrypt:** https://letsencrypt.org/
- **Netlify Docs:** https://docs.netlify.com/
- **AWS Free Tier:** https://aws.amazon.com/free/

---

**Your site is now production-ready!** 🚀

For questions or issues, check the application-specific README files:
- README.md - Main portal
- CLOCK_README.md - Digital clock
- WEATHER_README.md - Weather dashboard
- TODO_README.md - To-do list