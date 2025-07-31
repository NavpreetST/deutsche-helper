import mongoose from "mongoose"

import { DB_NAME } from "../constants.js"
import { app } from "../app.js"

const connectDB = async () => {


    try {

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        
        console.log(`\n MongoDB Connected!! DB Host : ${connectionInstance}`)
        console.log(`\n MongoDB Connected!! DB Host : ${connectionInstance.connection.host}`)

    }
    catch(error){
        console.log("MongoDB connection error", error)
        process.exit(1)
    }


}

connectDB().then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
}).catch((error) => console.log("MongoDB Connection failed!",error))

export default connectDB;




























// ;(async ()=>{ //this is iffy way


//     try {
//         await mongoose.connext(`${process.env.MONGODB_URI}/${DB_NAME}`)

//         app.on("error", (error) =>{
//             console.log("Error in running the server", error);
//             throw error

//         })
//         app.listen(process.env.PORT, () =>{
//             console.log(`Server is running on port ${process.env.PORT}`)
//         })

//     } catch (error) {
//         console.log("Error", error)
//         throw error
        
//     }

// })()


//second way