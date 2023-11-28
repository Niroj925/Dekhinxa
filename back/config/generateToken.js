import jwt from 'jsonwebtoken'
import "dotenv/config"
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'3hr'
    })
}

export default generateToken;