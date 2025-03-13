import mongoose from "mongoose";

export const connectDB = async () => {
    const MONGODB_URI = "mongodb+srv://testbe121:Testbe121@cluster0.3fxys.mongodb.net/express"

    await mongoose.connect(MONGODB_URI).then(() => {
        console.log('Database Connected');
    })
}