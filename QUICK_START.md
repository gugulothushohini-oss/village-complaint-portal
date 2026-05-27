# Quick Start Guide - Live Deployment

## 🚀 Deploy Your Website in 5 Steps

### Step 1: Prepare Your Files
```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env with your production values
nano .env
```

### Step 2: Set Up Your Domain
- [ ] Register domain (GoDaddy, Namecheap, etc.)
- [ ] Point domain to hosting provider
- [ ] Wait 24-48 hours for DNS propagation

### Step 3: Choose Hosting & Deploy

**Option A: Traditional Hosting (Bluehost/GoDaddy)**
```
1. Login to cPanel
2. Go to File Manager
3. Upload files to public_html/
4. Create MySQL database
5. Import village.sql
6. Enable SSL certificate
7. Visit https://yourdomain.com
```

**Option B: AWS EC2**
```bash
# See DEPLOYMENT_GUIDE.md Part 3B for detailed steps
SSH into instance and follow automated setup
```

**Option C: Netlify (Frontend Only - Clock, Weather, Todo)**
```
1. Push to GitHub
2. Connect to Netlify
3. Deploy (auto-deploys on push)
4. Add environment variables
5. Visit https://yoursitename.netlify.app
```

### Step 4: Configure API Keys

**OpenWeatherMap:**
1. Visit https://openweathermap.org/api
2. Sign up (free)
3. Copy API key
4. Add to .env: `OPENWEATHER_API_KEY=your_key`

### Step 5: Verify & Test

```bash
# Test HTTPS
curl -I https://yourdomain.com

# Check security headers
curl -I https://yourdomain.com | grep -i strict

# Test database
php test-db-connection.php

# Check error logs
tail -f logs/error.log
```

---

## 📋 Pre-Deployment Checklist

- [ ] .env file created with all values
- [ ] Database created and imported
- [ ] SSL certificate installed
- [ ] OpenWeatherMap API key obtained
- [ ] Admin password changed
- [ ] File permissions set (755 for dirs, 644 for files)
- [ ] Email notifications configured (optional)
- [ ] Backup strategy planned
- [ ] Monitoring tool set up (optional)

---

## 🔧 Environment Variables (.env)

```ini
# Required
OPENWEATHER_API_KEY=your_api_key_here
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=strong_password
DB_NAME=village_portal

# Recommended
APP_URL=https://yourdomain.com
APP_ENV=production
APP_DEBUG=false
SECURE_ADMIN_PASSWORD=strong_admin_password
```

---

## 🌐 Which Hosting Provider?

| Provider | Best For | Cost | Difficulty |
|----------|----------|------|-------------|
| **Bluehost** | Beginners | $3-10/mo | Easy |
| **SiteGround** | PHP/MySQL | $3-7/mo | Easy |
| **AWS** | Scalability | $5-20/mo | Medium |
| **Netlify** | Frontend only | Free-$20 | Very Easy |
| **Firebase** | Serverless | Free | Medium |

---

## 📞 Support Resources

- **Full Guide:** See `DEPLOYMENT_GUIDE.md`
- **Security:** See `PRODUCTION_CHECKLIST.md`
- **GitHub:** https://github.com/gugulothushohini-oss/village-complaint-portal
- **Issues:** Post on GitHub Issues

---

## ⚠️ Important Security Notes

1. **Never commit .env to GitHub** ✅ Already in .gitignore
2. **Always use HTTPS** in production
3. **Change default admin password** immediately
4. **Keep PHP/MySQL updated** for security patches
5. **Enable automated backups** on your server
6. **Monitor error logs** regularly
7. **Use strong passwords** (16+ characters)
8. **Enable Two-Factor Authentication** (if available)

---

**Your website is ready to go live!** 🚀