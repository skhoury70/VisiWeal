import { NextRequest, NextResponse } from "next/server";
import { createTransporter } from "@/lib/email";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const errors: Record<string, string> = {};

    if (!body.fullName?.trim()) errors.fullName = "Full name is required";
    if (!body.email?.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
      errors.email = "Invalid email address";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const fullName = body.fullName.trim();
    const email = body.email.trim();

    const hasSupabaseCreds = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY;

    if (hasSupabaseCreds && supabase) {
      const { data: existing } = await supabase
        .from("subscribers")
        .select("id")
        .eq("email", email)
        .limit(1);

      if (existing && existing.length > 0) {
        return NextResponse.json(
          { errors: { email: "This email is already subscribed." } },
          { status: 409 }
        );
      }

      await supabase.from("subscribers").insert({
        full_name: fullName,
        email,
      });
    }

    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"Visiweal Executive Insights" <info@visiweal.com>`,
      to: email,
      subject: "Welcome to Visiweal Executive Insights",
      html: `
        <div style="max-width:560px;margin:0 auto;font-family:Helvetica,Arial,sans-serif;color:#333">
          <h2 style="color:#14b8a6">Welcome to Visiweal Executive Insights</h2>
          <p>Dear ${fullName},</p>
          <p>Thank you for subscribing.</p>
          <p>You will receive monthly analysis on M&A, markets, and strategic finance for MENA executives.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
          <p style="font-size:12px;color:#999">Visiweal FZE · Dubai, UAE</p>
        </div>
      `,
    });

    try {
      await transporter.sendMail({
        from: `"Visiweal Website" <info@visiweal.com>`,
        to: "sleiman.elkhoury@visiweal.com",
        replyTo: email,
        subject: `New Newsletter Subscription — ${fullName} <${email}>`,
        html: `
          <h2>New Newsletter Subscription</h2>
          <p>A new subscriber has joined:</p>
          <table style="border-collapse:collapse;width:100%;max-width:400px">
            <tr>
              <td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Name</td>
              <td style="padding:8px;border:1px solid #ddd">${fullName}</td>
            </tr>
            <tr>
              <td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Email</td>
              <td style="padding:8px;border:1px solid #ddd">${email}</td>
            </tr>
            <tr>
              <td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Date</td>
              <td style="padding:8px;border:1px solid #ddd">${new Date().toISOString()}</td>
            </tr>
          </table>
        `,
      });
    } catch {
      console.error("Admin notification failed for:", email);
    }

    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch (e) {
    console.error("Subscribe error:", e);
    return NextResponse.json(
      { errors: { form: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}
