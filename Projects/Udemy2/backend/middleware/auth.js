const jwt = require('jsonwebtoken');

//authenticate user middleware
exports.requireLogin = (req,res,next) => {
    try{
        if(req.headers.authorization){
            //get token from header
            const token = req.headers.authorization.split(' ')[i];
            //verify token
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            //attach token to request
            req.user = decode;
            next();
        } else {
            return res.status(400).json({message: "unauthorized"})
        }
    }
        catch(err) {
            // console.log("something went wrong")
        }
        
    }
