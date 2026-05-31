import { NextRequest, NextResponse } from "next/server";
import { createTransporter } from "@/lib/email";
import { supabase } from "@/lib/supabase";
import { createCalendarEvent, hasAnyCalendarCreds } from "@/lib/google-calendar";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const errors: Record<string, string> = {};
    const hasGoogleCreds = hasAnyCalendarCreds();
    const hasSupabaseCreds = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY;

    if (!body.fullName?.trim()) errors.fullName = "Full name is required";
    if (!body.email?.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
      errors.email = "Invalid email address";
    if (!body.date) errors.date = "Date is required";
    if (!body.timeSlot) errors.timeSlot = "Time slot is required";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    if (hasSupabaseCreds && supabase) {
      const { data: existing } = await supabase
        .from("bookings")
        .select("id")
        .eq("date", body.date)
        .eq("time_slot", body.timeSlot)
        .limit(1);

      if (existing && existing.length > 0) {
        return NextResponse.json(
          { errors: { timeSlot: "This time slot has already been booked. Please select another." } },
          { status: 409 }
        );
      }
    }

    const services = Array.isArray(body.services) ? body.services.join(", ") : "Not specified";
    const hearAbout = body.hearAbout || "Not specified";
    const notes = body.notes || "None";
    const date = body.date;
    const timeSlot = body.timeSlot;

    let meetLink = "";
    let eventId = "";

    if (hasGoogleCreds) {
      try {
        const event = await createCalendarEvent({
          fullName: body.fullName,
          email: body.email,
          phone: body.phone || "",
          date,
          timeSlot,
          services: Array.isArray(body.services) ? body.services : [],
          notes,
        });
        meetLink = event.hangoutLink || "";
        eventId = event.id || "";
      } catch (e) {
        console.error("Google Calendar error:", (e as Error).message, (e as Error).stack);
      }
    }

    if (hasSupabaseCreds && supabase) {
      await supabase.from("bookings").insert({
        full_name: body.fullName,
        email: body.email,
        phone: body.phone || null,
        company: body.company || null,
        job_title: body.jobTitle || null,
        services: Array.isArray(body.services) ? body.services : [],
        date,
        time_slot: timeSlot,
        hear_about: hearAbout,
        notes: notes,
        meet_link: meetLink,
        event_id: eventId,
      });
    }

    try {
      const transporter = createTransporter();

      await transporter.sendMail({
        from: `"Visiweal Website" <${process.env.ZOHO_EMAIL}>`,
        to: body.email,
        cc: "sleiman.elkhoury@visiweal.com",
        subject: `Booking Confirmation — ${body.fullName} at ${timeSlot} on ${date}`,
        html: `
          <h2>Booking Confirmation</h2>
          <p>Dear ${body.fullName},</p>
          <p>Thank you for booking a consultation with Visiweal. Here are your details:</p>
          ${meetLink ? `<p><strong>Google Meet Link:</strong> <a href="${meetLink}">${meetLink}</a></p>` : ""}
          <table style="border-collapse:collapse;width:100%;max-width:600px">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Full Name</td><td style="padding:8px;border:1px solid #ddd">${body.fullName}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${body.email}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${body.phone || "Not provided"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Company</td><td style="padding:8px;border:1px solid #ddd">${body.company || "Not provided"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Preferred Date</td><td style="padding:8px;border:1px solid #ddd">${date}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Preferred Time</td><td style="padding:8px;border:1px solid #ddd">${timeSlot}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Services</td><td style="padding:8px;border:1px solid #ddd">${services}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">How did they hear?</td><td style="padding:8px;border:1px solid #ddd">${hearAbout}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Notes</td><td style="padding:8px;border:1px solid #ddd">${notes}</td></tr>
            ${meetLink ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Meet Link</td><td style="padding:8px;border:1px solid #ddd">${meetLink}</td></tr>` : ""}
          </table>
        `,
      });
    } catch (e) {
      console.error("Email error:", e);
    }

    return NextResponse.json({ success: true, message: "Booking request received" });
  } catch {
    return NextResponse.json(
      { errors: { form: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}
