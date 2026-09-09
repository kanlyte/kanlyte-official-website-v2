import "dotenv/config";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";

const newsPosts = [
  {
    title: "Kanlyte Uganda Launches Odoo ERP Implementation Services",
    excerpt: "Kanlyte Uganda is now offering full Odoo ERP implementation, customization, and support services for businesses across East Africa.",
    content: "<h2>Transforming Business Operations with Odoo ERP</h2><p>Kanlyte Uganda Limited is proud to announce the official launch of its Odoo ERP implementation services, bringing world-class enterprise resource planning solutions to businesses across Uganda and East Africa.</p><p>Odoo is a comprehensive, open-source ERP platform that covers accounting, inventory, CRM, e-commerce, HR, and much more — all in one unified system.</p><h3>What We Offer</h3><ul><li>Full Odoo ERP implementation and configuration</li><li>Custom module development tailored to your workflows</li><li>Data migration from legacy systems</li><li>Staff training and onboarding</li><li>Ongoing support and maintenance</li></ul><p>Contact us today to schedule a free consultation and discover how Odoo can transform your business operations.</p>",
    image: "/images/odoo.png",
    publishedAt: new Date("2024-03-15"),
    order: 1,
    isActive: true,
  },
  {
    title: "School Sync: Revolutionising School Management in Uganda",
    excerpt: "Our School Sync platform is helping schools across Uganda manage students, fees, academics, and parent communication from one place.",
    content: "<h2>A Smarter Way to Run Your School</h2><p>School Sync, developed by Kanlyte Uganda, is a cloud-based school management system designed specifically for East African schools. It simplifies the day-to-day administration of schools of all sizes.</p><h3>Key Features</h3><ul><li>Student enrollment and records management</li><li>Fee collection and financial reporting</li><li>Academic performance tracking</li><li>Parent and guardian communication portal</li><li>Staff and timetable management</li></ul><p>Schools using School Sync have reported significant reductions in administrative workload and improved communication with parents.</p><p>Visit <a href='https://schoolsync.ac'>schoolsync.ac</a> to learn more or request a demo.</p>",
    image: "/images/image3.jpg",
    publishedAt: new Date("2024-06-01"),
    order: 2,
    isActive: true,
  },
  {
    title: "Kanlyte ICT Training Programme — Enrolment Now Open",
    excerpt: "Applications are open for our hands-on ICT training programmes covering web development, mobile apps, database administration, and more.",
    content: "<h2>Build Your Tech Career with Kanlyte</h2><p>Kanlyte Uganda is excited to announce that enrolment is now open for our upcoming ICT training programmes. Whether you are a beginner looking to break into tech or a professional seeking to upskill, we have a programme for you.</p><h3>Available Programmes</h3><ul><li>Web Development (HTML, CSS, JavaScript, React)</li><li>Mobile App Development (Flutter, React Native)</li><li>Database Administration (MySQL, PostgreSQL)</li><li>Odoo ERP Administration</li><li>Cloud Computing & DevOps</li><li>Cybersecurity Fundamentals</li></ul><h3>Why Train with Kanlyte?</h3><ul><li>Hands-on, project-based learning</li><li>Experienced industry instructors</li><li>Certificate of completion</li><li>Job placement support</li><li>Affordable fees with flexible payment plans</li></ul><p>Contact us at kanlyteug@gmail.com or call (+256) 0200 929 550 to register.</p>",
    image: "/images/coding-instructor.jpg",
    publishedAt: new Date("2024-09-10"),
    order: 3,
    isActive: true,
  },
  {
    title: "Lyte App — Find Verified Hostels & Rentals in Uganda",
    excerpt: "The Lyte App connects students and professionals with verified, affordable hostels and rental houses across Uganda.",
    content: "<h2>Your Home Search, Simplified</h2><p>Finding affordable, verified accommodation in Uganda just got easier. The Lyte App by Kanlyte Uganda connects students and working professionals with trusted landlords offering hostels and rental houses across the country.</p><h3>How It Works</h3><ol><li>Search for available properties in your preferred location</li><li>View verified photos, pricing, and amenities</li><li>Book directly through the app</li><li>Pay securely and move in</li></ol><h3>For Landlords</h3><p>List your property on Lyte and reach thousands of potential tenants. Verification is free and listing takes less than 10 minutes.</p><p>Get early access by contacting us at kanlyteug@gmail.com.</p>",
    image: "/images/lyteapp1.jpeg",
    publishedAt: new Date("2024-11-20"),
    order: 4,
    isActive: true,
  },
];

export async function seedNewsPosts() {
  console.log("Seeding news posts...");
  let created = 0;
  let skipped = 0;

  for (const post of newsPosts) {
    const existing = await prisma.newsPost.findFirst({ where: { title: post.title } });
    if (existing) {
      console.log(`  ⏭  Skipped: ${post.title}`);
      skipped++;
    } else {
      await prisma.newsPost.create({ data: post });
      console.log(`  ✓  Created: ${post.title}`);
      created++;
    }
  }

  console.log(`\nNews posts done — ${created} created, ${skipped} skipped.`);
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  seedNewsPosts()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
