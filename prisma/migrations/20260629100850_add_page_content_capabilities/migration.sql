-- CreateTable
CREATE TABLE "PageContent" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "pageType" TEXT NOT NULL,
    "badge" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "highlight" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "primaryBtnLabel" TEXT NOT NULL,
    "primaryBtnHref" TEXT NOT NULL,
    "secondaryBtnLabel" TEXT NOT NULL,
    "secondaryBtnHref" TEXT NOT NULL,
    "annotationLine1" TEXT NOT NULL,
    "annotationLine2" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PageContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageCapability" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PageCapability_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PageContent_slug_key" ON "PageContent"("slug");

-- CreateIndex
CREATE INDEX "PageContent_slug_idx" ON "PageContent"("slug");

-- CreateIndex
CREATE INDEX "PageContent_pageType_idx" ON "PageContent"("pageType");

-- CreateIndex
CREATE INDEX "PageCapability_slug_idx" ON "PageCapability"("slug");

-- CreateIndex
CREATE INDEX "PageCapability_order_idx" ON "PageCapability"("order");
