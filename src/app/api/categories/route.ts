import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../lib/dbConnect";
import categoryModel from "../models/category";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await dbConnect();
    const categories = await categoryModel.find();

    console.log(categories, "categories");

    return NextResponse.json(
      {
        status: true,
        message: "Products Found Successfully!",
        data: categories,
      },
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
    await dbConnect();
    const body = await request.json();
    const { title, banner } = body;

    console.log(request);
    const product = await categoryModel.create({
      title,
      banner,
    });

    if (!product) {
      return NextResponse.json({
        status: true,
        message: "Failed To Upload Data !!",
      });
    }

    return NextResponse.json(
      { status: true, message: "Category Created Successfully!" },
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
