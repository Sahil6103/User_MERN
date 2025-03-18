const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173", // Change to your frontend URL in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./Config/mongodb.connect");

const userRouter = require("./Routes/user.route");

app.use("/api/auth", userRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
