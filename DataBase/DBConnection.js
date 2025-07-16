import mongoose from "mongoose";
export function  dbconnection(){
    mongoose.connect('mongodb://localhost:27017/E-Commerce').then(()=>{
    console.log('Database Connected');
})} 