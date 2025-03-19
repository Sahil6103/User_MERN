const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "https://user-mern.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    // credentials: true, // If you're using cookies or authentication tokens
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
