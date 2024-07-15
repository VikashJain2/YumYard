import { log } from "console";
import categoryModel from "../models/category.model.js";
import fs from 'fs'

const addCategory = async(req,res)=>{
    let image_filename = `${req.file.filename}`

    const category = new categoryModel({
        menu_name:req.body.menu_name,
        menu_image:image_filename
    })

    try {
        await category.save()
        res.json({success:true,message:"Category Added Successfully"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Something went wrong"})
    }
}

const listCategory = async(req,res)=>{
    try {
        const categories = await categoryModel.find({})
        res.json({success:true,data:categories})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Something went wrong"})
    }
}

const removeCategory = async(req,res)=>{
    try {
        const category = await categoryModel.findById(req.body.id);
        if(!category){
           return res.status(404).json({success:true,message:"Category doesn't exist"})

        }
        fs.unlink(`uploads/${category.menu_image}`, () => {})

        await categoryModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"category Removed Successfully"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Something went wrong"})
    }
}

export {addCategory,listCategory,removeCategory}