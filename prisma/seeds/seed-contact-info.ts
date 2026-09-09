import "dotenv/config";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";

const contactInfo = {
  phone: "(+256) 200 929 550",
  email: "info@kanlyte.com",
  address: "Robert Mugabe Rd, Kampala",
  schedule: "Mon to Sat - 08:00am to 06:00pm",
  heroImage: "/images/pricing.webp",
  heroTitle: "Get In Touch",
  heroHighlight: "Touch",
  heroTagline: "We'd Love to Hear From You",
  introTitle: "Get in Touch",
  introHighlight: "Touch",
  introDescription: "Have a project in mind? Let's discuss how we can bring your vision to life with our digital solutions.",
  formTitle: "Send us a message",
  formDescription: "Fill out the form below and our team will contact you within 24 hours.",
  callTitle: "Call Us",
  callDescription: "Speak directly with our team",
  emailTitle: "Email Us",
  emailDescription: "Send us an email anytime",
  emailResponseText: "Typically reply within 24h",
  visitTitle: "Visit Us",
  visitDescription: "Our office location",
  companyName: "Kanlyte Uganda Limited",
  hoursTitle: "Business Hours",
  locationTitle: "Our Location",
  locationSubtitle: "Kampala, Uganda",
  directionsUrl: "https://maps.google.com/?q=Kanlyte+Uganda+Limited&ll=0.33126669966548355,32.63057907496472",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.751634720311!2d32.63057907496472!3d0.33126669966548355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177db932f92ab395%3A0x4a5c75e2da8dae77!2sKanlyte%20Uganda%20Limited!5e0!3m2!1sen!2sug!4v1785153567610!5m2!1sen!2sug",
  urgentTitle: "Need Immediate Assistance?",
  urgentDescription: "Contact us now for urgent inquiries",
  statsTitle: "Why Clients Choose Kanlyte",
  statsDescription: "We're committed to delivering exceptional digital solutions with transparency and expertise",
  newsletterText: "Subscribe to our newsletter for tech insights, updates, and exclusive offers",
  submitButtonText: "Send Message",
};

export async function seedContactInfo() {
  console.log("Seeding contact info...");

  const existing = await prisma.contactInfo.findFirst();
  if (existing) {
    await prisma.contactInfo.update({ where: { id: existing.id }, data: contactInfo });
    console.log("  Updated contact info");
  } else {
    await prisma.contactInfo.create({ data: contactInfo });
    console.log("  Created contact info");
  }
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  seedContactInfo()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
