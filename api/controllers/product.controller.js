import { Product } from "../models/product.schema.js";

export const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, category, stock } = req.body;
    if (!name || !price) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    //  image
    const product = new Product({
      name,
      price,
      description,
      category,
      stock,
      image: req.file.path,
    });

    await product.save();

    return res.status(201).json({
      message: "Product Created successfuly",
      product: product._id,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// get specific proudct
export const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "Product detail is not Available",
      });
    }

    const product = await Product.findById({ _id: id });
    if (!product) {
      return res.status(400).json({
        message: "Product is not Available",
      });
    }
    return res.status(200).json({
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// get all products with searching and pagination functionality:
export const getAllProducts = async (req, res) => {
  try {
    const { category, search } = req.query;

    const filter = {};

    // Category filter
    if (category && category !== "all") {
      filter.category = category;
    }

    // Search filter
    if (search && search.trim() !== "") {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(filter).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      totalProducts: products.length,
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
