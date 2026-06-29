import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const pageCapabilities = [
  // ── odoo ──────────────────────────────────────────────────────────────────
  { slug: "odoo", name: "Accounting", icon: "BookOpen", order: 0 },
  { slug: "odoo", name: "CRM", icon: "Users", order: 1 },
  { slug: "odoo", name: "Inventory", icon: "Package", order: 2 },
  { slug: "odoo", name: "Sales", icon: "TrendingUp", order: 3 },
  { slug: "odoo", name: "Purchase", icon: "ShoppingCart", order: 4 },
  { slug: "odoo", name: "Manufacturing", icon: "Settings", order: 5 },
  { slug: "odoo", name: "HR & Payroll", icon: "Briefcase", order: 6 },
  { slug: "odoo", name: "Project Mgmt", icon: "FolderKanban", order: 7 },
  { slug: "odoo", name: "E-Commerce", icon: "Globe", order: 8 },
  { slug: "odoo", name: "Point of Sale", icon: "CreditCard", order: 9 },
  { slug: "odoo", name: "Email Marketing", icon: "Mail", order: 10 },
  { slug: "odoo", name: "Reporting", icon: "BarChart2", order: 11 },

  // ── school-sync ───────────────────────────────────────────────────────────
  { slug: "school-sync", name: "Student Enrollment", icon: "Users", order: 0 },
  { slug: "school-sync", name: "Fee Management", icon: "CreditCard", order: 1 },
  { slug: "school-sync", name: "Bulk SMS", icon: "MessageSquare", order: 2 },
  { slug: "school-sync", name: "Fee Reminders", icon: "Bell", order: 3 },
  { slug: "school-sync", name: "Marks Entry", icon: "BarChart2", order: 4 },
  { slug: "school-sync", name: "Report Cards", icon: "FileText", order: 5 },
  { slug: "school-sync", name: "User Access", icon: "Shield", order: 6 },
  { slug: "school-sync", name: "Administration", icon: "Settings", order: 7 },
  { slug: "school-sync", name: "Timetabling", icon: "Calendar", order: 8 },
  { slug: "school-sync", name: "Parent Portal", icon: "Home", order: 9 },
  { slug: "school-sync", name: "Multi-Campus", icon: "Globe", order: 10 },
  { slug: "school-sync", name: "Analytics", icon: "TrendingUp", order: 11 },

  // ── lyte ──────────────────────────────────────────────────────────────────
  { slug: "lyte", name: "Smart Search", icon: "Search", order: 0 },
  { slug: "lyte", name: "Verified Listings", icon: "Shield", order: 1 },
  { slug: "lyte", name: "Map View", icon: "MapPin", order: 2 },
  { slug: "lyte", name: "Instant Booking", icon: "Home", order: 3 },
  { slug: "lyte", name: "Secure Payments", icon: "CreditCard", order: 4 },
  { slug: "lyte", name: "Reviews & Ratings", icon: "Star", order: 5 },
  { slug: "lyte", name: "Photo Galleries", icon: "Camera", order: 6 },
  { slug: "lyte", name: "Direct Messaging", icon: "MessageCircle", order: 7 },
  { slug: "lyte", name: "Advanced Filters", icon: "Filter", order: 8 },
  { slug: "lyte", name: "Saved Favourites", icon: "Heart", order: 9 },
  { slug: "lyte", name: "Push Notifications", icon: "Bell", order: 10 },
  { slug: "lyte", name: "Mobile First", icon: "Smartphone", order: 11 },

  // ── web-cloud ─────────────────────────────────────────────────────────────
  { slug: "web-cloud", name: "Website Design", icon: "Globe", order: 0 },
  { slug: "web-cloud", name: "Web Development", icon: "TrendingUp", order: 1 },
  { slug: "web-cloud", name: "Web Hosting", icon: "Server", order: 2 },
  { slug: "web-cloud", name: "Cloud Servers", icon: "Cloud", order: 3 },
  { slug: "web-cloud", name: "Email Hosting", icon: "Mail", order: 4 },
  { slug: "web-cloud", name: "SSL & Security", icon: "Shield", order: 5 },
  { slug: "web-cloud", name: "Domain Registry", icon: "Database", order: 6 },
  { slug: "web-cloud", name: "Backups", icon: "RefreshCw", order: 7 },
  { slug: "web-cloud", name: "Performance", icon: "Zap", order: 8 },
  { slug: "web-cloud", name: "Analytics", icon: "BarChart2", order: 9 },
  { slug: "web-cloud", name: "Firewalls", icon: "Lock", order: 10 },
  { slug: "web-cloud", name: "24/7 Monitoring", icon: "Headphones", order: 11 },

  // ── ict-training ──────────────────────────────────────────────────────────
  { slug: "ict-training", name: "Web Development", icon: "Code", order: 0 },
  { slug: "ict-training", name: "Mobile Dev", icon: "Smartphone", order: 1 },
  { slug: "ict-training", name: "Database Admin", icon: "Database", order: 2 },
  { slug: "ict-training", name: "Cloud Computing", icon: "Cloud", order: 3 },
  { slug: "ict-training", name: "Cybersecurity", icon: "Shield", order: 4 },
  { slug: "ict-training", name: "Odoo ERP", icon: "Award", order: 5 },
  { slug: "ict-training", name: "IT Consulting", icon: "Briefcase", order: 6 },
  { slug: "ict-training", name: "Corporate Training", icon: "Users", order: 7 },
  { slug: "ict-training", name: "Digital Skills", icon: "GraduationCap", order: 8 },
  { slug: "ict-training", name: "Curriculum Dev", icon: "BookOpen", order: 9 },
  { slug: "ict-training", name: "Certification Prep", icon: "TrendingUp", order: 10 },
  { slug: "ict-training", name: "Mentorship", icon: "Headphones", order: 11 },

  // ── software-development ──────────────────────────────────────────────────
  { slug: "software-development", name: "Custom Software", icon: "Code", order: 0 },
  { slug: "software-development", name: "Mobile Apps", icon: "Smartphone", order: 1 },
  { slug: "software-development", name: "ERP Systems", icon: "Database", order: 2 },
  { slug: "software-development", name: "API Development", icon: "Layers", order: 3 },
  { slug: "software-development", name: "System Integration", icon: "Settings", order: 4 },
  { slug: "software-development", name: "Web Apps", icon: "Globe", order: 5 },
  { slug: "software-development", name: "AI Integration", icon: "Cpu", order: 6 },
  { slug: "software-development", name: "Legacy Migration", icon: "RefreshCw", order: 7 },
  { slug: "software-development", name: "QA & Testing", icon: "CheckCircle", order: 8 },
  { slug: "software-development", name: "DevOps", icon: "Zap", order: 9 },
  { slug: "software-development", name: "Security Audits", icon: "Shield", order: 10 },
  { slug: "software-development", name: "Maintenance", icon: "Headphones", order: 11 },

  // ── research-innovation ───────────────────────────────────────────────────
  { slug: "research-innovation", name: "Applied Research", icon: "FlaskConical", order: 0 },
  { slug: "research-innovation", name: "Innovation Strategy", icon: "Lightbulb", order: 1 },
  { slug: "research-innovation", name: "AI & ML", icon: "Cpu", order: 2 },
  { slug: "research-innovation", name: "Data Analytics", icon: "BarChart2", order: 3 },
  { slug: "research-innovation", name: "Digital Transformation", icon: "TrendingUp", order: 4 },
  { slug: "research-innovation", name: "IoT Solutions", icon: "Globe", order: 5 },
  { slug: "research-innovation", name: "Tech Transfer", icon: "Users", order: 6 },
  { slug: "research-innovation", name: "Process Automation", icon: "RefreshCw", order: 7 },
  { slug: "research-innovation", name: "Cloud Intelligence", icon: "Layers", order: 8 },
  { slug: "research-innovation", name: "Rapid Prototyping", icon: "Zap", order: 9 },

  // ── email-hosting ─────────────────────────────────────────────────────────
  { slug: "email-hosting", name: "Custom Domain Email", icon: "Mail", order: 0 },
  { slug: "email-hosting", name: "Spam Protection", icon: "Shield", order: 1 },
  { slug: "email-hosting", name: "Enterprise Servers", icon: "Server", order: 2 },
  { slug: "email-hosting", name: "Fast Delivery", icon: "Zap", order: 3 },
  { slug: "email-hosting", name: "Webmail Access", icon: "Globe", order: 4 },
  { slug: "email-hosting", name: "Team Mailboxes", icon: "Users", order: 5 },
  { slug: "email-hosting", name: "Data Encryption", icon: "Lock", order: 6 },
  { slug: "email-hosting", name: "24/7 Support", icon: "Headphones", order: 7 },
  { slug: "email-hosting", name: "Daily Backups", icon: "RefreshCw", order: 8 },
  { slug: "email-hosting", name: "IMAP/POP3", icon: "Database", order: 9 },

  // ── app-development ───────────────────────────────────────────────────────
  { slug: "app-development", name: "iOS Development", icon: "Smartphone", order: 0 },
  { slug: "app-development", name: "Android Dev", icon: "Code", order: 1 },
  { slug: "app-development", name: "React Native", icon: "RefreshCw", order: 2 },
  { slug: "app-development", name: "Flutter", icon: "Zap", order: 3 },
  { slug: "app-development", name: "UI/UX Design", icon: "Palette", order: 4 },
  { slug: "app-development", name: "Backend & API", icon: "Database", order: 5 },
  { slug: "app-development", name: "App Security", icon: "Shield", order: 6 },
  { slug: "app-development", name: "Push Notifications", icon: "Globe", order: 7 },
  { slug: "app-development", name: "Team Augmentation", icon: "Users", order: 8 },
  { slug: "app-development", name: "QA & Testing", icon: "CheckCircle", order: 9 },
  { slug: "app-development", name: "API Integration", icon: "Wrench", order: 10 },
  { slug: "app-development", name: "Maintenance", icon: "Headphones", order: 11 },
];

async function main() {
  console.log("Seeding page capabilities...");
  let created = 0;
  let skipped = 0;

  for (const item of pageCapabilities) {
    const existing = await prisma.pageCapability.findFirst({
      where: { slug: item.slug, name: item.name },
    });
    if (existing) {
      console.log(`  ⏭  Skipped: ${item.slug} / ${item.name}`);
      skipped++;
    } else {
      await prisma.pageCapability.create({ data: { ...item, isActive: true } });
      console.log(`  ✓  Created: ${item.slug} / ${item.name}`);
      created++;
    }
  }

  console.log(`\nPage capabilities done — ${created} created, ${skipped} skipped.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
