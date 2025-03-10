import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    image : {
        type: String,
        required: true
    }
}, {
    timestamps : true // createdAt, updatedAt fields
});

const Product = mongoose.model('Product', productSchema);
// Mongoose convention - converted Product to products (lowercase + plural conversion)
// Put only the singular & capitalised name

export default Product;