import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const errors: Record<string, string> = {};

    if (!body.name?.trim()) errors.name = "Name is required";
    if (!body.company?.trim()) errors.company = "Company is required";
    if (!body.email?.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
      errors.email = "Invalid email address";
    if (!body.message?.trim()) errors.message = "Message is required";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { errors: { form: "Invalid request body" } },
      { status: 400 }
    );
  }
}
