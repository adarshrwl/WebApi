const Path = require("path");
const fs = require("fs");
const productModel = require("../models/productModel");

const createProduct = async (req, res) => {
  // Check for incoming data
  console.log(req.body);
  console.log(req.files);

  // Destructure incoming data
  const { productName, productPrice, productDescription, productCategory } =
    req.body;

  // Validate required fields
  if (
    !productName ||
    !productPrice ||
    !productCategory ||
    !productDescription
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Check product image
  if (!req.files || !req.files.productImage) {
    return res.status(400).json({
      success: false,
      message: "Image not found!",
    });
  }

  const { productImage } = req.files;

  // Uploading first step
  // 1. Generate unique name for each file
  const imageName = `${Date.now()}-${productImage.name}`;

  // 2. Define specific path
  const imageUploadPath = Path.join(
    __dirname,
    `../public/products/${imageName}`
  );

  // Ensure the directory exists
  fs.mkdirSync(Path.dirname(imageUploadPath), { recursive: true });

  // 3. Upload to that path (using async/await and try/catch)
  try {
    await productImage.mv(imageUploadPath);

    // Save to database
    const newProduct = new productModel({
      productName,
      productPrice,
      productCategory,
      productDescription,
      productImage: imageName,
    });

    const product = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product Created!",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  // 1. Find all the products
  const products = await productModel.find({});
  res.status(201).json({
    success: true,
    message: "Products Fetched Sucessfully",
    products: products,
  });
  // 2.Send all the products
  try {
  } catch (error) {
    console.log(error);
  }
};
//fetch single product
const getProduct = async (req, res) => {
  //recive id from the req.params.id
  const productId = req.params.id;
  //find the product by id
  try {
    const product = await productModel.findById(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
};
