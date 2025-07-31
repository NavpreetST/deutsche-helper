//this is a wrapper function jo hum har jagh use krege.
//promise walla
const asyncHandler = (requestHandler) =>{


    return (req, res, next)=>{
        Promise.resolve(requestHandler(req, res, next)).catch((err)=> next(err))
    }
}

export {asyncHandler}

// const asyncHandler =() => {}
// const asyncHandler =(func) => {() =>  {}} can also be written without curly //fn accepted, further ek aur function pass kro
// const asyncHandler =(func) => async () =>  {}



    //using try catch.
// const asyncHandler = (fn) => async (req, res, next) =>{

//     try{
//         await fn(req, res, next)

//     }catch(error){
//         res.status(error.code || 500).json({
//             success : false, 
//             message : error.message || "Something went wrong"

//         })
//     }

// }