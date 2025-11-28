import jwt from 'jsonwebtoken'

// doctor authentication
const authDoctor = async (req,res,next)=>{
 try {
      const {dtoken} = req.headers
      if(!dtoken){
         return res.json({sucess:false,message:'Not Authorization to access'}) 
      } 
    if (!req.body) {
       req.body = {};
      }
      const token_decode = jwt.verify(dtoken, process.env.JWT_DOCTOR_SECRET);
      req.body.docId = token_decode.id
      next()
 } catch (error) {
   console.log(error)
   res.json({sucess:false,message:error.message})       
 }
}
export default authDoctor