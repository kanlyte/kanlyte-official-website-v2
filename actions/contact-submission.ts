"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

const contactSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  company: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  subscribe: z.boolean().default(false),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
    secure: process.env.EMAIL_SERVER_PORT === "465",
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
};

// Email to client - clean, table-based layout for reliable rendering across email clients
const clientEmailTemplate = (
  formData: ContactFormData,
  submissionId: string,
  referenceNumber: string,
  formattedDate: string,
  formattedTime: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inquiry Confirmation - Kanlyte</title>
  <style>
    body {
      background-color: #f4f5f7;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      line-height: 1.6;
      color: #374151;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }

    .header {
      background-color: #111827;
      background-image: linear-gradient(135deg, #111827 0%, #1a2e14 100%);
      color: #ffffff;
      padding: 36px 30px;
      text-align: center;
      border-top: 4px solid #6ebe45;
    }

    .header-logo {
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 0.5px;
      color: #6ebe45;
    }

    .header-subtitle {
      font-size: 13px;
      color: #d1d5db;
      margin-top: 4px;
    }

    .content {
      padding: 40px 30px;
    }

    .greeting {
      font-size: 22px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 16px;
    }

    .paragraph {
      font-size: 15px;
      line-height: 1.7;
      color: #6b7280;
      margin: 0 0 18px;
    }

    .details-table {
      width: 100%;
      border-collapse: collapse;
      background-color: #f0fae8;
      border-radius: 8px;
      border-left: 4px solid #6ebe45;
      margin: 24px 0;
    }

    .details-table td {
      padding: 10px 20px;
      font-size: 14px;
      border-bottom: 1px solid #d4edbc;
    }

    .details-table tr:last-child td {
      border-bottom: none;
    }

    .details-table .label {
      color: #4b7a2e;
      width: 40%;
    }

    .details-table .value {
      color: #111827;
      font-weight: 500;
    }

    .reference-id {
      color: #4f9c2e;
      font-weight: 700;
    }

    .message-box {
      margin: 24px 0;
      padding: 20px;
      background-color: #f8fafc;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }

    .message-label {
      font-weight: 600;
      color: #4b5563;
      margin-bottom: 8px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .message-content {
      color: #374151;
      white-space: pre-line;
      font-size: 14px;
    }

    .button-container {
      text-align: center;
      margin: 28px 0 8px;
    }

    .button {
      display: inline-block;
      background-color: #6ebe45;
      color: #ffffff;
      padding: 13px 30px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
    }

    .divider {
      border: none;
      height: 1px;
      background-color: #e5e7eb;
      margin: 32px 0;
    }

    .contact-info {
      text-align: center;
    }

    .contact-info p {
      margin: 6px 0;
      color: #6b7280;
      font-size: 13px;
    }

    .footer {
      background-color: #111827;
      padding: 24px 30px;
      text-align: center;
      border-top: 3px solid #6ebe45;
    }

    .footer-text {
      color: #9ca3af;
      font-size: 13px;
      line-height: 1.6;
      margin: 0 0 10px;
    }

    .footer-small {
      color: #6b7280;
      font-size: 12px;
      margin-top: 14px;
    }

    @media (max-width: 640px) {
      .content,
      .header,
      .footer {
        padding-left: 20px;
        padding-right: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="header-logo">KANLYTE UGANDA</div>
      <div class="header-subtitle">Perfectly Digital Solutions</div>
    </div>

    <div class="content">
      <h1 class="greeting">Hi ${formData.fullName},</h1>

      <p class="paragraph">
        Thank you for reaching out to Kanlyte. We've received your inquiry and our team is already reviewing it.
      </p>

      <table class="details-table" role="presentation" cellpadding="0" cellspacing="0">
        <tr>
          <td class="label">Reference Number</td>
          <td class="value reference-id">#${referenceNumber}</td>
        </tr>
        <tr>
          <td class="label">Submission Date</td>
          <td class="value">${formattedDate}</td>
        </tr>
        <tr>
          <td class="label">Service Type</td>
          <td class="value">${formData.service}</td>
        </tr>
        ${
          formData.company
            ? `
        <tr>
          <td class="label">Company</td>
          <td class="value">${formData.company}</td>
        </tr>
        `
            : ""
        }
      </table>

      <p class="paragraph">
        Our team will review your inquiry and get in touch within 24 hours to discuss your requirements and propose a tailored solution.
      </p>

      <div class="message-box">
        <div class="message-label">Your Message</div>
        <div class="message-content">${formData.message}</div>
      </div>

      <p class="paragraph">
        Need to reach us sooner? We're available directly:
      </p>

      <div class="button-container">
        <a href="tel:+256762534356" class="button">Call +256 762 534 356</a>
      </div>

      <hr class="divider" />

      <div class="contact-info">
        <p><strong>Next steps:</strong> Initial review &rarr; Direct contact &rarr; Tailored proposal &rarr; Project kickoff</p>
        <p><strong>Email:</strong> info@kanlyte.com</p>
        <p><strong>Hours:</strong> Mon&ndash;Fri, 8:00 AM &ndash; 6:00 PM EAT</p>
      </div>
    </div>

    <div class="footer">
      <p class="footer-text">
        Unleashing the power of software through digital transformation.
      </p>
      <p class="footer-text">
        View your inquiry details
        <a href="${
          process.env.NEXTAUTH_URL || "https://kanlyte.com"
        }/inquiries/${submissionId}"
           style="color: #6ebe45; text-decoration: none; font-weight: 500;">
          here
        </a>.
      </p>
      <p class="footer-small">
        &copy; ${new Date().getFullYear()} Kanlyte Uganda Limited. All rights reserved.<br>
        P.O. Box 160188 Kampala, Uganda &middot; www.kanlyte.com
      </p>
    </div>
  </div>
</body>
</html>
`;

// Email to admin - clean, table-based layout for reliable rendering across email clients
const adminEmailTemplate = (
  formData: ContactFormData,
  submissionId: string,
  referenceNumber: string,
  formattedDate: string,
  formattedTime: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry Alert - Kanlyte</title>
  <style>
    body {
      background-color: #f4f5f7;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      line-height: 1.6;
      color: #374151;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }

    .header {
      background-color: #111827;
      background-image: linear-gradient(135deg, #111827 0%, #1a2e14 100%);
      color: #ffffff;
      padding: 28px 30px;
      text-align: center;
      border-top: 4px solid #6ebe45;
    }

    .header-title {
      font-size: 20px;
      font-weight: 700;
      color: #6ebe45;
    }

    .header-subtitle {
      font-size: 13px;
      color: #9ca3af;
      margin-top: 4px;
    }

    .badge {
      display: inline-block;
      background-color: #6ebe45;
      color: #ffffff;
      padding: 6px 14px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      margin-top: 16px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .content {
      padding: 36px 30px;
    }

    .greeting {
      font-size: 19px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 14px;
    }

    .paragraph {
      font-size: 15px;
      line-height: 1.7;
      color: #6b7280;
      margin: 0 0 18px;
    }

    .details-table {
      width: 100%;
      border-collapse: collapse;
      background-color: #f0fae8;
      border-radius: 8px;
      border-left: 4px solid #6ebe45;
      margin: 24px 0;
    }

    .details-table td {
      padding: 10px 20px;
      font-size: 14px;
      border-bottom: 1px solid #d4edbc;
    }

    .details-table tr:last-child td {
      border-bottom: none;
    }

    .details-table .label {
      color: #4b7a2e;
      width: 38%;
    }

    .details-table .value {
      color: #111827;
      font-weight: 500;
    }

    .details-table .value a {
      color: #6ebe45;
      text-decoration: none;
    }

    .reference-id {
      color: #4f9c2e;
      font-weight: 700;
    }

    .message-box {
      margin: 24px 0;
      padding: 20px;
      background-color: #f8fafc;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }

    .message-label {
      font-weight: 600;
      color: #4b5563;
      margin-bottom: 8px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .message-content {
      color: #374151;
      white-space: pre-line;
      font-size: 14px;
    }

    .actions {
      margin: 32px 0 8px;
    }

    .actions-title {
      font-weight: 600;
      color: #4b5563;
      margin-bottom: 16px;
      font-size: 14px;
      text-align: center;
    }

    .action-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 8px 0;
    }

    .action-button {
      display: block;
      background-color: #6ebe45;
      color: #ffffff;
      padding: 12px 16px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      font-size: 13px;
      text-align: center;
    }

    .action-button.secondary {
      background-color: #374151;
    }

    .divider {
      border: none;
      height: 1px;
      background-color: #e5e7eb;
      margin: 32px 0;
    }

    .footer {
      background-color: #111827;
      color: #d1d5db;
      padding: 26px 30px;
      text-align: center;
      border-top: 3px solid #6ebe45;
    }

    .footer-text {
      color: #9ca3af;
      font-size: 13px;
      line-height: 1.6;
      margin: 0 0 8px;
    }

    .footer-small {
      color: #6b7280;
      font-size: 12px;
      margin-top: 14px;
    }

    @media (max-width: 640px) {
      .content,
      .header,
      .footer {
        padding-left: 20px;
        padding-right: 20px;
      }

      .action-table,
      .action-table tbody,
      .action-table tr,
      .action-table td {
        display: block;
        width: 100%;
      }

      .action-table td {
        padding-bottom: 8px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="header-title">New Contact Inquiry</div>
      <div class="header-subtitle">Kanlyte Uganda &middot; Contact System</div>
      <div class="badge">Action Required</div>
    </div>

    <div class="content">
      <h1 class="greeting">New inquiry received</h1>

      <p class="paragraph">
        A new inquiry has been submitted through the contact form. Please review the details below and respond within 24 hours.
      </p>

      <table class="details-table" role="presentation" cellpadding="0" cellspacing="0">
        <tr>
          <td class="label">Reference ID</td>
          <td class="value reference-id">#${referenceNumber}</td>
        </tr>
        <tr>
          <td class="label">Submitted</td>
          <td class="value">${formattedDate} at ${formattedTime}</td>
        </tr>
        <tr>
          <td class="label">Contact Name</td>
          <td class="value">${formData.fullName}</td>
        </tr>
        <tr>
          <td class="label">Email</td>
          <td class="value"><a href="mailto:${formData.email}">${
            formData.email
          }</a></td>
        </tr>
        <tr>
          <td class="label">Phone</td>
          <td class="value"><a href="tel:${formData.phone}">${
            formData.phone
          }</a></td>
        </tr>
        <tr>
          <td class="label">Service</td>
          <td class="value">${formData.service}</td>
        </tr>
        ${
          formData.company
            ? `
        <tr>
          <td class="label">Company</td>
          <td class="value">${formData.company}</td>
        </tr>
        `
            : ""
        }
        <tr>
          <td class="label">Newsletter</td>
          <td class="value">${
            formData.subscribe ? "Subscribed" : "Not subscribed"
          }</td>
        </tr>
      </table>

      <div class="message-box">
        <div class="message-label">Client's Message</div>
        <div class="message-content">${formData.message}</div>
      </div>

      <div class="actions">
        <div class="actions-title">Quick Actions</div>
        <table class="action-table" role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            <td width="33%"><a href="mailto:${
              formData.email
            }" class="action-button">Reply by Email</a></td>
            <td width="33%"><a href="tel:${
              formData.phone
            }" class="action-button secondary">Call Client</a></td>
            ${
              process.env.NEXTAUTH_URL
                ? `<td width="33%"><a href="${process.env.NEXTAUTH_URL}/admin/contacts/${submissionId}" class="action-button secondary">View in Dashboard</a></td>`
                : ""
            }
          </tr>
        </table>
      </div>

      <hr class="divider" />

      <p class="paragraph" style="margin-bottom: 0;">
        This is an automated notification from the Kanlyte contact system.
      </p>
    </div>

    <div class="footer">
      <p class="footer-text">System ID: ${submissionId}</p>
      <p class="footer-small">
        &copy; ${new Date().getFullYear()} Kanlyte Uganda Limited<br>
        Please respond within 24 hours
      </p>
    </div>
  </div>
</body>
</html>
`;

// Send email notifications
async function sendEmailNotifications(
  formData: ContactFormData,
  submissionId: string
) {
  const transporter = createTransporter();

  // Format the date
  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Generate reference number
  const referenceNumber = `KNLT${Date.now().toString().slice(-8)}`;

  // Email to client
  const clientMailOptions = {
    from: `"Kanlyte Uganda" <${process.env.EMAIL_FROM}>`,
    to: formData.email,
    subject: `Your Inquiry Has Been Received - ${formData.subject}`,
    html: clientEmailTemplate(
      formData,
      submissionId,
      referenceNumber,
      formattedDate,
      formattedTime
    ),
  };

  // Email to admin
  const adminMailOptions = {
    from: `"Kanlyte Contact System" <${process.env.EMAIL_FROM}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Inquiry: ${formData.subject} - ${referenceNumber}`,
    html: adminEmailTemplate(
      formData,
      submissionId,
      referenceNumber,
      formattedDate,
      formattedTime
    ),
  };

  try {
    // Send to client
    await transporter.sendMail(clientMailOptions);

    // Send to admin
    await transporter.sendMail(adminMailOptions);

    console.log("Emails sent successfully");
  } catch (error) {
    console.error("Error sending emails:", error);
    // Don't throw error - we still want to save the submission
  }
}

// Main form submission action
export async function submitContactForm(formData: ContactFormData) {
  try {
    // Validate form data
    const validatedData = contactSchema.parse(formData);

    // Get client IP and user agent
    const headersList = await headers();
    const ipAddress = headersList.get("x-forwarded-for") || "unknown";
    const userAgent = headersList.get("user-agent") || "unknown";

    // Save to database
    const submission = await prisma.contactSubmission.create({
      data: {
        fullName: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        subject: validatedData.subject,
        service: validatedData.service,
        message: validatedData.message,
        subscribe: validatedData.subscribe,
        ipAddress,
        userAgent,
      },
    });

    // Send email notifications (async - don't wait for it)
    sendEmailNotifications(validatedData, submission.id).catch(console.error);

    // Revalidate if needed
    revalidatePath("/admin/contacts");

    return {
      success: true,
      message: "Thank you for your message! We'll contact you soon.",
      submissionId: submission.id,
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation error",
        errors: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      };
    }

    return {
      success: false,
      message:
        "An error occurred while submitting your form. Please try again.",
    };
  }
}

// Admin function to get all submissions
export async function getContactSubmissions() {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        subject: true,
        service: true,
        status: true,
        createdAt: true,
      },
    });

    return { success: true, data: submissions };
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return { success: false, message: "Failed to fetch submissions" };
  }
}

// Admin function to update submission status
export async function updateSubmissionStatus(id: string, status: string) {
  try {
    const submission = await prisma.contactSubmission.update({
      where: { id },
      data: {
        status,
        contactedAt: status === "contacted" ? new Date() : undefined,
      },
    });

    return { success: true, data: submission };
  } catch (error) {
    console.error("Error updating submission:", error);
    return { success: false, message: "Failed to update submission" };
  }
}
