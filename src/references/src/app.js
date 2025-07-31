import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"



const app = express()


app.use(cors({
    origin : [process.env.CORS_ORIGIN],
    credentials : true,
    
}))

app.use(express.json({
    limit: "16kb" //json limit

}))

app.use(express.urlencoded(
    {
        extended : true,
        limit : "16kb"
    }
)) //to handle urls like navpreet+singh or navpreet %20 singh

app.use(express.static("public")) //when we wish to store files like pdf, etc

//cookie parser is used to access cookies from the browser
app.use(cookieParser())


//routes

import userRouter from "./routes/user.routes.js"

//routes declaration middleware is neceassary

app.use("/api/v1/users", userRouter)







export {app}