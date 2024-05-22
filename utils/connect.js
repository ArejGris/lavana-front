import mongoose from "mongoose";
export async function connectDB(){
    try {
        await mongoose.connect('mongodb://localhost/e-commerce')
        console.log("connected to db")
    } catch (error) {
        console.log("error while connecting",error)
    }
}