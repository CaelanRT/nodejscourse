const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide rating"],
    },
    title: {
      type: String,
      trim: true,
      maxlength: 100,
      required: [true, "Please provide title"],
    },
    comment: {
      type: String,
      required: [true, "Please provide comment"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// this lets you set a limit of 1 review per product per user!
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.product);
});

// need to create a function and use it honestly
ReviewSchema.methods.postRemove = async function () {
  await this.constructor.calculateAverageRating(this.product);
};

// how to create a static method on the schema
ReviewSchema.statics.calculateAverageRating = async function (productId) {
  console.log(productId);
};

module.exports = mongoose.model("Review", ReviewSchema);
