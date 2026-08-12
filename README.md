# The Strategist — Dynamic Website + Admin Panel

A complete, professional website for a **Data Analytics, Visualisation, Report Automation & Training** company. Every part of the site is editable from an easy admin panel — text, images, services, courses, projects, blog posts, leads, branding and colours. Images are added simply by **pasting a Google Drive or OneDrive share link** (no uploads needed).

Built with **PHP + MySQL** so it runs on any ordinary shared hosting (Hostinger, GoDaddy, Bluehost, cPanel, etc.) with no build tools.

---

## What's included

**Public website**
- Home, About, Services, Training/Courses, Projects/Portfolio, Blog (+ single post), Contact
- Light, colourful theme; fully responsive (mobile-friendly)
- Contact form that saves enquiries and can email you
- SEO fields, social links, Google Analytics support

**Admin panel** (`/admin`)
- Dashboard with live counts and recent enquiries
- **Page Content** — edit every heading, paragraph and image on each page
- **Services / Training / Projects / Blog** — add, edit, delete, reorder, show/hide
- **Clients / Logos** — add client logos (via Drive/OneDrive links) that appear in the home-page “Trusted by” strip
- **Leads** — view, filter, reply to, archive and delete enquiries
- **Settings & Branding** — logo, favicon, colours (theme updates instantly), contact details, social links, SEO
- **My Account** — change your username and password

---

## Quick setup (about 5 minutes)

### Step 1 — Upload the files
Upload the entire folder to your hosting's `public_html` (or a sub-folder) via cPanel File Manager or FTP.

### Step 2 — Create a database
In cPanel → **MySQL Databases**, create a database and a user, and add the user to the database with **all privileges**. Note the database name, username and password.

### Step 3 — Enter your database details
Open **`config/config.php`** and fill in:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'your_database_name');
define('DB_USER', 'your_database_user');
define('DB_PASS', 'your_database_password');
```

### Step 4 — Run the installer
Visit **`https://yourdomain.com/install.php`** in your browser and click **Run Installation**. This creates all the tables and sample content automatically.

> Prefer to do it manually? Instead of the installer, import **`config/schema.sql`** via phpMyAdmin.

### Step 5 — Log in and secure it
- Go to **`https://yourdomain.com/admin`**
- Log in with **username: `admin`** and **password: `admin123`**
- Open **My Account** and change your password immediately
- **Delete `install.php`** from your server

Done — start editing your site from the admin panel.

---

## How to add images (Google Drive / OneDrive)

Anywhere you see an image field:

1. In Google Drive or OneDrive, right-click the image → **Share** → set access to **“Anyone with the link.”**
2. Copy the link and paste it into the image field.
3. A live preview appears. Save — it's now on your website.

The system automatically converts Drive/OneDrive share links into displayable images. Dropbox and normal image URLs work too. If a preview says it can't load, the link isn't shared publicly yet.

---

## Changing your brand colours

Go to **Settings & Branding → Colours**, pick your colours, and save. Every button, heading and highlight across the whole site updates automatically — no code needed.

---

## Going live checklist

- [ ] Changed the admin password (My Account)
- [ ] Deleted `install.php`
- [ ] Set `DEBUG` to `false` in `config/config.php`
- [ ] Added your logo, contact details and social links in Settings
- [ ] Replaced sample services, courses, projects and blog posts

---

## File structure

```
/                 → public website pages (index, about, services, …)
/admin            → admin panel
/includes         → shared header, footer, helper functions
/assets           → CSS and JavaScript
/config           → config.php (your settings) + schema.sql (database)
install.php       → one-time web installer (delete after use)
```

## Default login
- **URL:** `/admin`
- **Username:** `admin`
- **Password:** `admin123`  *(change this immediately)*

## Requirements
PHP 7.4+ (works on PHP 8), MySQL 5.7+ / MariaDB, and the standard PDO MySQL extension — all default on virtually every shared host.
