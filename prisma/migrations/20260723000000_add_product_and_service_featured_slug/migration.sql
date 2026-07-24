-- AlterTable
ALTER TABLE `service` ADD COLUMN `slug` VARCHAR(191) NULL,
    ADD COLUMN `featured` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX `service_slug_idx` ON `service`(`slug`);

-- CreateTable
CREATE TABLE `product` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL,
    `isactive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `product_slug_key`(`slug`),
    INDEX `product_order_idx`(`order`),
    INDEX `product_slug_idx`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
