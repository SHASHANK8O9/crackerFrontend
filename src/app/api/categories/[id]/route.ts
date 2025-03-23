// Assuming this is your model

import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../lib/dbConnect";
import categoryModel from "../../models/category";
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const id = (await params).id; // Get the ID from the URL path

    console.log("myparam", id);
    await dbConnect();

    const product = await categoryModel.findOneAndDelete({ _id: id }).lean();

    if (!product) {
      return NextResponse.json({
        status: true,
        message: "No Category Found !!",
      });
    }

    return NextResponse.json(
      { status: true, message: "Category Deleted Successfully!" },
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

// GET Single Category
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const id = (await params).id; // Get the ID from the URL path

    console.log("myparam", id);
    await dbConnect();

    const category = await categoryModel.findOne({ _id: id }).lean();

    if (!category) {
      return NextResponse.json({
        status: true,
        message: "No Category Found !!",
      });
    }

    return NextResponse.json(
      { status: true, message: "Category Found Successfully!", data: category },
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
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { title, banner } = body;
    const id = (await params).id; // Get the ID from the URL path

    console.log("myparam", id);
    await dbConnect();

    const category = await categoryModel.findOne({ _id: id }).lean();

    if (!category) {
      return NextResponse.json({
        status: true,
        message: "No Category Found !!",
      });
    }
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, banner },
      { new: true }
    );
    return NextResponse.json(
      {
        status: true,
        message: "Category Found Successfully!",
        data: updatedCategory,
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
