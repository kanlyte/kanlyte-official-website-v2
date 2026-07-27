import "dotenv/config";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".jfif"]);

const categories = [
  { name: "Events & Community", slug: "events-community" },
  { name: "Projects & Products", slug: "projects-products" },
  { name: "Brand & Creative", slug: "brand-creative" },
  { name: "Kanlyte Moments", slug: "kanlyte-moments" },
];

function categoryFor(filename: string) {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".webp")) return "projects-products";
  if (lower.endsWith(".png")) return "brand-creative";
  if (/^(img[-_]|20\d{6})/.test(lower)) return "events-community";
  return "kanlyte-moments";
}

function formattedDate(filename: string) {
  const match = filename.match(/(?:IMG[-_])?(20\d{2})(\d{2})(\d{2})/i);
  if (!match) return null;
  const [, year, month, day] = match;
  const date = new Date(`${year}-${month}-${day}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function titleFor(filename: string, category: string, sequence: number) {
  const date = formattedDate(filename);
  if (date) return `Kanlyte Event — ${date}`;
  if (category === "projects-products") return `Digital Project Showcase ${sequence}`;
  if (category === "brand-creative") return `Kanlyte Creative ${sequence}`;
  return `Kanlyte Moment ${sequence}`;
}

export async function seedGalleryImages() {
  console.log("Seeding gallery images from public/uploads...");

  const uploadsDirectory = path.join(process.cwd(), "public", "uploads");
  const entries = await fs.readdir(uploadsDirectory, { withFileTypes: true });
  const filenames = entries
    .filter((entry) => entry.isFile() && SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  for (const category of categories) {
    await prisma.galleryCategory.upsert({
      where: { slug: category.slug },
      create: category,
      update: { name: category.name },
    });
  }

  const seenHashes = new Set<string>();
  const categoryCounts = new Map<string, number>();
  let created = 0;
  let skipped = 0;
  let duplicates = 0;

  for (const filename of filenames) {
    const absolutePath = path.join(uploadsDirectory, filename);
    const file = await fs.readFile(absolutePath);
    const hash = createHash("sha256").update(file).digest("hex");

    if (seenHashes.has(hash)) {
      duplicates++;
      continue;
    }
    seenHashes.add(hash);

    const image = `/uploads/${filename}`;
    const existing = await prisma.galleryImage.findFirst({ where: { image } });
    if (existing) {
      skipped++;
      continue;
    }

    const category = categoryFor(filename);
    const sequence = (categoryCounts.get(category) ?? 0) + 1;
    categoryCounts.set(category, sequence);

    await prisma.galleryImage.create({
      data: {
        title: titleFor(filename, category, sequence),
        image,
        category,
        order: created,
        isActive: true,
      },
    });
    created++;
  }

  console.log(`Gallery images done — ${created} created, ${skipped} existing, ${duplicates} duplicate files ignored.`);
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  seedGalleryImages()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
}
