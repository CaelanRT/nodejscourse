const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Review = require("../models/Review");
const Product = require("../models/Product");
const { checkPermissions } = require("../utils");

const createReview = async (req, res) => {
  const { product: productId } = req.body;

  if (!productId) {
    throw new CustomError.BadRequestError("No product in request");
  }

  // checking to see if the product exists before making a review for it
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with ID ${productId}.`);
  }

  // check if the user has submitted a review already
  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });

  if (alreadySubmitted) {
    throw new CustomError.BadRequestError(
      "Already submitted review for this product.",
    );
  }

  req.body.user = req.user.userId;

  const review = await Review.create(req.body);

  res.status(StatusCodes.CREATED).json({ review });
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({});

  if (!reviews) {
    throw new CustomError.NotFoundError("No reviews in database");
  }

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

const getSingleReview = async (req, res) => {
  const reviewId = req.params.id;

  if (!reviewId) {
    throw new CustomError.BadRequestError("No review ID in request");
  }

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.NotFoundError(`No review with ID ${reviewId}`);
  }

  res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;

  if (!reviewId) {
    throw new CustomError.BadRequestError("No ID in request");
  }

  const { rating, title, comment } = req.body;

  if (!rating || !title || !comment) {
    throw new CustomError.BadRequestError("Invalid request.");
  }

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.NotFoundError(`No review with ID ${reviewId}`);
  }

  checkPermissions(req.user, review.user._id);

  review.rating = rating;
  review.title = title;
  review.comment = comment;

  await review.save();

  res.status(StatusCodes.OK).json({ review });
};

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;

  if (!reviewId) {
    throw new CustomError.BadRequestError("No ID in request");
  }

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.NotFoundError(`No review with ID ${reviewId}`);
  }

  checkPermissions(req.user, review.user._id);

  const deleted = await Review.findOneAndDelete({ _id: reviewId });

  res.status(StatusCodes.OK).json({ deleted });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
