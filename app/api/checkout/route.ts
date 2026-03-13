import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { requireEnv } from "@/lib/env";

const SINGLE_PRICE = requireEnv("NEXT_PUBLIC_SINGLE_PRICE");
const RACK_PRICE = requireEnv("NEXT_PUBLIC_RACK_PRICE");
const SINGLE_DEPOSIT = SINGLE_PRICE / 2;
const RACK_DEPOSIT = RACK_PRICE / 2;

export async function POST(req: NextRequest) {
  try {
    const sk = process.env.STRIPE_SECRET_KEY?.trim();
    if (!sk) {
      console.error("[checkout] STRIPE_SECRET_KEY not set");
      return NextResponse.json({ error: "Payments not configured." }, { status: 500 });
    }

    const stripe = new Stripe(sk, { timeout: 10000 });

    const body = await req.json();
    const { color, mode, qty, name, email, address } = body;

    if (!name || !email || !address?.line1 || !address?.city || !address?.state || !address?.postal_code) {
      return NextResponse.json({ error: "Name, email, and full shipping address are required." }, { status: 400 });
    }

    const isRack = mode === "rack";
    const unitPrice = isRack ? RACK_PRICE : SINGLE_PRICE;
    const quantity = isRack ? Math.max(2, qty || 2) : 1;
    const deposit = (unitPrice * quantity) / 2;
    const depositCents = Math.round(deposit * 100);

    const origin = req.headers.get("origin") || "https://helloam.bot";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: isRack ? `Am Device × ${quantity} — Rack Pre-Order Deposit` : "Am Device — Pre-Order Deposit",
              description: `Half deposit ($${deposit}) to reserve your numbered unit${quantity > 1 ? "s" : ""}. Non-refundable. ${color ? `Color: ${color}` : ""}`.trim(),
            },
            unit_amount: depositCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: "preorder_deposit",
        customer_name: name,
        color: color || "red",
        mode: mode || "single",
        qty: String(quantity),
        unit_price: String(unitPrice),
        deposit: String(deposit),
        shipping_line1: address.line1,
        shipping_line2: address.line2 || "",
        shipping_city: address.city,
        shipping_state: address.state,
        shipping_postal_code: address.postal_code,
        shipping_country: address.country || "US",
      },
      success_url: `${origin}/preorder/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#device`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error("[checkout] Error:", err);
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
