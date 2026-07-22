import "dotenv/config";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";

const milestones = [
  {
    year: "2022",
    title: "Our Founding & Vision",
    description: "Kanlyte Uganda Limited was founded with a clear vision: to unleash the power of software through comprehensive digital transformation. Incorporated in Uganda and registered by the Uganda Registration Bureau of Standards (URSB), we began our journey committed to delivering innovative solutions while empowering communities through technology.",
    image: "/uploads/69b4937c-fb19-4923-9fd5-5bf29966aa06.jpg",
    imageAlt: "Kanlyte office establishment and founding team",
    order: 0,
  },
  {
    year: "2025",
    title: "Digital Infrastructure Growth",
    description: "We established comprehensive cloud services including data backup, project management tools, and automated business services. Our expertise expanded to network installation, security systems, smart devices, time and attendance systems, and business automation - providing integrated solutions for residential and commercial environments.",
    image: "/uploads/278514a4-f2bc-4f55-8f93-20fdf70d46fd.jpeg",
    imageAlt: "Kanlyte digital infrastructure and network setup",
    order: 0,
  },
  {
    year: "2023",
    title: "Service Portfolio Expansion",
    description: "We rapidly expanded our services to include software & systems design, mobile app development, website design, UI/UX design, graphics design, domain registry, professional emails, and web hosting. Our commitment to integrity, honesty, reliability, timeliness, quality, and affordability established us across public, private, NGO, startup, and individual sectors.",
    image: "/uploads/0434bddb-5d91-46d4-b12f-36cf8930b549.jpg",
    imageAlt: "Kanlyte team working on diverse projects and services",
    order: 1,
  },
  {
    year: "2024-2025",
    title: "Technological Advancements",
    description: "Embracing cutting-edge technologies, we introduced cloud computing, Artificial Intelligence, data analytics, virtualization, automations, and Internet of Things solutions. Our ICT training and skilling programs began empowering digital professionals, while our ERP partnerships with Odoo and Moodle expanded our enterprise capabilities.\n",
    image: "/uploads/e5b6da9b-5bf4-47ef-81fd-8a99b897f22d.jpg",
    imageAlt: "Kanlyte technology stack and innovation center",
    order: 2,
  },
  {
    year: "2025+",
    title: "Future Vision & Impact",
    description: "Looking ahead, Kanlyte continues its mission of empowering individuals and communities through software. With applications like Iyte app and GET IT ON in production, we're committed to achieving 90% client retention, engaging in community outreach, and impacting the younger generation.",
    image: "/uploads/8919357f-7020-4eb8-9a7e-399d91932cf2.JPG",
    imageAlt: "Kanlyte team planning future projects and innovations",
    order: 4,
  },
];

export async function seedMilestones() {
  console.log("Seeding milestones...");
  let created = 0;
  let skipped = 0;

  for (const milestone of milestones) {
    const existing = await prisma.milestone.findFirst({ where: { title: milestone.title } });
    if (existing) {
      console.log(`  ⏭  Skipped: ${milestone.title}`);
      skipped++;
    } else {
      await prisma.milestone.create({ data: milestone });
      console.log(`  ✓  Created: ${milestone.title}`);
      created++;
    }
  }

  console.log(`\nMilestones done — ${created} created, ${skipped} skipped.`);
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  seedMilestones()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
