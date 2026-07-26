-- CreateTable
CREATE TABLE `contactsubmission` (
    `id` VARCHAR(191) NOT NULL,
    `fullname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NULL,
    `subject` VARCHAR(191) NOT NULL,
    `service` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `subscribe` BOOLEAN NOT NULL DEFAULT false,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `ipaddress` VARCHAR(191) NULL,
    `useragent` VARCHAR(191) NULL,
    `createdat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedat` DATETIME(3) NOT NULL,
    `contactedat` DATETIME(3) NULL,

    INDEX `contactsubmission_email_idx`(`email`),
    INDEX `contactsubmission_status_idx`(`status`),
    INDEX `contactsubmission_createdat_idx`(`createdat`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `heroslide` (
    `id` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `subtitle` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `buttontext` VARCHAR(191) NOT NULL,
    `buttonlink` VARCHAR(191) NOT NULL,
    `isactive` BOOLEAN NOT NULL DEFAULT true,

    INDEX `heroslide_order_idx`(`order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stat` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NULL,
    `description` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `category` VARCHAR(191) NULL,
    `order` INTEGER NOT NULL,
    `isactive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `service_slug_key`(`slug`),
    INDEX `service_order_idx`(`order`),
    INDEX `service_slug_idx`(`slug`),
    INDEX `service_category_idx`(`category`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `servicecategory` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `createdat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedat` DATETIME(3) NOT NULL,

    UNIQUE INDEX `servicecategory_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NULL,
    `order` INTEGER NOT NULL,
    `isactive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `product_slug_key`(`slug`),
    INDEX `product_order_idx`(`order`),
    INDEX `product_slug_idx`(`slug`),
    INDEX `product_category_idx`(`category`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productcategory` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `createdat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedat` DATETIME(3) NOT NULL,

    UNIQUE INDEX `productcategory_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `tags` TEXT NOT NULL,
    `order` INTEGER NOT NULL,
    `isactive` BOOLEAN NOT NULL DEFAULT true,
    `createdat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `project_order_idx`(`order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `processstep` (
    `id` VARCHAR(191) NOT NULL,
    `step` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL,

    INDEX `processstep_order_idx`(`order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faq` (
    `id` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL,
    `isactive` BOOLEAN NOT NULL DEFAULT true,

    INDEX `faq_order_idx`(`order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `partner` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NULL,
    `order` INTEGER NOT NULL,
    `isactive` BOOLEAN NOT NULL DEFAULT true,

    INDEX `partner_order_idx`(`order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teammember` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `order` INTEGER NOT NULL,
    `isactive` BOOLEAN NOT NULL DEFAULT true,

    INDEX `teammember_order_idx`(`order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teammembersocial` (
    `id` VARCHAR(191) NOT NULL,
    `instagram` VARCHAR(191) NULL,
    `twitter` VARCHAR(191) NULL,
    `linkedin` VARCHAR(191) NULL,
    `github` VARCHAR(191) NULL,
    `tiktok` VARCHAR(191) NULL,
    `teammemberid` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `teammembersocial_teammemberid_key`(`teammemberid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `testimonial` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL,
    `isactive` BOOLEAN NOT NULL DEFAULT true,

    INDEX `testimonial_order_idx`(`order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `milestone` (
    `id` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `imagealt` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL,

    INDEX `milestone_order_idx`(`order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pricingplan` (
    `id` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `tier` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `priceugx` VARCHAR(191) NOT NULL,
    `priceusd` VARCHAR(191) NULL,
    `priceugxmonthly` VARCHAR(191) NULL,
    `priceusdmonthly` VARCHAR(191) NULL,
    `period` VARCHAR(191) NULL,
    `tagline` VARCHAR(191) NULL,
    `ispopular` BOOLEAN NOT NULL DEFAULT false,
    `bordercolor` VARCHAR(191) NULL,
    `buttontext` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL,
    `isactive` BOOLEAN NOT NULL DEFAULT true,

    INDEX `pricingplan_category_idx`(`category`),
    INDEX `pricingplan_order_idx`(`order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pricingplancategory` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `createdat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedat` DATETIME(3) NOT NULL,

    UNIQUE INDEX `pricingplancategory_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pricingplanfeature` (
    `id` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL,
    `planid` VARCHAR(191) NOT NULL,

    INDEX `pricingplanfeature_planid_idx`(`planid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `odooapp` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL,
    `isactive` BOOLEAN NOT NULL DEFAULT true,

    INDEX `odooapp_order_idx`(`order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contactinfo` (
    `id` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `schedule` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pagecontent` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `pagetype` VARCHAR(191) NOT NULL,
    `badge` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `highlight` VARCHAR(191) NOT NULL,
    `subtitle` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `primarybtnlabel` VARCHAR(191) NOT NULL,
    `primarybtnhref` VARCHAR(191) NOT NULL,
    `secondarybtnlabel` VARCHAR(191) NOT NULL,
    `secondarybtnhref` VARCHAR(191) NOT NULL,
    `annotationline1` VARCHAR(191) NOT NULL,
    `annotationline2` VARCHAR(191) NOT NULL,
    `isactive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `pagecontent_slug_key`(`slug`),
    INDEX `pagecontent_slug_idx`(`slug`),
    INDEX `pagecontent_pagetype_idx`(`pagetype`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pagecapability` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL,
    `isactive` BOOLEAN NOT NULL DEFAULT true,

    INDEX `pagecapability_slug_idx`(`slug`),
    INDEX `pagecapability_order_idx`(`order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailverified` BOOLEAN NOT NULL,
    `image` VARCHAR(191) NULL,
    `createdat` DATETIME(3) NOT NULL,
    `updatedat` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session` (
    `id` VARCHAR(191) NOT NULL,
    `expiresat` DATETIME(3) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `createdat` DATETIME(3) NOT NULL,
    `updatedat` DATETIME(3) NOT NULL,
    `ipaddress` VARCHAR(191) NULL,
    `useragent` VARCHAR(191) NULL,
    `userid` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `session_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account` (
    `id` VARCHAR(191) NOT NULL,
    `accountid` VARCHAR(191) NOT NULL,
    `providerid` VARCHAR(191) NOT NULL,
    `userid` VARCHAR(191) NOT NULL,
    `accesstoken` VARCHAR(191) NULL,
    `refreshtoken` VARCHAR(191) NULL,
    `idtoken` VARCHAR(191) NULL,
    `accesstokenexpiresat` DATETIME(3) NULL,
    `refreshtokenexpiresat` DATETIME(3) NULL,
    `scope` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `createdat` DATETIME(3) NOT NULL,
    `updatedat` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verification` (
    `id` VARCHAR(191) NOT NULL,
    `identifier` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `expiresat` DATETIME(3) NOT NULL,
    `createdat` DATETIME(3) NULL,
    `updatedat` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `newspost` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `excerpt` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `publishedat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `order` INTEGER NOT NULL,
    `isactive` BOOLEAN NOT NULL DEFAULT true,

    INDEX `newspost_order_idx`(`order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `career` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `applyemail` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL,
    `isactive` BOOLEAN NOT NULL DEFAULT true,

    INDEX `career_order_idx`(`order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `galleryimage` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NULL,
    `order` INTEGER NOT NULL,
    `isactive` BOOLEAN NOT NULL DEFAULT true,

    INDEX `galleryimage_order_idx`(`order`),
    INDEX `galleryimage_category_idx`(`category`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gallerycategory` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `createdat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedat` DATETIME(3) NOT NULL,

    UNIQUE INDEX `gallerycategory_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `newslettersubscriber` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `isactive` BOOLEAN NOT NULL DEFAULT true,
    `createdat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `newslettersubscriber_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sociallink` (
    `id` VARCHAR(191) NOT NULL,
    `platform` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL DEFAULT 'Globe',
    `url` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL,
    `isactive` BOOLEAN NOT NULL DEFAULT true,

    INDEX `sociallink_order_idx`(`order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `service` ADD CONSTRAINT `service_category_fkey` FOREIGN KEY (`category`) REFERENCES `servicecategory`(`slug`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_category_fkey` FOREIGN KEY (`category`) REFERENCES `productcategory`(`slug`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teammembersocial` ADD CONSTRAINT `teammembersocial_teammemberid_fkey` FOREIGN KEY (`teammemberid`) REFERENCES `teammember`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pricingplan` ADD CONSTRAINT `pricingplan_category_fkey` FOREIGN KEY (`category`) REFERENCES `pricingplancategory`(`slug`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pricingplanfeature` ADD CONSTRAINT `pricingplanfeature_planid_fkey` FOREIGN KEY (`planid`) REFERENCES `pricingplan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `session_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `account_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `galleryimage` ADD CONSTRAINT `galleryimage_category_fkey` FOREIGN KEY (`category`) REFERENCES `gallerycategory`(`slug`) ON DELETE SET NULL ON UPDATE CASCADE;
