import "dotenv/config";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";

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

  // ── web-hosting ───────────────────────────────────────────────────────────
  { slug: "web-hosting", name: "Domain Registration", icon: "Globe", order: 0 },
  { slug: "web-hosting", name: "SSD Hosting", icon: "Server", order: 1 },
  { slug: "web-hosting", name: "SSL Certificate", icon: "Shield", order: 2 },
  { slug: "web-hosting", name: "Business Email", icon: "Mail", order: 3 },
  { slug: "web-hosting", name: "Daily Backups", icon: "RefreshCw", order: 4 },
  { slug: "web-hosting", name: "99.9% Uptime", icon: "Zap", order: 5 },
  { slug: "web-hosting", name: "cPanel Access", icon: "Settings", order: 6 },
  { slug: "web-hosting", name: "CDN Support", icon: "Cloud", order: 7 },
  { slug: "web-hosting", name: "SEO Tools", icon: "TrendingUp", order: 8 },
  { slug: "web-hosting", name: "24/7 Support", icon: "Headphones", order: 9 },

  // ── go-digital ────────────────────────────────────────────────────────────
  { slug: "go-digital", name: "Domain Name", icon: "Globe", order: 0 },
  { slug: "go-digital", name: "Business Email", icon: "Mail", order: 1 },
  { slug: "go-digital", name: "Website Design", icon: "Palette", order: 2 },
  { slug: "go-digital", name: "Web Hosting", icon: "Server", order: 3 },
  { slug: "go-digital", name: "SSL Certificate", icon: "Shield", order: 4 },
  { slug: "go-digital", name: "Support & Maintenance", icon: "Headphones", order: 5 },
  { slug: "go-digital", name: "SEO Setup", icon: "TrendingUp", order: 6 },
  { slug: "go-digital", name: "Mobile Responsive", icon: "Smartphone", order: 7 },

  // ── cpanel ────────────────────────────────────────────────────────────────
  { slug: "cpanel", name: "SSD Disk Space", icon: "Database", order: 0 },
  { slug: "cpanel", name: "Mailboxes", icon: "Mail", order: 1 },
  { slug: "cpanel", name: "Multi-Domain", icon: "Globe", order: 2 },
  { slug: "cpanel", name: "SSL Certificate", icon: "Shield", order: 3 },
  { slug: "cpanel", name: "Unmetered Bandwidth", icon: "Zap", order: 4 },
  { slug: "cpanel", name: "MySQL & PostgreSQL", icon: "Server", order: 5 },
  { slug: "cpanel", name: "cPanel Dashboard", icon: "Settings", order: 6 },
  { slug: "cpanel", name: "Daily Backups", icon: "RefreshCw", order: 7 },
  { slug: "cpanel", name: "24/7 Support", icon: "Headphones", order: 8 },
];

const offeringCapabilities: Record<string, Array<[string, string]>> = {
  "custom-software": [
    ["Requirements Discovery", "Search"], ["Solution Architecture", "Layers"], ["Web Applications", "Globe"],
    ["API Development", "Code"], ["Quality Assurance", "CheckCircle"], ["Ongoing Maintenance", "Headphones"],
  ],
  "odoo-erp-customizations": [
    ["Module Customization", "Settings"], ["Workflow Automation", "RefreshCw"], ["Third-party Integrations", "Layers"],
    ["Data Migration", "Database"], ["Custom Reporting", "BarChart2"], ["User Training", "GraduationCap"],
  ],
  "school-management-systems": [
    ["Student Records", "Users"], ["Fees & Billing", "CreditCard"], ["Academic Management", "BookOpen"],
    ["Parent Communication", "MessageSquare"], ["Timetabling", "Calendar"], ["School Analytics", "TrendingUp"],
  ],
  "website-development": [
    ["Responsive Design", "Smartphone"], ["Content Management", "FileText"], ["E-commerce", "ShoppingCart"],
    ["SEO Foundations", "TrendingUp"], ["Performance Optimization", "Zap"], ["Security & SSL", "Shield"],
  ],
  "cloud-infrastructure": [
    ["Cloud Architecture", "Cloud"], ["Server Deployment", "Server"], ["Backup & Recovery", "RefreshCw"],
    ["Monitoring", "Activity"], ["Access Security", "Lock"], ["Scaling & Optimization", "TrendingUp"],
  ],
  "it-consultancy": [
    ["Technology Audit", "Search"], ["IT Strategy", "Lightbulb"], ["Architecture Advisory", "Layers"],
    ["Vendor Selection", "CheckCircle"], ["Risk Management", "Shield"], ["Implementation Roadmap", "Map"],
  ],
  "corporate-training": [
    ["Skills Assessment", "ClipboardCheck"], ["Custom Curriculum", "BookOpen"], ["Instructor-led Training", "Users"],
    ["Hands-on Labs", "Code"], ["Progress Evaluation", "BarChart2"], ["Completion Certificates", "Award"],
  ],
  "ai-machine-learning": [
    ["AI Readiness Assessment", "Search"], ["Predictive Analytics", "TrendingUp"], ["Natural Language AI", "MessageSquare"],
    ["Computer Vision", "Eye"], ["Model Integration", "Cpu"], ["Responsible AI", "Shield"],
  ],
  "iot-solutions": [
    ["Device Integration", "Wifi"], ["Sensor Networks", "Radio"], ["Real-time Monitoring", "Activity"],
    ["IoT Dashboards", "BarChart2"], ["Alerts & Automation", "Bell"], ["Device Security", "Lock"],
  ],
  "digital-transformation": [
    ["Digital Maturity Audit", "Search"], ["Transformation Strategy", "Map"], ["Process Automation", "RefreshCw"],
    ["Systems Integration", "Layers"], ["Change Enablement", "Users"], ["Performance Measurement", "BarChart2"],
  ],
};

export async function seedPageCapabilities() {
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

  for (const [slug, capabilities] of Object.entries(offeringCapabilities)) {
    for (const [order, [name, icon]] of capabilities.entries()) {
      const existing = await prisma.pageCapability.findFirst({ where: { slug, name } });
      if (existing) continue;
      await prisma.pageCapability.create({ data: { slug, name, icon, order, isActive: true } });
      created++;
    }
  }

  console.log(`\nPage capabilities done — ${created} created, ${skipped} skipped.`);
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  seedPageCapabilities()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
