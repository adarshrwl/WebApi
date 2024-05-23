const Path = require('path');

const createProduct = async (req, res) => {
    // Check for incoming data
    console.log(req.body);
    console.log(req.files);

    // Destructure incoming data
    const { productName, productPrice, productDescription, productCategory } = req.body;

    // Validate required fields
    if (!productName || !productPrice || !productCategory || !productDescription) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    // Check product image
    if (!req.files || !req.files.productImage) {
        return res.status(400).json({
            success: false,
            message: "Image not found!"
        });
    }

    const { productImage } = req.files;

    // Uploading first step
    // 1. Generate unique name for each file
    const imageName = `${Date.now()}-${productImage.name}`;

    // 2. Define specific path
    const imageUploadPath = Path.join(__dirname, `../public/products/${imageName}`);

    // 3. Upload to that path (using async/await and try/catch)
    try {
        await productImage.mv(imageUploadPath);
        res.send("Image Uploaded");
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

module.exports = {
    createProduct
};
