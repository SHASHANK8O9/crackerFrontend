import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        trim: true,
        minlength: [1, "Min Length For Title is 1"],
        maxlength: [2000, "Max Length For Title is 2000"]
    },
    price: {
        type: Number
    },
    banner: {
        type: {}
    },
    discount: {
        type: Number
    },
    slug: {
        type: String,
        trim: true,
        lowercase: true
    },
    stockStatus: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category'
    },
    quantity: {
        type: String,
    },
    description: {
        type: String
    },

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

productSchema.virtual("finalPrice").get(function () {
    return this?.price - (this?.price * (this.discount / 100));
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);
