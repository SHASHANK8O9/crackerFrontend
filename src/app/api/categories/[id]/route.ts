// Assuming this is your model

import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../lib/dbConnect";
import categoryModel from "../../models/category";
export async function DELETE(
  request: NextRequest,
  { params }
): Promise<NextResponse> {
  try {
    const { id } = params; // Get the ID from the URL path

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
