import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../lib/dbConnect";
import productModel from "../models/product";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await dbConnect();
    const products = await productModel.find().populate("category");

    console.log("prodc", products);
    return NextResponse.json(
      { status: true, message: "Products Found Successfully!", data: products },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Occurred:", error);

    return NextResponse.json(
      { status: false, message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const {
      title,
      description,
      price,
      discount,
      category,
      slug,
      banner,
      quantity,
      stockStatus,
    } = body;

    if (!title || !price) {
      return NextResponse.json(
        { status: false, message: "Missing required fields!" },
        { status: 400 }
      );
    }

    await dbConnect();

    // ✅ Store product in database with uploaded banner file
    const product = await productModel.create({
      title,
      description,
      price,
      stockStatus,
      banner, // Store the first uploaded file path as the banner
      discount,
      category,
      quantity,
      slug,
    });

    if (!product) {
      return NextResponse.json(
        { status: false, message: "Failed to create product!" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { status: true, message: "Product Created Successfully!", data: product },
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
