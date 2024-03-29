const router=require('express').Router();
const User=require('../models/User')
const CryptoJs=require('crypto-js')
const jwt=require('jsonwebtoken')


// Register

router.post("/register", async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJs.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });
  
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
//   login

router.post('/login',async(req,res)=>{

    try{
    const user = await User.findOne({username:req.body.username})
    
    if(!user){
        return res.status(501).json('Username does not exist');

    }
    const hashedPassword=CryptoJs.AES.decrypt(user.password,process.env.PASS_SEC)
    const OriginalPassword=hashedPassword.toString(CryptoJs.enc.Utf8)
     if(OriginalPassword!==req.body.password){
        return res.status(502).json('You are not authenticated')


    }

    const accessToken=jwt.sign(
        {
            id:user._id,
            isAdmin:user.isAdmin

        },
        process.env.JWT_SEC,
        
    )

        const{password,...others}=user._doc;

    res.status(200).json({...others ,accessToken})

    

}catch(err){
    res.status(500).json(err)
}
   


})



module.exports=router