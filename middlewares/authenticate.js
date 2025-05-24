import jwt from 'jsonwebtoken';

const authenticateToken = async(req,res,next) =>{

    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(" ")[1];
    const token = req.cookies.jwt;
    
    if(!token) return res.sendStatus(401);

    jwt.verify(token,process.env.secretkey,(err,user)=>{
        if(err) return res.sendStatus(401);
        req.user = user;
        next();
    })
}

export {authenticateToken};
