import express from 'express'
import { categoryController,categoryFind } from "../controllers/categories.controller";

const categoryRouter=express.Router()
categoryRouter.post("/", categoryController);

categoryRouter.get("/", categoryFind);

export default categoryRouter
