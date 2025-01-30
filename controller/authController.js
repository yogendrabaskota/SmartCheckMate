const User = require("../model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


exports.registerUser = async(req,res)=>{

    const {email, name, phoneNumber, password} = req.body

    if(!email || !name || !phoneNumber || !password){
        return res.status(400).json({
            message : "Please provide email, name, phoneNumber and password"
        })
    }

    const userFound = await User.find({email : email})
    if(userFound.length > 0) {
        return res.status(400).json({
            message : "user with that email already exist."
   })
  }
 
  
        await User.create({ 
            name,
            phoneNumber,
            email,
            password : bcrypt.hashSync(password,8),
        })
        res.status(200).json({
            message : "User Created Successfully"
        })

}

exports.getAllUser = async(req,res)=>{
    const userFound = await User.find()
    if(userFound.length < 0) {
     res.status(400).json({
         message : "No user found"
     })
    }else{
      res.status(200).json({
          message : "User fetched succesfully",
          data : userFound
      })
    }
     
  }

exports.loginUser = async(req,res)=>{
    
    const {email,password} = req.body

    if(!email || !password) {
        return res.status(400).json({
            message : "please provide email and password"
        })
    }

    const userFound = await User.find({email : email})
    if(userFound.length == 0) {
        return res.status(404).json({
            message : "User with that email is not registered"
        })
    }

    const isMatched = bcrypt.compareSync(password,userFound[0].password)
    if(isMatched) {
        const token = jwt.sign({id : userFound[0]._id},process.env.SECRET_KEY,{
        expiresIn : '30d'
        })
        res.status(200).json({
            message : " User logged in successfully ",
            token : token,

        })
    }else{
        res.status(404).json({
            message : "invalid password"
    
        }) 
    }


}