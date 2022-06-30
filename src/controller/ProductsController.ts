import ProductsBusiness from "../business/ProductsBusiness";
import { Request, Response } from "express";
import { ProductInputDTO } from "../types/DTO/productInputDTO";

export default class ProductsController {
    constructor(private productBusiness: ProductsBusiness){}

    public createProduct = async(req: Request, res:Response) => {
        const {id, name, tags} = req.body
        const token = req.headers.authorization as string

        const input: ProductInputDTO = {
            id,
            name,
            tags
        }
        try {
            const product = await this.productBusiness.createProduct(input, token)
            res.status(201).send({message: "Produto cadastrado com sucesso", product})
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro ao cadastrar produto")
        }
    };

    public getProductById = async (req:Request, res:Response) => {
        const id = Number(req.params.id)
        try {
            const product = await this.productBusiness.getProductById(id)
            res.status(200).send(product)
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro ao pesquisar produto.")
        }
    };

    public getProductsByName = async (req:Request, res:Response) => {
        const name = req.query.name as string
        try {
            const products = await this.productBusiness.getProductsByName(name)

            res.status(200).send(products)
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro ao pesquisar produto.")
        }
    };

    public getProductsByTag = async (req:Request, res:Response) => {
        const tag = req.params.tag as string
        try {
            const products = await this.productBusiness.getProductsByTag(tag)

            res.status(200).send(products)
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro ao pesquisar produto.")
        }
    };
}