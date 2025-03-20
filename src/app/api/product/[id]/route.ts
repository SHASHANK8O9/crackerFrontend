import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../lib/dbConnect";
import productModel from "../../models/product";
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    await dbConnect();

    const product = await productModel.findOneAndDelete({ _id: id }).lean();

    if (!product) {
      return NextResponse.json({
        status: false,
        message: "Failed To Delete  Product !!",
      });
    }

    return NextResponse.json(
      { status: true, message: "Products Deleted Successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Occurred:", error);

    return NextResponse.json(
      { status: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    await dbConnect();

    const product = await productModel.findOne({ _id: id }).lean();

    if (!product) {
      return NextResponse.json({
        status: false,
        message: "Failed To Find  Product !!",
      });
    }

    return NextResponse.json(
      { status: true, message: "Products Found Successfully!", data: product },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Occurred:", error);

    return NextResponse.json(
      { status: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
    const id = (await params).id;
    await dbConnect();

    const product = await productModel.findOne({ _id: id }).lean();

    if (!product) {
      return NextResponse.json({
        status: false,
        message: "Failed To Find  Product !!",
      });
    }
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        stockStatus,
        banner, // Store the first uploaded file path as the banner
        discount,
        category,
        slug,
      },
      { new: true }
    );
    return NextResponse.json(
      {
        status: true,
        message: "Product Updated Successfully!",
        data: updatedProduct,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Occurred:", error);

    return NextResponse.json(
      { status: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
