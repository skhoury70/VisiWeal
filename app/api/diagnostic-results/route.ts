import { NextRequest, NextResponse } from "next/server";
import { createTransporter } from "@/lib/email";

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

    const transporter = createTransporter();
    const phone = "+961 71 828281";
    const fromEmail = "info@visiweal.com";

    await transporter.sendMail({
      from: `"VisiWeal" <${fromEmail}>`,
      to: email,
      subject: "VisiWeal: Your CFO Model Fit Report Is Ready",
      text: `Hello,

Thank you for completing the VisiWeal Financial Resource Diagnostic. Attached you'll find your personalized PDF report containing:

- Assessment results and a radar chart
- Our recommended financial-resource model (Outsourced, Fractional, or Full-time CFO)
- Strategic, prioritized recommendations across six pillars of financial health

Key areas analyzed:

- Capital & Liquidity: cash runway, capital needs, fundraising proximity
- Regulatory Exposure: multi-entity, cross-border, and sector compliance risks
- Macro Risk: FX, inflation, geopolitical and banking-system vulnerability
- Governance & Controls: reporting, internal controls, and revenue recognition
- Operational Scale: finance capability, systems maturity, and resourcing gaps
- Growth & Exit: M&A readiness, exit horizon, and transaction architecture

Next steps:

- Book a 45-minute consultation to walk through the report and an implementation roadmap: https://visiweal.com/book-consultation
- For immediate questions, simply reply to this email and we'll respond within one business day.

We appreciate the trust you've placed in VisiWeal. Our recommendations are tailored to position your business for resilient growth, transactional readiness, and governed scale.

Warm regards,
The VisiWeal Team
visiweal.com | ${phone} | ${fromEmail}`,
      html: `<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f6f9;font-family:Helvetica,Arial,sans-serif;">
  <tr>
    <td align="center" style="padding:40px 16px;">
      <table cellpadding="0" cellspacing="0" border="0" width="600" style="background:#ffffff;border-radius:8px;overflow:hidden;">
        <tr>
          <td style="padding:32px 40px 0 40px;">
            <img src="https://visiweal.com/logo.png" alt="VisiWeal" width="140" style="display:block;" />
          </td>
        </tr>
        <tr>
          <td style="padding:24px 40px 0 40px;">
            <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#1a1a2e;">Hello,</p>
            <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#1a1a2e;">
              Thank you for completing the <strong>VisiWeal Financial Resource Diagnostic</strong>. Attached you'll find your personalized PDF report containing:
            </p>
            <ul style="margin:0 0 16px 0;padding-left:20px;font-size:15px;line-height:1.6;color:#1a1a2e;">
              <li>Assessment results and a radar chart</li>
              <li>Our recommended financial-resource model (Outsourced, Fractional, or Full-time CFO)</li>
              <li>Strategic, prioritized recommendations across six pillars of financial health</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f8f9fc;border-radius:6px;border-left:4px solid #2563eb;">
              <tr>
                <td style="padding:16px 20px;">
                  <p style="margin:0 0 8px 0;font-size:13px;font-weight:700;color:#1a1a2e;text-transform:uppercase;letter-spacing:0.5px;">Key Areas Analyzed</p>
                  <table cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td style="width:50%;padding:4px 8px 4px 0;font-size:13px;color:#333;vertical-align:top;">&bull; Capital &amp; Liquidity: cash runway, capital needs, fundraising proximity</td>
                      <td style="width:50%;padding:4px 0 4px 8px;font-size:13px;color:#333;vertical-align:top;">&bull; Regulatory Exposure: multi-entity, cross-border, and sector compliance risks</td>
                    </tr>
                    <tr>
                      <td style="width:50%;padding:4px 8px 4px 0;font-size:13px;color:#333;vertical-align:top;">&bull; Macro Risk: FX, inflation, geopolitical and banking-system vulnerability</td>
                      <td style="width:50%;padding:4px 0 4px 8px;font-size:13px;color:#333;vertical-align:top;">&bull; Governance &amp; Controls: reporting, internal controls, and revenue recognition</td>
                    </tr>
                    <tr>
                      <td style="width:50%;padding:4px 8px 4px 0;font-size:13px;color:#333;vertical-align:top;">&bull; Operational Scale: finance capability, systems maturity, and resourcing gaps</td>
                      <td style="width:50%;padding:4px 0 4px 8px;font-size:13px;color:#333;vertical-align:top;">&bull; Growth &amp; Exit: M&amp;A readiness, exit horizon, and transaction architecture</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 40px 0 40px;">
            <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#1a1a2e;"><strong>Next steps</strong></p>
            <ul style="margin:0 0 16px 0;padding-left:20px;font-size:15px;line-height:1.6;color:#1a1a2e;">
              <li>Book a 45-minute consultation to walk through the report and an implementation roadmap: <a href="https://visiweal.com/book-consultation" style="color:#2563eb;">visiweal.com/book-consultation</a>.</li>
              <li>For immediate questions, simply reply and we&#8217;ll respond within one business day.</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 24px 40px;">
            <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#1a1a2e;">We appreciate the trust you&#8217;ve placed in VisiWeal. Our recommendations are tailored to position your business for resilient growth, transactional readiness, and governed scale.</p>
            <p style="margin:0 0 4px 0;font-size:15px;line-height:1.6;color:#1a1a2e;">Warm regards,</p>
            <p style="margin:0 0 4px 0;font-size:15px;line-height:1.6;color:#1a1a2e;"><strong>The VisiWeal Team</strong></p>
            <p style="margin:0;font-size:13px;color:#666;">visiweal.com | ${phone} | ${fromEmail}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`,
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
