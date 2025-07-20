const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../services/sendEmail");

exports.registerUser = async (req, res) => {
  const { email, name, phoneNumber, password } = req.body;

  if (!email || !name || !phoneNumber || !password) {
    return res.status(400).json({
      message: "Please provide email, name, phoneNumber and password",
    });
  }

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
  const userFound = await User.find();
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

  if (!email || !password) {
    return res.status(400).json({
      message: "please provide email and password",
    });
  }

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

  if (!name || !email || !message) {
    return res.status(400).json({
      message: "Please Fill out All the field Name, Email and Message",
    });
  }

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
  if (!email) {
    return res.status(400).json({
      message: "Please provide email",
    });
  }
  const userFound = await User.find({ email });
  //console.log(userFound)
  if (userFound.length == 0) {
    return res.status(404).json({
      message: "Email is not registered",
    });
  }
  const otp = Math.floor(Math.random() * 10000);
  userFound[0].otp = otp;
  await userFound[0].save();
  // console.log("This is otp",otp)

  await sendEmail({
    email: email, //to this email
    subject: "OTP for your Attendance account",
    message: `This is your otp.\n ${otp} \nDon't share it with anyone`,
  });
  res.status(200).json({
    message: "OTP sent successfully",
  });
};

// exports.deleteAccount = async(req,res)=>{
//      const {userId} = req.user.id

//      const email = req.user.email
//     // console.log(email)

//      if(!email){
//         return res.status(400).json({
//             messageg : "Please provide email"
//         })
//      }
//      const userFound = await User.find({email})
//      const otp = Math.floor(Math.random() *10000)
//      userFound[0].otp = otp
//      await userFound[0].save()

//      await sendEmail({
//         email : email, //to this email
//         subject : "OTP for delete your account",
//         message : `This is your otp.\n ${otp} \nDon't share it with anyone\n If this action is not done by you, please ignore this email`
//      })
//      res.status(200).json({
//         message : "OTP sent successfully"
//      })
// }

exports.verifyotp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({
      message: "Please provide otp and email",
    });
  }
  const userExists = await User.find({ email });
  if (userExists.length == 0) {
    return res.status(404).json({
      message: "Email is not registered",
    });
  }
  //console.log("userexxist",userExists[0])
  //console.log("otp",userExists[0].otp)
  //console.log("input",otp)
  //console.log(userExists[0].otp !== otp)

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
  if (!email || !newPassword || !confirmPassword) {
    return res.status(400).json({
      message: "Please provide email, newpassword and confirmpassword",
    });
  }

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
  //console.log(userFound[0])
  //console.log(userExist[0].isOtpVerified)

  if (userFound[0].isOtpVerified !== true) {
    return res.status(403).json({
      message: "You cannot perform this action",
    });
  }

  userFound[0].password = bcrypt.hashSync(newPassword, 8);
  userFound[0].isOtpVerified = false;
  await userFound[0].save();

  res.status(200).json({
    message: "password changed successfully",
  });
};
