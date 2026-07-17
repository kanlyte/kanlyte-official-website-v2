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

// Email to client - Text-focused with header/footer cards
const clientEmailTemplate = (
  formData: ContactFormData,
  submissionId: string,
  referenceNumber: string,
  formattedDate: string,
  formattedTime: string
) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inquiry Confirmation - Kanlyte</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    body {
      background-color: #f9fafb;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
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
    
    /* Header Card */
    .header-card {
      background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
      color: white;
      padding: 40px 30px;
      text-align: center;
      border-radius: 0 0 12px 12px;
    }
    
    .header-logo {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 8px;
      letter-spacing: 0.5px;
    }
    
    .header-subtitle {
      font-size: 14px;
      opacity: 0.9;
      font-weight: 400;
      margin-top: -4px;
    }
    
    /* Main Content */
    .content {
      padding: 40px 30px;
    }
    
    .greeting {
      font-size: 24px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 20px;
    }
    
    .paragraph {
      font-size: 16px;
      line-height: 1.7;
      color: #6b7280;
      margin-bottom: 20px;
    }
    
    .highlight {
      color: #111827;
      font-weight: 500;
    }
    
    .details-box {
      background-color: #f8fafc;
      padding: 25px;
      border-radius: 8px;
      border-left: 4px solid #6EBE45;
      margin: 30px 0;
    }
    
    .detail-row {
      margin-bottom: 12px;
      display: flex;
    }
    
    .detail-label {
      width: 150px;
      font-weight: 600;
      color: #4b5563;
      font-size: 14px;
    }
    
    .detail-value {
      flex: 1;
      color: #111827;
      font-weight: 500;
    }
    
    .reference-id {
      color: #6EBE45;
      font-weight: 700;
    }
    
    .message-section {
      margin: 30px 0;
      padding: 25px;
      background-color: #f8fafc;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }
    
    .message-label {
      font-weight: 600;
      color: #4b5563;
      margin-bottom: 10px;
      font-size: 14px;
    }
    
    .message-content {
      color: #374151;
      line-height: 1.7;
      white-space: pre-line;
      background-color: white;
      padding: 15px;
      border-radius: 6px;
      border-left: 3px solid #6EBE45;
    }
    
    .button-container {
      text-align: center;
      margin: 30px 0;
    }
    
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #6EBE45 0%, #5EA83A 100%);
      color: white;
      padding: 14px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 15px;
      transition: all 0.3s ease;
    }
    
    .button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(110, 190, 69, 0.3);
    }
    
    .divider {
      border: none;
      height: 1px;
      background-color: #e5e7eb;
      margin: 40px 0;
    }
    
    .contact-info {
      text-align: center;
      margin-top: 30px;
    }
    
    .contact-info p {
      margin: 8px 0;
      color: #6b7280;
      font-size: 14px;
    }
    
    /* Footer Card */
    .footer-card {
      background-color: #f8fafc;
      padding: 30px;
      text-align: center;
      border-radius: 12px 12px 0 0;
      border-top: 1px solid #e5e7eb;
    }
    
    .footer-logo {
      font-size: 20px;
      font-weight: 700;
      color: #111827;
      margin-bottom: 10px;
    }
    
    .footer-text {
      color: #6b7280;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 15px;
    }
    
    .footer-small {
      color: #9ca3af;
      font-size: 12px;
      margin-top: 20px;
    }
    
    @media (max-width: 640px) {
      .content {
        padding: 30px 20px;
      }
      
      .header-card {
        padding: 30px 20px;
      }
      
      .detail-row {
        flex-direction: column;
        margin-bottom: 15px;
      }
      
      .detail-label {
        width: 100%;
        margin-bottom: 4px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header Card -->
    <div class="header-card">
      <div class="header-logo">Kanlyte Uganda</div>
      <div class="header-subtitle">Perfectly Digital Solutions</div>
    </div>
    
    <!-- Main Content -->
    <div class="content">
      <h1 class="greeting">Hi ${formData.fullName},</h1>
      
      <p class="paragraph">
        Congratulations, your inquiry has been received!
      </p>
      
      <p class="paragraph">
        We're happy to inform you that your message has been processed and your inquiry is confirmed. 
        You've made a smart decision by choosing our products and services.
      </p>
      
      <!-- Details Box -->
      <div class="details-box">
        <div class="detail-row">
          <div class="detail-label">Reference Number</div>
          <div class="detail-value reference-id">#${referenceNumber}</div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">Submission Date</div>
          <div class="detail-value">${formattedDate}</div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">Service Type</div>
          <div class="detail-value">${formData.service}</div>
        </div>
        
        ${
          formData.company
            ? `
        <div class="detail-row">
          <div class="detail-label">Company</div>
          <div class="detail-value">${formData.company}</div>
        </div>
        `
            : ""
        }
      </div>
      
      <p class="paragraph">
        Our team will review your inquiry and contact you within 24 hours. 
        We'll discuss your requirements in detail and provide you with a tailored solution.
      </p>
      
      <!-- Message Section -->
      <div class="message-section">
        <div class="message-label">Your Message:</div>
        <div class="message-content">${formData.message}</div>
      </div>
      
      <p class="paragraph">
        If you need immediate assistance, feel free to contact us directly:
      </p>
      
      <div class="button-container">
        <a href="tel:+256762534356" class="button">📞 Call Us: +256 762 534 356</a>
      </div>
      
      <hr class="divider" />
      
      <div class="contact-info">
        <p><strong>Next Steps:</strong> Initial review → Direct contact → Tailored proposal → Project kickoff</p>
        <p><strong>Email:</strong> info@kanlyte.com</p>
        <p><strong>Hours:</strong> Mon-Fri, 8:00 AM - 6:00 PM EAT</p>
      </div>
    </div>
    
    <!-- Footer Card -->
    <div class="footer-card">
      <div class="footer-logo">Kanlyte</div>
      <p class="footer-text">
        Unleashing the power of software through digital transformation
      </p>
      <p class="footer-text">
        You can view your inquiry details by clicking 
        <a href="${
          process.env.NEXTAUTH_URL || "https://kanlyte.com"
        }/inquiries/${submissionId}" 
           style="color: #6EBE45; text-decoration: none; font-weight: 500;">
          here
        </a>.
      </p>
      <p class="footer-small">
        © ${new Date().getFullYear()} Kanlyte Uganda Limited. All rights reserved.<br>
        P.O.Box 160188 Kampala, Uganda | www.kanlyte.com
      </p>
    </div>
  </div>
</body>
</html>
`;

// Email to admin - Text-focused with header/footer cards
const adminEmailTemplate = (
  formData: ContactFormData,
  submissionId: string,
  referenceNumber: string,
  formattedDate: string,
  formattedTime: string
) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry Alert - Kanlyte</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    body {
      background-color: #f9fafb;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
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
    
    /* Header Card */
    .header-card {
      background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 0 0 12px 12px;
    }
    
    .header-title {
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    
    .header-subtitle {
      font-size: 14px;
      opacity: 0.8;
      font-weight: 400;
    }
    
    .alert-badge {
      display: inline-block;
      background: linear-gradient(135deg, #6EBE45 0%, #5EA83A 100%);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      margin-top: 15px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    /* Main Content */
    .content {
      padding: 40px 30px;
    }
    
    .greeting {
      font-size: 20px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 20px;
    }
    
    .paragraph {
      font-size: 16px;
      line-height: 1.7;
      color: #6b7280;
      margin-bottom: 20px;
    }
    
    .highlight {
      color: #111827;
      font-weight: 500;
    }
    
    .inquiry-details {
      margin: 30px 0;
      padding: 25px;
      background-color: #f8fafc;
      border-radius: 8px;
      border-left: 4px solid #ef4444;
    }
    
    .detail-row {
      margin-bottom: 12px;
      display: flex;
    }
    
    .detail-label {
      width: 150px;
      font-weight: 600;
      color: #4b5563;
      font-size: 14px;
    }
    
    .detail-value {
      flex: 1;
      color: #111827;
      font-weight: 500;
    }
    
    .important-value {
      color: #ef4444;
      font-weight: 700;
    }
    
    .reference-id {
      color: #6EBE45;
      font-weight: 700;
    }
    
    .message-section {
      margin: 30px 0;
      padding: 25px;
      background-color: #f8fafc;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }
    
    .message-label {
      font-weight: 600;
      color: #4b5563;
      margin-bottom: 10px;
      font-size: 14px;
    }
    
    .message-content {
      color: #374151;
      line-height: 1.7;
      white-space: pre-line;
      background-color: white;
      padding: 15px;
      border-radius: 6px;
      border-left: 3px solid #6EBE45;
    }
    
    .actions-section {
      margin: 40px 0;
      text-align: center;
    }
    
    .actions-title {
      font-weight: 600;
      color: #4b5563;
      margin-bottom: 20px;
      font-size: 16px;
    }
    
    .action-buttons {
      display: flex;
      gap: 15px;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .action-button {
      display: inline-block;
      background: linear-gradient(135deg, #6EBE45 0%, #5EA83A 100%);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      transition: all 0.3s ease;
      min-width: 180px;
      text-align: center;
    }
    
    .action-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(110, 190, 69, 0.3);
    }
    
    .action-button.secondary {
      background: linear-gradient(135deg, #4b5563 0%, #6b7280 100%);
    }
    
    .divider {
      border: none;
      height: 1px;
      background-color: #e5e7eb;
      margin: 40px 0;
    }
    
    /* Footer Card */
    .footer-card {
      background-color: #1f2937;
      color: #d1d5db;
      padding: 30px;
      text-align: center;
      border-radius: 12px 12px 0 0;
    }
    
    .footer-logo {
      font-size: 20px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 15px;
    }
    
    .footer-text {
      color: #9ca3af;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 15px;
    }
    
    .footer-small {
      color: #6b7280;
      font-size: 12px;
      margin-top: 20px;
    }
    
    @media (max-width: 640px) {
      .content {
        padding: 30px 20px;
      }
      
      .header-card {
        padding: 25px 20px;
      }
      
      .detail-row {
        flex-direction: column;
        margin-bottom: 15px;
      }
      
      .detail-label {
        width: 100%;
        margin-bottom: 4px;
      }
      
      .action-buttons {
        flex-direction: column;
        align-items: stretch;
      }
      
      .action-button {
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header Card -->
    <div class="header-card">
      <div class="header-title">New Contact Inquiry</div>
      <div class="header-subtitle">Kanlyte Uganda - Contact System</div>
      <div class="alert-badge">⚡ High Priority - Requires Attention</div>
    </div>
    
    <!-- Main Content -->
    <div class="content">
      <h1 class="greeting">New Inquiry Alert</h1>
      
      <p class="paragraph">
        A new inquiry has been submitted through the contact form and requires your attention.
      </p>
      
      <p class="paragraph">
        Please review the details below and respond within 24 hours for optimal customer experience.
      </p>
      
      <!-- Inquiry Details -->
      <div class="inquiry-details">
        <div class="detail-row">
          <div class="detail-label">Reference ID</div>
          <div class="detail-value reference-id">#${referenceNumber}</div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">Submission Time</div>
          <div class="detail-value">${formattedDate} at ${formattedTime}</div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">Contact Name</div>
          <div class="detail-value important-value">${formData.fullName}</div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">Email</div>
          <div class="detail-value">
            <a href="mailto:${
              formData.email
            }" style="color: #6EBE45; text-decoration: none;">
              ${formData.email}
            </a>
          </div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">Phone</div>
          <div class="detail-value">
            <a href="tel:${
              formData.phone
            }" style="color: #6EBE45; text-decoration: none;">
              ${formData.phone}
            </a>
          </div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">Service</div>
          <div class="detail-value important-value">${formData.service}</div>
        </div>
        
        ${
          formData.company
            ? `
        <div class="detail-row">
          <div class="detail-label">Company</div>
          <div class="detail-value">${formData.company}</div>
        </div>
        `
            : ""
        }
        
        <div class="detail-row">
          <div class="detail-label">Newsletter</div>
          <div class="detail-value">
            ${formData.subscribe ? "✅ Subscribed" : "❌ Not Subscribed"}
          </div>
        </div>
      </div>
      
      <!-- Message Section -->
      <div class="message-section">
        <div class="message-label">Client's Message:</div>
        <div class="message-content">${formData.message}</div>
      </div>
      
      <p class="paragraph">
        This inquiry has been marked as high priority. The client expects a response within 24 hours.
      </p>
      
      <!-- Actions -->
      <div class="actions-section">
        <div class="actions-title">Quick Actions</div>
        <div class="action-buttons">
          <a href="mailto:${formData.email}" class="action-button">
            ✉️ Reply via Email
          </a>
          <a href="tel:${formData.phone}" class="action-button secondary">
            📞 Call Client
          </a>
          ${
            process.env.NEXTAUTH_URL
              ? `
          <a href="${process.env.NEXTAUTH_URL}/admin/contacts/${submissionId}" class="action-button">
            🔍 View Details
          </a>
          `
              : ""
          }
        </div>
      </div>
      
      <hr class="divider" />
      
      <p class="paragraph">
        <strong>Note:</strong> This is an automated notification from Kanlyte Contact System.
      </p>
    </div>
    
    <!-- Footer Card -->
    <div class="footer-card">
      <div class="footer-logo">Kanlyte Admin</div>
      <p class="footer-text">
        Automated notification system for contact inquiries
      </p>
      <p class="footer-text">
        System ID: ${submissionId} | Priority: High
      </p>
      <p class="footer-small">
        © ${new Date().getFullYear()} Kanlyte Uganda Limited<br>
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
    subject: `📋 New Inquiry: ${formData.subject} - ${referenceNumber}`,
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
