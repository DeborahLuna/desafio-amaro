import express from 'express';
import ProductsController from '../controller/ProductsController';
import ProductsBusiness from '../business/ProductsBusiness';
import ProductsDatabase from '../data/ProductsDatabase';
import IdGenerator from '../services/IdGenerator';
import Authenticator from '../services/Authenticator';

export const productRouter = express.Router();

const productsBusiness = new ProductsBusiness(
    new ProductsDatabase(),
    new IdGenerator(),
    new Authenticator()
)
const productsController = new ProductsController(productsBusiness)

productRouter.get("/:id", productsController.getProductById)
productRouter.get("", productsController.getProductsByName)
productRouter.get("/get/:tag", productsController.getProductsByTag)
productRouter.post("/create", productsController.createProduct)