CREATE TABLE `sectorweserve` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `description` VARCHAR(191) NULL,
  `icon` VARCHAR(191) NOT NULL,
  `order` INTEGER NOT NULL,
  `isactive` BOOLEAN NOT NULL DEFAULT true,

  INDEX `sectorweserve_order_idx`(`order`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
