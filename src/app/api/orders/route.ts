import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../lib/dbConnect";
import order from "../models/order";
import { orderEmail } from "../lib/orderEmail";

export async function POST(request: NextRequest) {
  await dbConnect();
  const body = await request.json();
  const { fullName, email, phone, address, orderNotes, orderItems } = body;
  try {
    if (!fullName || !email || !phone || !address || !orderItems.length) {
      return NextResponse.json(
        { status: false, error: "All fields are required" },
        { status: 400 }
      );
    }
    const newOrder = await order.create({
      fullName,
      email,
      phone,
      address,
      orderNotes,
      orderItems,
    });

    if (!newOrder) {
      return NextResponse.json(
        { status: false, message: "Failed to create order!" },
        { status: 500 }
      );
    }
    orderEmail("user", email, body);
    return NextResponse.json(
      { status: true, message: "Order Created Successfully!", data: newOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error Occurred:", error);
    return NextResponse.json(
      { status: false, message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
