const Product = require("../models/Product");
const CustomError = require("../errors/index");
const { StatusCodes } = require("http-status-codes");

// if you want more than one admin, you should check to make sure that you are checking the userid so that its affiliated with the right admin/tenant
const createProduct = async (req, res) => {
  req.body.user = req.user.userId;

  const product = await Product.create(req.body);

  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});

  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });

  if (!product) {
    throw new CustomError.NotFoundError(
      `No product found with ID ${req.params.id}`,
    );
  }

  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true },
  );

  if (!product) {
    throw new CustomError.NotFoundError(
      `No product found with ID ${req.params.id}`,
    );
  }

  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(
      `No product found with ID ${req.params.id}`,
    );
  }

  // .remove() has been deprecated so im gonna do some funny business and stick to the course, but just find one and delete here

  const deleted = await Product.findOneAndDelete({ _id: productId });

  res.status(StatusCodes.OK).json({ deleted });
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
