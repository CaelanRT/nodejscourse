const Product = require("../models/Product");
const CustomError = require("../errors/index");
const { StatusCodes } = require("http-status-codes");

// need to add async
const createProduct = async (req, res) => {
  req.body.user = req.user.userId;

  const product = await Product.create(req.body);

  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = (req, res) => {
  res.send("getAllProducts");
};

const getSingleProduct = (req, res) => {
  res.send("getSingleProduct");
};

const updateProduct = (req, res) => {
  res.send("updateProduct");
};

const deleteProduct = (req, res) => {
  res.send("deleteProduct");
};

const uploadImage = (req, res) => {
  res.send("uploadImage");
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
