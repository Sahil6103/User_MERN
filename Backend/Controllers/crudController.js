const bcrypt = require("bcrypt");
const userModel = require("../Models/user.model");
const { generateToken } = require("../Utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const user = await userModel.findOne({ email: email });

    if (user) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      fullname,
      email,
      password: hash,
    });

    const token = generateToken(newUser);

    return res
      .status(201)
      .json({ message: "Register Successfully!", user: newUser, token });
  } catch (error) {
    return res.status(500).json({ message: "Server Error!" });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(301).json({ message: "Email not registered!" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = generateToken(user);
        return res.status(200).json({ message: "Welcome Back!" });
      } else {
        return res
          .status(401)
          .json({ message: "Incorrect email or password!" });
      }
    });
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};
