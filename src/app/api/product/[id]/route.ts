import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../lib/dbConnect";
import productModel from "../../models/product";
export async function DELETE(request: NextRequest, { params }): Promise<NextResponse> {
    try {
        const { id } = params;
        await dbConnect();

        const product = await productModel.findOneAndDelete({ _id: id }).lean();

        if (!product) {
            return NextResponse.json({ status: false, message: "Failed To Delete  Product !!" });
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