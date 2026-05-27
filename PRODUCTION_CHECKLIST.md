# Production Environment Configuration

## Security Checklist

### 1. Environment Variables
- [ ] Created `.env` file from `.env.example`
- [ ] Set `APP_ENV=production`
- [ ] Set `APP_DEBUG=false`
- [ ] Updated all API keys
- [ ] Changed admin password
- [ ] Set strong database password
- [ ] `.env` file is NOT in Git
- [ ] `.env` permissions: `600` (read-only by owner)

### 2. Database Security
- [ ] Database user has minimal privileges
- [ ] Database password is strong (16+ chars)
- [ ] Remote database access disabled
- [ ] Regular backups scheduled
- [ ] Backup files stored securely
- [ ] Database charset: UTF-8

### 3. File & Directory Permissions
```bash
# Directories
chmod 755 /var/www/html/village-complaint-portal

# Log directory (writable)
chmod 755 logs/

# Upload directory (writable)
chmod 755 uploads/

# Config files
chmod 644 *.php
chmod 644 *.html
chmod 600 .env
```

### 4. SSL/HTTPS
- [ ] SSL certificate installed
- [ ] HTTPS forced with redirect
- [ ] HSTS headers enabled
- [ ] Certificate auto-renewal configured
- [ ] Mixed content warnings fixed

### 5. Apache Configuration
- [ ] Mod_rewrite enabled
- [ ] Mod_ssl enabled
- [ ] Directory listing disabled
- [ ] `.htaccess` protection enabled
- [ ] Security headers configured

### 6. PHP Configuration
- [ ] `display_errors = Off` in production
- [ ] `log_errors = On`
- [ ] `error_reporting = E_ALL`
- [ ] `session.secure = On` (if using HTTPS)
- [ ] `session.httponly = On`
- [ ] `session.samesite = Strict`

### 7. Application Security
- [ ] SQL injection prevention (prepared statements)
- [ ] XSS prevention (input sanitization)
- [ ] CSRF token implementation (optional)
- [ ] Rate limiting configured
- [ ] Input validation enabled
- [ ] Output encoding enabled

### 8. API Keys
- [ ] OpenWeatherMap API key set
- [ ] API rate limiting considered
- [ ] API endpoints verified
- [ ] API error handling implemented
- [ ] API key rotation scheduled

### 9. Monitoring & Logging
- [ ] Error logs accessible
- [ ] Log rotation configured
- [ ] Uptime monitoring enabled
- [ ] Security alerts configured
- [ ] Performance monitoring enabled

### 10. Backup & Disaster Recovery
- [ ] Daily database backups
- [ ] Weekly full backups
- [ ] Backup testing scheduled
- [ ] Backup retention policy set
- [ ] Disaster recovery plan documented

## Server Configuration

### Apache Security Headers

Add to `.htaccess` or Virtual Host:

```apache
# Security Headers
<IfModule mod_headers.c>
    # Prevent MIME type sniffing
    Header always set X-Content-Type-Options "nosniff"
    
    # Prevent clickjacking
    Header always set X-Frame-Options "SAMEORIGIN"
    
    # Enable XSS protection
    Header always set X-XSS-Protection "1; mode=block"
    
    # Force HTTPS
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    
    # Referrer Policy
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Disable directory listing
<FilesMatch "^\."> 
    <IfModule mod_authz_core.c>
        Require all denied
    </IfModule>
    <IfModule !mod_authz_core.c>
        Order allow,deny
        Deny from all
    </IfModule>
</FilesMatch>
```

### PHP Configuration (`php.ini`)

```ini
# Error Handling
error_reporting = E_ALL
display_errors = Off
log_errors = On
error_log = /var/log/php/error.log

# Session Configuration
session.secure = On
session.httponly = On
session.samesite = Strict
session.save_path = /var/lib/php/sessions

# File Uploads
upload_max_filesize = 10M
post_max_size = 20M
upload_tmp_dir = /tmp/php-uploads

# Execution
max_execution_time = 30
memory_limit = 128M

# Functions
disable_functions = exec,system,shell_exec,passthru,proc_open,proc_close,proc_terminate,proc_get_status,`
```

## Performance Optimization

### Caching
- [ ] Browser caching enabled
- [ ] Gzip compression enabled
- [ ] Static files minified
- [ ] Database query optimization
- [ ] Opcache enabled

### Database Optimization
```sql
-- Add indexes
ALTER TABLE complaints ADD INDEX idx_status (status);
ALTER TABLE complaints ADD INDEX idx_created_at (created_at);
ALTER TABLE complaints ADD INDEX idx_phone (phone);

-- Analyze table
ANALYZE TABLE complaints;
OPTIMIZE TABLE complaints;
```

## Monitoring Setup

### Error Log Monitoring
```bash
# Monitor errors in real-time
tail -f logs/error.log

# Count errors
grep -c "ERROR" logs/error.log

# Watch for specific errors
grep "mysql" logs/error.log
```

### Uptime Monitoring
- UptimeRobot (free)
- Pingdom
- AWS CloudWatch
- New Relic

### Security Monitoring
- ModSecurity (WAF)
- Fail2ban (brute force protection)
- OSSEC (host-based IDS)
- CloudFlare (optional CDN + DDoS)

## Scheduled Tasks (Cron)

```bash
# Edit crontab
crontab -e

# Daily database backup at 2 AM
0 2 * * * mysqldump -u villageuser -ppassword village_portal > /backups/$(date +\%Y-\%m-\%d).sql

# Weekly archive old logs at 3 AM
0 3 * * 0 tar -czf /var/log/village-app/$(date +\%Y-\%m-\%d).log.tar.gz /var/log/village-app/*.log

# Monthly cleanup of old backups (keep last 30 days)
0 4 1 * * find /backups -type f -mtime +30 -delete
```

## SSL/TLS Configuration

### Certificate Renewal (Auto)
```bash
# Let's Encrypt auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Check renewal status
sudo certbot renew --dry-run
```

### SSL Testing
```bash
# Check certificate
openssl s_client -connect yourdomain.com:443

# Verify certificate validity
sudo certbot certificates
```

## Deployment Verification

Run these checks after deployment:

```bash
# Check HTTPS
curl -I https://yourdomain.com

# Check security headers
curl -I https://yourdomain.com | grep -i "security\|strict\|xss"

# Check database connection
php -r 'include "db-config.php"; echo $conn ? "OK" : "FAILED";'

# Check PHP version
php -v

# Check extensions
php -m | grep -i "mysql\|openssl"
```

## Troubleshooting

### 502 Bad Gateway
- Check PHP-FPM status
- Check memory limits
- Check error logs

### 403 Forbidden
- Check file permissions
- Check directory ownership
- Check Apache configuration

### Database Connection Refused
- Check MySQL is running
- Check credentials in `.env`
- Check firewall rules
- Check MySQL port (3306)

### HTTPS Not Working
- Check certificate status
- Check ports 80 and 443 open
- Check firewall rules
- Verify domain pointing correctly

## Compliance

- [ ] GDPR compliant (if serving EU users)
- [ ] Terms of Service updated
- [ ] Privacy Policy published
- [ ] Cookie consent banner (if needed)
- [ ] Accessibility (WCAG 2.1) checked
- [ ] HIPAA compliant (if needed)

---

**Deployment Date:** ____________________
**Deployed By:** ____________________
**Production URL:** ____________________

**All checks passed:** ☐ YES ☐ NO