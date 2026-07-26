import { CreateNewsPostSchema, UpdateNewsPostSchema } from "../dtos";
import type { CreateNewsPostInput, UpdateNewsPostInput } from "../dtos";
import { newsPostRepository } from "../repositories";
import { prisma } from "@/lib/prisma";
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

function newsletterEmailTemplate(post: { id: string; title: string; excerpt: string; image: string }) {
  const siteUrl = process.env.NEXTAUTH_URL || "https://kanlyte.com";
  const postUrl = `${siteUrl}/news/${post.id}`;
  const imageUrl = post.image?.startsWith("/") ? `${siteUrl}${post.image}` : post.image;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${post.title} - Kanlyte Uganda</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#374151;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">

    <div style="background:#111827;background-image:linear-gradient(135deg,#111827 0%,#1a2e14 100%);padding:32px 30px;text-align:center;border-top:4px solid #6ebe45;">
      <div style="font-size:22px;font-weight:700;color:#6ebe45;letter-spacing:0.5px;">KANLYTE UGANDA</div>
      <div style="font-size:13px;color:#d1d5db;margin-top:4px;">News & Updates</div>
    </div>

    <div style="padding:40px 30px;">
      <p style="font-size:13px;font-weight:600;color:#6ebe45;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px;">New Post</p>
      <h1 style="font-size:24px;font-weight:700;color:#111827;margin:0 0 16px;line-height:1.3;">${post.title}</h1>

      ${imageUrl ? `<img src="${imageUrl}" alt="${post.title}" style="width:100%;border-radius:8px;margin-bottom:20px;display:block;" />` : ""}

      <p style="font-size:15px;line-height:1.7;color:#6b7280;margin:0 0 28px;">${post.excerpt || "We have a new update for you. Click below to read the full article."}</p>

      <div style="text-align:center;margin:28px 0;">
        <a href="${postUrl}" style="display:inline-block;background-color:#6ebe45;color:#ffffff;padding:13px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px;">Read Full Article</a>
      </div>
    </div>

    <div style="background:#111827;padding:24px 30px;text-align:center;border-top:3px solid #6ebe45;">
      <p style="color:#9ca3af;font-size:13px;margin:0 0 8px;">You are receiving this because you subscribed to Kanlyte Uganda updates.</p>
      <p style="color:#6b7280;font-size:12px;margin:0;">&copy; ${new Date().getFullYear()} Kanlyte Uganda Limited. All rights reserved.</p>
    </div>

  </div>
</body>
</html>`;
}

async function notifySubscribers(post: { id: string; title: string; excerpt: string; image: string }) {
  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: { isActive: true },
      select: { email: true },
    });

    if (!subscribers.length) return;

    const transporter = createTransporter();
    const html = newsletterEmailTemplate(post);

    await Promise.allSettled(
      subscribers.map((sub) =>
        transporter.sendMail({
          from: `"Kanlyte Uganda" <${process.env.EMAIL_FROM}>`,
          to: sub.email,
          subject: `New Post: ${post.title}`,
          html,
        })
      )
    );

    console.log(`Newsletter sent to ${subscribers.length} subscriber(s).`);
  } catch (error) {
    console.error("Newsletter send error:", error);
  }
}

export const newsPostService = {
  async getAll() {
    return await newsPostRepository.findAll();
  },

  async getActive() {
    return await newsPostRepository.findActive();
  },

  async getById(id: string) {
    const post = await newsPostRepository.findById(id);
    if (!post) throw new Error(`News post ${id} not found`);
    return post;
  },

  async create(input: CreateNewsPostInput) {
    const data = CreateNewsPostSchema.parse(input);
    const post = await newsPostRepository.create(data);
    if (post.isActive) {
      notifySubscribers(post).catch(console.error);
    }
    return post;
  },

  async update(id: string, input: UpdateNewsPostInput) {
    await newsPostService.getById(id);
    const data = UpdateNewsPostSchema.parse(input);
    return await newsPostRepository.update(id, data);
  },

  async delete(id: string) {
    await newsPostService.getById(id);
    return await newsPostRepository.delete(id);
  },
};
