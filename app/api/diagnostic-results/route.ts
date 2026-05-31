import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const pdfBlob = formData.get("pdf") as Blob | null;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    if (!pdfBlob) {
      return NextResponse.json({ error: "PDF attachment required" }, { status: 400 });
    }

    const buffer = Buffer.from(await pdfBlob.arrayBuffer());

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtppro.zoho.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || "sleiman.elkhoury@visiweal.com",
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Visiweal" <${process.env.SMTP_USER || "sleiman.elkhoury@visiweal.com"}>`,
      to: email,
      subject: "Your Financial Resource Diagnostic Report",
      text: `Thank you for completing the Financial Resource Diagnostic.

Attached is your personalized PDF report with your assessment results, radar chart, and strategic recommendations.

If you have questions, reply to this email or visit https://visiweal.com.

— The Visiweal Team`,
      html: `<p>Thank you for completing the Financial Resource Diagnostic.</p>
<p>Attached is your personalized PDF report with your assessment results, radar chart, and strategic recommendations.</p>
<p>If you have questions, reply to this email or visit <a href="https://visiweal.com">visiweal.com</a>.</p>
<p>— The Visiweal Team</p>`,
      attachments: [
        {
          filename: "financial-diagnostic-report.pdf",
          content: buffer,
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Diagnostic email error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
