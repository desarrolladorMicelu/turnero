const jwt = require('jsonwebtoken');
const { jwtPass} = process.env;


const verificarToken = (token)=>{

    try{
        const infoToken = jwt.verify(token, jwtPass);
        return {verified:true, info:infoToken}
    }catch{
        return {verified:false}
    }

}

module.exports = verificarToken;