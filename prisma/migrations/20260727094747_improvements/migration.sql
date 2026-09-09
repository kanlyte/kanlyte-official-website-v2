/*
  Warnings:

  - A unique constraint covering the columns `[serviceid]` on the table `pricingplancategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productid]` on the table `pricingplancategory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `pricingplancategory` ADD COLUMN `productid` VARCHAR(191) NULL,
    ADD COLUMN `serviceid` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `service` ADD COLUMN `kind` VARCHAR(191) NOT NULL DEFAULT 'offering',
    ADD COLUMN `parentid` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `pricingplancategory_serviceid_key` ON `pricingplancategory`(`serviceid`);

-- CreateIndex
CREATE UNIQUE INDEX `pricingplancategory_productid_key` ON `pricingplancategory`(`productid`);

-- CreateIndex
CREATE INDEX `service_kind_idx` ON `service`(`kind`);

-- CreateIndex
CREATE INDEX `service_parentid_idx` ON `service`(`parentid`);

-- AddForeignKey
ALTER TABLE `service` ADD CONSTRAINT `service_parentid_fkey` FOREIGN KEY (`parentid`) REFERENCES `service`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pricingplancategory` ADD CONSTRAINT `pricingplancategory_serviceid_fkey` FOREIGN KEY (`serviceid`) REFERENCES `service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pricingplancategory` ADD CONSTRAINT `pricingplancategory_productid_fkey` FOREIGN KEY (`productid`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
