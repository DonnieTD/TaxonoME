import { DBINSTANCE } from '../../../lib/mongoConnect';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function CheckIfUserExists(UsersCollection,UserName) {
    const col = DBINSTANCE.collection(UsersCollection);

    
    const docs = await col.find({ UserName }).toArray();

    if(docs == false){
        throw "Invalid User"
    }
    return docs
  
};

async function CheckPassword(Password,UserObjectPassword,UserObj){
    // check the password
    let passwordCheck = await bcrypt.compare(Password,UserObjectPassword); 

    if(passwordCheck == false) throw "Invalid Password"
    
    return UserObj
}
 

async function MakeJWT(payload,secret,encryptionObj){
  let JWTCreationResponse = await jwt.sign(payload, secret,encryptionObj);

  if(JWTCreationResponse == false) throw "JWT ERROR"

  return JWTCreationResponse
};

  export{
    CheckIfUserExists,
    CheckPassword,
    MakeJWT
}