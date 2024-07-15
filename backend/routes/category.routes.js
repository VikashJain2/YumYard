import express from 'express'
import { addCategory, listCategory, removeCategory } from '../controllers/category.controllers.js';
import multer from "multer";
const categoryRouter = express.Router();


const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      return cb(null, `${Date.now()}${file.originalname}`);
    },
  });
  const upload = multer({ storage: storage });
categoryRouter.post("/add",upload.single("menu_image"),addCategory)

categoryRouter.get("/list",listCategory)
categoryRouter.post("/remove",removeCategory)

export default categoryRouter;