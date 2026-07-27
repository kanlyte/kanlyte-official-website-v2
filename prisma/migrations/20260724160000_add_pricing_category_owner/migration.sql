-- AlterTable
ALTER TABLE `pricingplancategory`
  ADD COLUMN `ownertype` VARCHAR(191) NOT NULL DEFAULT 'standalone',
  ADD COLUMN `ownerslug` VARCHAR(191) NULL,
  ADD INDEX `pricingplancategory_ownertype_idx`(`ownertype`),
  ADD INDEX `pricingplancategory_ownerslug_idx`(`ownerslug`);
