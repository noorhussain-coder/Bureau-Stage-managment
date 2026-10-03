

const ErrorMiddleware=(err,req,res,next)=>{
    console.log("Error received:", err.message);
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal ServerError"
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}

export default ErrorMiddleware;