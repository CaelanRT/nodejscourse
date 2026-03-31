// imports
require("dotenv").config();
require("express-async-errors");

// app
const express = require("express");
const app = express();

// rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

// middleware imports
const notFoundMiddlware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");

// middleware invocations
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static("./public"));
app.use(fileUpload());

// database
const dbConnect = require("./db/connect");

// routes
app.get("/", (req, res) => {
  res.send("e-commerce api");
});

app.get("/api/v1", (req, res) => {
  //console.log(req.cookies);
  console.log(req.signedCookies);

  res.send("e-commerce api");
});

// auth routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);

// error handling must be under the main routes
app.use(notFoundMiddlware);
app.use(errorHandlerMiddleware);

// port
const port = process.env.PORT || 5000;

// start function + connect to db
const start = async () => {
  try {
    await dbConnect(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
