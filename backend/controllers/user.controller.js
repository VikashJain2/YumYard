import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import validator from "validator";

// Login User

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token, message: "Logged In Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

// Register User
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exist = await userModel.findOne({
      email,
    });
    if (exist) {
      return res.json({ success: false, message: "User already exist" });
    }

    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a storng password",
      });
    }

    // hashing user password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token, message: "Account created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(502).json({ success: false, message: "Something went wrong" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({}).select("-password -cartData");
    res.json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

const removeUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.id);
    if (!user) {
      res.status(402).json({ success: false, message: "user doesn't exist" });
    }

    await userModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

const changeUserStatus = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.body.id, {
      status: req.body.status,
    });

    res.json({ success: true, message: "status updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

const loginAdmin = async(req,res)=>{
 try {
   const {email,password} = req.body;
 
   const user = await userModel.findOne({email});
   if(!user){
     return res.json({success:false,message:"You are not authorized as admin"})
   }
 
   const compare = await bcrypt.compare(password,user.password)
   if(!compare){
     return res.json({success:false,message:"Invalid Credentials"})
   }

   if(!user.status === "admin"){
    return res.json({success:false,message:"You are not authorized as admin"})
   }
 
   const token = createToken(user._id)
   res.json({success:true,token,message:"Logged In successfully"})
 } catch (error) {
  console.log(error);
  res.json({success:false,message:"Something went wrong"})
 }
}
export { loginUser, registerUser, getUsers, removeUser, changeUserStatus,loginAdmin };
