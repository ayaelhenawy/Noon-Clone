import mongoose from "mongoose";
export function  dbconnection(){
    mongoose.connect('mongodb://127.0.0.1:27017/E-Commerce').then(()=>{
    console.log('Database Connected');
})} 