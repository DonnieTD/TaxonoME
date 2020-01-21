var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();


// helpers
import {CheckIfUserExists,CheckPassword,MakeJWT} from './BusinessLogic/loginHelperFunctions';
import {Register} from './BusinessLogic/registerHelperFunctions'
import {errorHandler} from './BusinessLogic/errorHelperFunctions';

// define the about route
router.post('/register', async function (req, res) {
  try {
     res.send(await Register('Users',req.body.UserName,req.body.Password));
  }catch (e) {
     res.status(400).send(errorHandler(e)); 
  }
})

router.post('/login', async function (req, res) {
  try{
    let UserObj = await CheckIfUserExists("Users",req.body.UserName);
    let JWTPayload = await CheckPassword(req.body.Password,UserObj[0].Password,UserObj[0]);
    let JWT = await MakeJWT(JWTPayload,process.env.SECRET_KEY,{ algorithm: 'HS256',   expiresIn:'300m' });
    
    const expiration = 7500*300;// a minute is 7500

    res.cookie('token', JWT, {
      expires: new Date(Date.now() + expiration),
      secure: false, // set to true if your using https
      httpOnly: true,
    }).send(UserObj)

  }catch(e){
    console.log(e)
      res.status(400).send(errorHandler(e));    
  }
})

// WILL HAVE TO BECOME MIDDLEWARE
router.post('/verify', async function (req, res) {
  const token = req.cookies.token;
  if (token) {
    try{
      const decrypt = await jwt.verify(token, process.env.SECRET_KEY);

      if(Date.now()/1000 > decrypt["exp"] ){
        return  res.clearCookie('token').send(false);
      }else{
        return  res.send(decrypt)
      }

      
    }catch(e){
      console.log(e)
    }
  } else {
    return res.send(false)
  }
})

router.post('/logout', async function (req, res) {
  const token = req.cookies.token;
  if (token) {
    res.clearCookie('token');
    res.send(true);
   }else{
    res.send(true);
  }
});

module.exports = router