
import userModel from '../modal/userModel.js';
import generateToken from '../config/generateToken.js';
import bcrypt from 'bcrypt';
import "dotenv/config";

export default class AuthController{
    async register(req,res){
        const {username,email,password}=req.body;
        // if(!username||!email||!password){
        //   res.status(400);
        //   throw new Error('all the field are required');
        // }
        const emails=await userModel.findOne({email:req.body.email});
        // console.log(emails);
        if(emails){
            res.json({msg:'email already exist'});
        }else{
          try {
            const response = await userModel.create({...req.body});
            const token = generateToken(response._id);
            if (response === null) {
              return res.json([]);
            } else {
              return res.json({...response.toObject(), token}); // Add the token to the response object
            }
          } catch (err) {
            return res.json(err);
          }
          
        }  
}

async googleauth(req, res) {
  const user = req.user;
  const userId = user._id;   // Retrieve the user's ID
  console.log(user);

  const token = generateToken(userId);
  // console.log('Generated Token:', token);

  // const successRedirectUrl= `https://fonehub.netlify.app/product/buy?userid=${userId}`
  const successRedirectUrl= `http://localhost:3000/dashboard?userid=${userId}`

   // Set the token as an HTTP-only cookie
  //  res.cookie('token', token, { httpOnly: true });
   res.cookie('token', token);
 
  res.redirect(successRedirectUrl);  
}

async authUser(req,res){
       
  try{
      //response of database
      const response=await userModel.findOne({ email:req.body.email});
      // console.log(response);
      
      if(response===null){
          return res.json({success:false,msg:"user does not exist"});
      }else{
          //comapre with previously set credentials
          const match=bcrypt.compareSync(req.body.password,response.password);

          if(match){
              console.log('valid user')

            const token=  generateToken(response._id);
             
              // console.log(token);

               res.json({...response.toObject(), token}); 
          }else{
              res
              .status(403)
              .json({success:false,message:"invalid credentials"});
          }
      }
  }catch(err){
   res.json(err);
  }
}

async getAllUsers(req, res) {
  const keyword = req.query
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  // get login user id from middleware validation
  const userId = req.userId; 
   console.log(userId);
  const users = await userModel.find({
    ...keyword,
    _id: { $ne: userId },
  });

  res.json(users);
}

async userValidate(req, res) {

  // get login user id from middleware validation
  const userId = req.userId; 
   console.log(userId);
  const users = await userModel.findOne({ _id:userId});
  users?res.json(users):res.json({message:"user not found"});
  
}


}