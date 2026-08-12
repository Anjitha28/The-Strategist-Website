-- =====================================================================
--  The Strategist — Database Schema
--  Data Analytics, Visualisation, Report Automation & Training
--  Import this file once via phpMyAdmin (or `mysql < schema.sql`)
-- =====================================================================
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ---------------------------------------------------------------------
--  Admin users
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id`            INT AUTO_INCREMENT PRIMARY KEY,
  `name`          VARCHAR(120) NOT NULL,
  `username`      VARCHAR(60)  NOT NULL UNIQUE,
  `email`         VARCHAR(160) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role`          VARCHAR(30)  NOT NULL DEFAULT 'admin',
  `created_at`    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Default admin — username: admin  password: admin123  (CHANGE AFTER LOGIN)
-- Hash below is bcrypt for "admin123". (The web installer re-hashes this too.)
INSERT INTO `admin_users` (`name`,`username`,`email`,`password_hash`,`role`)
VALUES ('Administrator','admin','admin@thestrategist.com',
       '$2b$10$BROLckTE4Yvyz8SajnIl2ODaNmxCVZrTIS8K7bFFqUIELnYlmkEbS','superadmin')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- ---------------------------------------------------------------------
--  Global settings (branding, contact, colours, SEO, social)  key/value
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `settings` (
  `skey`  VARCHAR(80) PRIMARY KEY,
  `svalue` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `settings` (`skey`,`svalue`) VALUES
  ('site_name','The Strategist'),
  ('tagline','Data Analytics, Visualisation & Report Automation'),
  ('logo_url',''),
  ('favicon_url',''),
  ('color_primary','#6D4AFF'),
  ('color_secondary','#FF6B5E'),
  ('color_accent','#FF4E8E'),
  ('color_dark','#241246'),
  ('contact_email','hello@thestrategist.com'),
  ('contact_phone','+91 00000 00000'),
  ('contact_address','Your City, Your Country'),
  ('map_embed',''),
  ('social_facebook','#'),
  ('social_twitter','#'),
  ('social_linkedin','#'),
  ('social_instagram','#'),
  ('footer_text','Turning raw data into decisions — analytics, visualisation, automation & training.'),
  ('seo_description','The Strategist provides data analytics, visualisation and report automation services plus professional training for colleges and organisations.'),
  ('seo_keywords','data analytics, data visualisation, report automation, power bi, reporting, training'),
  ('gtag_id','')
ON DUPLICATE KEY UPDATE `skey`=`skey`;

-- ---------------------------------------------------------------------
--  Editable content blocks for every page (page + block key -> value)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `content_blocks` (
  `id`        INT AUTO_INCREMENT PRIMARY KEY,
  `page`      VARCHAR(60)  NOT NULL,
  `block_key` VARCHAR(80)  NOT NULL,
  `label`     VARCHAR(160) NOT NULL,
  `type`      VARCHAR(20)  NOT NULL DEFAULT 'text',  -- text | textarea | image | html
  `value`     MEDIUMTEXT,
  `sort`      INT NOT NULL DEFAULT 0,
  UNIQUE KEY `page_key` (`page`,`block_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `content_blocks` (`page`,`block_key`,`label`,`type`,`value`,`sort`) VALUES
  -- HOME
  ('home','hero_eyebrow','Hero — small text above title','text','EXPLORE DATA',1),
  ('home','hero_title','Hero — main title','text','Analytics That Drive Decisions',2),
  ('home','hero_subtitle','Hero — subtitle','textarea','We help organisations turn raw data into clear visualisations, automated reports and confident decisions — and we train teams to do the same.',3),
  ('home','hero_cta_text','Hero — button text','text','Explore Our Work',4),
  ('home','hero_cta_link','Hero — button link','text','projects.php',5),
  ('home','hero_image','Hero — image (Drive/OneDrive link)','image','',6),
  ('home','stats_projects','Stat — projects delivered','text','120+',7),
  ('home','stats_clients','Stat — organisations served','text','40+',8),
  ('home','stats_trained','Stat — professionals trained','text','2,500+',9),
  ('home','stats_years','Stat — years of experience','text','10+',10),
  ('home','services_title','Services section — title','text','What We Do',11),
  ('home','services_subtitle','Services section — subtitle','textarea','End-to-end data services, from collection to insight.',12),
  ('home','cta_title','Bottom CTA — title','text','Ready to make your data work harder?',13),
  ('home','cta_subtitle','Bottom CTA — subtitle','textarea','Let us build your reports, automate your analytics, or train your team.',14),
  ('home','clients_title','Clients section — title','text','Trusted by teams we work with',15),
  ('home','clients_subtitle','Clients section — subtitle','textarea','Organisations and institutions we have partnered with.',16),
  -- ABOUT
  ('about','title','About — page title','text','About The Strategist',1),
  ('about','intro','About — intro paragraph','textarea','We are a team of data analysts, visualisation experts and trainers with a decade of experience helping organisations and students make sense of their data.',2),
  ('about','mission','About — mission','textarea','To make data-driven decision making accessible to every organisation, regardless of size or sector.',3),
  ('about','vision','About — vision','textarea','A world where every decision is backed by clear, trustworthy insight.',4),
  ('about','image','About — image (Drive/OneDrive link)','image','',5),
  ('about','story','About — our story (HTML allowed)','html','<p>The Strategist began with a simple belief: data should empower people, not overwhelm them. Over ten years we have delivered analytics and automation projects for organisations across industries, while training thousands of students and professionals.</p>',6),
  -- SERVICES
  ('services','title','Services — page title','text','Our Services',1),
  ('services','subtitle','Services — subtitle','textarea','Comprehensive data services tailored to your goals.',2),
  -- TRAINING
  ('training','title','Training — page title','text','Training & Courses',1),
  ('training','subtitle','Training — subtitle','textarea','Practical, project-based training for colleges and working professionals.',2),
  -- PROJECTS
  ('projects','title','Projects — page title','text','Projects & Case Studies','1'),
  ('projects','subtitle','Projects — subtitle','textarea','A selection of the work we are proud of.',2),
  -- BLOG
  ('blog','title','Blog — page title','text','Insights & Blog',1),
  ('blog','subtitle','Blog — subtitle','textarea','Ideas, tutorials and news from the world of data.',2),
  -- CONTACT
  ('contact','title','Contact — page title','text','Get in Touch',1),
  ('contact','subtitle','Contact — subtitle','textarea','Tell us about your project or training needs and we will get back to you.',2)
ON DUPLICATE KEY UPDATE `page`=`page`;

-- ---------------------------------------------------------------------
--  Services
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `services` (
  `id`          INT AUTO_INCREMENT PRIMARY KEY,
  `title`       VARCHAR(160) NOT NULL,
  `description` TEXT,
  `icon`        VARCHAR(60) DEFAULT 'chart',   -- icon key OR use image_url
  `image_url`   TEXT,
  `sort`        INT NOT NULL DEFAULT 0,
  `active`      TINYINT(1) NOT NULL DEFAULT 1,
  `created_at`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `services` (`title`,`description`,`icon`,`sort`) VALUES
  ('Data Analytics','Uncover trends and answers in your data with rigorous statistical analysis and clear reporting.','analytics',1),
  ('Data Visualisation','Beautiful, interactive visualisations in Power BI, Tableau and the web that make insight obvious.','chart',2),
  ('Report Automation','Replace manual spreadsheets with automated pipelines that deliver reports on schedule.','automation',3),
  ('Consulting & Projects','Hands-on delivery for your data projects — from strategy to production.','project',4);

-- ---------------------------------------------------------------------
--  Training / Courses
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `training` (
  `id`          INT AUTO_INCREMENT PRIMARY KEY,
  `title`       VARCHAR(180) NOT NULL,
  `description` TEXT,
  `audience`    VARCHAR(120) DEFAULT 'Professionals',
  `level`       VARCHAR(60)  DEFAULT 'All levels',
  `duration`    VARCHAR(60)  DEFAULT '4 weeks',
  `price`       VARCHAR(60)  DEFAULT '',
  `image_url`   TEXT,
  `sort`        INT NOT NULL DEFAULT 0,
  `active`      TINYINT(1) NOT NULL DEFAULT 1,
  `created_at`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `training` (`title`,`description`,`audience`,`level`,`duration`,`price`,`sort`) VALUES
  ('Data Analytics Bootcamp','Hands-on programme covering Excel, SQL, Python and data visualisation through real projects.','College Students','Beginner','8 weeks','',1),
  ('Power BI for Professionals','Build production reports and automated analytics pipelines for your organisation.','Professionals','Intermediate','4 weeks','',2),
  ('Data Storytelling Workshop','Learn to communicate insight clearly to non-technical stakeholders.','Teams','All levels','2 days','',3);

-- ---------------------------------------------------------------------
--  Projects / Portfolio
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `projects` (
  `id`          INT AUTO_INCREMENT PRIMARY KEY,
  `title`       VARCHAR(180) NOT NULL,
  `category`    VARCHAR(80)  DEFAULT 'Analytics',
  `client`      VARCHAR(120) DEFAULT '',
  `description` TEXT,
  `image_url`   TEXT,
  `link`        TEXT,
  `featured`    TINYINT(1) NOT NULL DEFAULT 0,
  `sort`        INT NOT NULL DEFAULT 0,
  `active`      TINYINT(1) NOT NULL DEFAULT 1,
  `created_at`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `projects` (`title`,`category`,`client`,`description`,`featured`,`sort`) VALUES
  ('Retail Sales Report','Visualisation','Retail Chain','A live Power BI report consolidating sales across 40 stores.',1,1),
  ('Automated Finance Reports','Automation','Finance Firm','Automated month-end reporting pipeline that saved 30 hours a month.',1,2),
  ('Student Performance Analytics','Analytics','University','Predictive analytics identifying at-risk students early.',0,3);

-- ---------------------------------------------------------------------
--  Blog posts
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id`          INT AUTO_INCREMENT PRIMARY KEY,
  `title`       VARCHAR(200) NOT NULL,
  `slug`        VARCHAR(220) NOT NULL UNIQUE,
  `excerpt`     TEXT,
  `content`     MEDIUMTEXT,
  `image_url`   TEXT,
  `author`      VARCHAR(120) DEFAULT 'The Strategist',
  `category`    VARCHAR(80)  DEFAULT 'Insights',
  `status`      VARCHAR(20)  NOT NULL DEFAULT 'published', -- published | draft
  `published_at`DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `blog_posts` (`title`,`slug`,`excerpt`,`content`,`author`,`category`) VALUES
  ('5 Signs Your Reports Should Be Automated','5-signs-automate-reports','If your team spends days copying data into spreadsheets each month, it is time to automate.','<p>Manual reporting is slow and error-prone. Here are five signs it is time to move to automated pipelines...</p>','The Strategist','Automation'),
  ('Choosing the Right Chart for Your Data','choosing-the-right-chart','A quick guide to picking visualisations that actually communicate.','<p>The wrong chart can hide your insight. This guide walks through when to use bars, lines, and more...</p>','The Strategist','Visualisation')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- ---------------------------------------------------------------------
--  Clients / partner logos (shown on the home page)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `clients` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `name`       VARCHAR(160) NOT NULL,
  `logo_url`   TEXT,
  `link`       TEXT,
  `sort`       INT NOT NULL DEFAULT 0,
  `active`     TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `clients` (`name`,`logo_url`,`link`,`sort`) VALUES
  ('Client One','','',1),
  ('Client Two','','',2),
  ('Client Three','','',3),
  ('Client Four','','',4),
  ('Client Five','','',5)
ON DUPLICATE KEY UPDATE `id`=`id`;

-- ---------------------------------------------------------------------
--  Leads / contact submissions
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `leads` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `name`       VARCHAR(140) NOT NULL,
  `email`      VARCHAR(160) NOT NULL,
  `phone`      VARCHAR(60),
  `subject`    VARCHAR(200),
  `message`    TEXT,
  `status`     VARCHAR(20) NOT NULL DEFAULT 'new',  -- new | read | archived
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
