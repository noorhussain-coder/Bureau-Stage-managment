export const catchAsyncError=(passedFunction)=>(req,res,next)=>{
    Promise.resolve(passedFunction(req,res,next)).catch(next)
}

// export const catchAsyncError = (passedFunction) => {
//     return async (req, res, next) => {
//         try {
//             await passedFunction(req, res, next);
//         } catch (error) {
//             next(error);
//         }
//     };
// };