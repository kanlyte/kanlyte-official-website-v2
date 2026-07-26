import { CreateNewsletterSubscriberSchema, UpdateNewsletterSubscriberSchema } from "../dtos";
import type { CreateNewsletterSubscriberInput, UpdateNewsletterSubscriberInput } from "../dtos";
import { newsletterSubscriberRepository } from "../repositories";
import nodemailer from "nodemailer";

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
    secure: process.env.EMAIL_SERVER_PORT === "465",
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
}

function welcomeEmailTemplate(email: string) {
  const siteUrl = process.env.NEXTAUTH_URL || "https://kanlyte.com";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Kanlyte Uganda Updates</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#374151;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">

    <!-- Header -->
    <div style="background:#111827;background-image:linear-gradient(135deg,#111827 0%,#1a2e14 100%);padding:36px 30px;text-align:center;border-top:4px solid #6ebe45;">
      <div style="font-size:22px;font-weight:700;color:#6ebe45;letter-spacing:0.5px;">KANLYTE UGANDA</div>
      <div style="font-size:13px;color:#d1d5db;margin-top:4px;">Perfectly Digital Solutions</div>
    </div>

    <!-- Content -->
    <div style="padding:44px 30px;">
      <div style="text-align:center;margin-bottom:28px;">
        <div style="display:inline-flex;align-items:center;justify-content:center;width:64px;height:64px;border-radius:50%;background-color:#f0fae8;margin-bottom:16px;">
          <span style="font-size:28px;"></span>
        </div>
        <h1 style="font-size:26px;font-weight:700;color:#111827;margin:0 0 10px;">You're subscribed!</h1>
        <p style="font-size:15px;color:#6b7280;margin:0;">Welcome to the Kanlyte Uganda mailing list.</p>
      </div>

      <p style="font-size:15px;line-height:1.7;color:#6b7280;margin:0 0 16px;">
        Hi there,
      </p>
      <p style="font-size:15px;line-height:1.7;color:#6b7280;margin:0 0 16px;">
        Thank you for subscribing to Kanlyte Uganda updates. You'll be the first to know about our latest news, product launches, ICT training programmes, and opportunities.
      </p>

      <div style="background:#f0fae8;border-left:4px solid #6ebe45;border-radius:6px;padding:20px 24px;margin:28px 0;">
        <p style="font-size:14px;font-weight:600;color:#4b7a2e;margin:0 0 10px;">What to expect from us:</p>
        <ul style="margin:0;padding-left:18px;color:#374151;font-size:14px;line-height:1.8;">
          <li>Latest news and company updates</li>
          <li>New product and service announcements</li>
          <li>ICT training programme openings</li>
          <li>Tips, insights, and digital transformation resources</li>
        </ul>
      </div>

      <div style="text-align:center;margin:32px 0;">
        <a href="${siteUrl}" style="display:inline-block;background-color:#6ebe45;color:#ffffff;padding:13px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px;">Visit Our Website</a>
      </div>

      <p style="font-size:14px;line-height:1.7;color:#9ca3af;margin:0;text-align:center;">
        Have questions? Reach us at <a href="mailto:${process.env.EMAIL_FROM}" style="color:#6ebe45;text-decoration:none;">${process.env.EMAIL_FROM}</a>
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#111827;padding:24px 30px;text-align:center;border-top:3px solid #6ebe45;">
      <p style="color:#9ca3af;font-size:13px;margin:0 0 6px;">You subscribed with: ${email}</p>
      <p style="color:#6b7280;font-size:12px;margin:0;">&copy; ${new Date().getFullYear()} Kanlyte Uganda Limited. All rights reserved.</p>
    </div>

  </div>
</body>
</html>`;
}

async function sendWelcomeEmail(email: string) {
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Kanlyte Uganda" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Welcome to Kanlyte Uganda Updates 🎉",
      html: welcomeEmailTemplate(email),
    });
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error("Welcome email send error:", error);
  }
}

export const newsletterSubscriberService = {
  async getAll() {
    return await newsletterSubscriberRepository.findAll();
  },

  async getById(id: string) {
    const subscriber = await newsletterSubscriberRepository.findById(id);
    if (!subscriber) throw new Error(`Subscriber ${id} not found`);
    return subscriber;
  },

  async create(input: CreateNewsletterSubscriberInput) {
    const data = CreateNewsletterSubscriberSchema.parse(input);
    const existing = await newsletterSubscriberRepository.findByEmail(data.email);
    if (existing) throw new Error("This email already exists on our mailing list");
    const subscriber = await newsletterSubscriberRepository.create(data);
    sendWelcomeEmail(subscriber.email).catch(console.error);
    return subscriber;
  },

  async update(id: string, input: UpdateNewsletterSubscriberInput) {
    await newsletterSubscriberService.getById(id);
    const data = UpdateNewsletterSubscriberSchema.parse(input);
    return await newsletterSubscriberRepository.update(id, data);
  },

  async delete(id: string) {
    await newsletterSubscriberService.getById(id);
    return await newsletterSubscriberRepository.delete(id);
  },
};
