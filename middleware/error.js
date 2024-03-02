const Errorhandler = require('../utils/errorhandler')

module.exports = (err, req, res, next)=>{
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong mongodb Id error 
    if(err.name==='CastError'){
        const message = `Resource not found. Invalid: ${err.path}`
        err = new Errorhandler(message, 400)
    }

    // mongoose duplicate key error 
    if(err.code=== 11000){
        const message= `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new Errorhandler(message, 400)
    }

     // Wrong JWT error 
     if(err.name==='JsonWebTokenError'){
        const message = `json web token is invalid , try again`
        err = new Errorhandler(message, 400)
    }


     //  JWT Expire error 
     if(err.name==='TokenExpiredError'){
        const message = `json web token is Expired , try again`
        err = new Errorhandler(message, 400)
    }


    res.status(err.statuscode).json({
        success:false,
        message:err.message
    })

}