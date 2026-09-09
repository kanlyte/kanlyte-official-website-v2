UPDATE `service`
SET `kind` = 'main'
WHERE `slug` IN (
  'software-development',
  'web-cloud',
  'ict-training',
  'research-innovation'
);

UPDATE `service` child
JOIN `service` parent ON parent.`slug` = child.`category`
SET child.`parentid` = parent.`id`,
    child.`kind` = 'offering'
WHERE child.`id` <> parent.`id`;

UPDATE `pricingplancategory` category_record
JOIN `service` service_record ON service_record.`slug` = category_record.`ownerslug`
SET category_record.`serviceid` = service_record.`id`
WHERE category_record.`ownertype` = 'service'
  AND category_record.`serviceid` IS NULL;

UPDATE `pricingplancategory` category_record
JOIN `product` product_record ON product_record.`slug` = category_record.`ownerslug`
SET category_record.`productid` = product_record.`id`
WHERE category_record.`ownertype` = 'product'
  AND category_record.`productid` IS NULL;
