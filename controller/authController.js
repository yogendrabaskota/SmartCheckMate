const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../services/sendEmail");

exports.registerUser = async (req, res) => {
  const { email, name, phoneNumber, password } = req.body;

  const userFound = await User.find({ email: email });
  if (userFound.length > 0) {
    return res.status(400).json({
      message: "user with that email already exist.",
    });
  }

  await User.create({
    name,
    phoneNumber,
    email,
    password: bcrypt.hashSync(password, 8),
  });
  res.status(200).json({
    message: "User Created Successfully",
  });
};

exports.getAllUser = async (req, res) => {
  const userFound = await User.find().select("-password -otp");
  if (userFound.length < 0) {
    res.status(400).json({
      message: "No user found",
    });
  } else {
    res.status(200).json({
      message: "User fetched succesfully",
      data: userFound,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.find({ email: email });
  if (userFound.length == 0) {
    return res.status(404).json({
      message: "User with that email is not registered",
    });
  }

  const isMatched = bcrypt.compareSync(password, userFound[0].password);
  if (isMatched) {
    const token = jwt.sign({ id: userFound[0]._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });
    res.status(200).json({
      message: " User logged in successfully ",
      token: token,
    });
  } else {
    res.status(404).json({
      message: "invalid password",
    });
  }
};

exports.sendData = async (req, res) => {
  const { name, email, message } = req.body;

  await sendEmail({
    email: `sujanbaskota321@gmail.com`, // Admin email address// Mail send to this email
    subject: "Contact Form Submission",
    message: `
          Contact Form Submission Data:
          Name: ${name}
          Email: ${email}
          Message: ${message}
        `,
  });

  res.status(200).json({
    message: "Contact form submitted Successfully",
  });
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  const userFound = await User.find({ email });

  if (userFound.length == 0) {
    return res.status(404).json({
      message: "Email is not registered",
    });
  }
  const otp = Math.floor(Math.random() * 9000000);
  userFound[0].otp = otp;
  await userFound[0].save();

  await sendEmail({
    email: email, //to this email
    subject: "OTP for your Attendance account",
    message: `This is your otp.\n ${otp} \nDon't share it with anyone`,
  });
  res.status(200).json({
    message: "OTP sent successfully",
    data: email,
  });
};

exports.verifyotp = async (req, res) => {
  const { email, otp } = req.body;

  const userExists = await User.find({ email });
  if (userExists.length == 0) {
    return res.status(404).json({
      message: "Email is not registered",
    });
  }
  if (userExists[0].otp != otp) {
    res.status(400).json({
      message: "Invalid otp",
    });
  } else {
    // delete after used
    userExists[0].otp = undefined;
    userExists[0].isOtpVerified = true;
    await userExists[0].save();
    res.status(200).json({
      message: "Otp is correct",
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      message: "NewPassword and confirmPassword doesn't match",
    });
  }

  const userFound = await User.find({ email });
  if (userFound.length == 0) {
    return res.status(404).json({
      message: "User email not registered",
    });
  }

  if (userFound[0].isOtpVerified !== true) {
    return res.status(403).json({
      message: "You cannot perform this action",
    });
  }

  userFound[0].password = await bcrypt.hashSync(newPassword, 8);
  userFound[0].isOtpVerified = false;
  await userFound[0].save();

  res.status(200).json({
    message: "password changed successfully",
  });
};
