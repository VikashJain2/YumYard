import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    menu_name:{
        type:String,
        required:true
    },

    menu_image:{
        type:String,
        required:true
    }
})

const categoryModel = mongoose.model("category",categorySchema)
export default categoryModel