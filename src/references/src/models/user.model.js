import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({

    username: {
        type : String,
        required : true, 
        unique : true,
        lowercase : true,
        trim : true,
        index : true, //searchable and optimzed it's used for searching field. (optimuzed way for searching)

    },
    email: {
        type : String,
        required : true, 
        unique : true,
        lowercase : true,
        trim : true,
        

    },
    fullName: {
        type : String,
        required : true, 
        trim : true,
        index : true,

    },
    avatar : {
        type : String, // cloudinary url
        required : true,

    },
    coverImage : {
        type : String, // cloudinary url
        
    },
    watchHistory : {
        type : Schema.Types.ObjectId,
        ref : "Video"
    },
    password : {
        type : String,
        required : [true, "Password is required."],

    },
    refreshToken : {
        type : String,
        
    }


}, {timestamps : true})


userSchema.pre("save", async function(next){ //next to call flag to pass it to next function

    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next() // otherwise it will change pwd every time. Not only the first time

}) // dont use anonymous function here

userSchema.methods.isPasswordCorrect = async function(password){
    //logic how the password is checked
    return await bcrypt.compare(password, this.password)

}
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            username : this.username,
            email : this.email,
            fullName : this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : process.env.ACCESS_TOKEN_EXPIRY}
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            username : this.username,
            email : this.email,
            fullName : this.fullName,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn : process.env.REFRESH_TOKEN_EXPIRY}
    )
}


export const User = mongoose.model("User",userSchema)