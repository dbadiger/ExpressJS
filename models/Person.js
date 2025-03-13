import mongoose from "mongoose";

const personSchema =new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    age:{type:Number, required:true},
    order:{type:{Object},default:{}}
},{timestamps:true, minimize:false})

export const Person = mongoose.model("Person", personSchema)