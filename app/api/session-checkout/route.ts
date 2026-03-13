import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const SESSION_PRICE_CENTS = Number(process.env.SESSION_PRICE_CENTS) || 7500;

export async function POST(req: NextRequest) {
  try {
    const sk = process.env.STRIPE_SECRET_KEY?.trim();
    if (!sk) {
      console.error("[session-checkout] STRIPE_SECRET_KEY not set");
      return NextResponse.json({ error: "Payments not configured." }, { status: 500 });
    }

    const stripe = new Stripe(sk, { timeout: 10000 });

    const body = await req.json();
    const { name, email } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2)
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: SESSION_PRICE_CENTS,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      receipt_email: email.trim().toLowerCase(),
      metadata: {
        type: "live_session",
        customer_name: name.trim(),
        customer_email: email.trim().toLowerCase(),
      },
      description: "Live Session — 30 min screenshare with the founder",
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: unknown) {
    console.error("[session-checkout] Error:", err);
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
