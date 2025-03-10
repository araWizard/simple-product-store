import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req,res) => {
    try {
        const products = await Product.find({}); //
        res.status(200).json({
            success : true,
            data: products
        })
    } catch (error) {
        console.log(`Error in delete product : ${error.message}`);
        res.status(500).json({
            success : false,
            message : "Server Error"
        });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body; //user will send this data

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({
            success: false,
            message: "Please provide all fields"
        });
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({
            success: true,
            data: newProduct
        });
    } catch (error) {
        console.error("Error in Create Product:", error.message);
        res.status(500).json({
            success : false,
            message: "Internal Server Error"
        });
    };
};

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    console.log(id);

    try {
        const product = await Product.findById(id);
        if(!product) {
            return res.status(404).json({
                success : false,
                message : "Product not found"
            })
        }
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Product deleted"
        })
    } catch (error) {
        res.status(404).json({
            success : false,
            message:"Product not found"
        })
    }
};

export const updateProduct = async (req, res) => {
    const {id} = req.params
    console.log(id)

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message : "Invalid Id"
        })
    }

    const updatedProduct = req.body;

    try {
        const oldProduct = await Product.findById(id)
        if(!oldProduct) {
            req.status(404).json({
                success : false,
                message : "Product not found"
            })
        }

        await Product.findByIdAndUpdate(id, updatedProduct, {new: true}); // new true returns the document after updating

        res.status(200).json({
            success : true,
            data : updatedProduct
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
};