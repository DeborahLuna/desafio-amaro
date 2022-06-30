import ProductsDatabase from "../data/ProductsDatabase";
import IdGenerator from "../services/IdGenerator";
import Authenticator from "../services/Authenticator";
import Product from "../model/Product";
import { ProductInputDTO } from "../types/DTO/productInputDTO";
import Tag from "../model/Tag";
import ProductTags from "../model/ProductTags";
import { CustomError } from "../errors/CustomError";

export default class ProductsBusiness {

  constructor(
    private productsDatabase: ProductsDatabase,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator
 ) { }

  createProduct = async (input: ProductInputDTO, token: string) => {
    try {
         
      const {id, name, tags} = input
      if(!id || !name || tags.length<1){
        throw new CustomError(422, "Favor preencher todos os campos.")
    }
    
    const tokenData = this.authenticator.getTokenData(token);


    if (!tokenData) {
      throw new CustomError(422, "Token inválido ou não passado.");
    }

    if (tokenData.role !== "admin") {
      throw new CustomError(403, "Usuário não autorizado.");
    }
    
    const newProduct: Product = {
      id: Number(input.id),
      name: input.name
    }
    await this.productsDatabase.insert(newProduct)
    

    for(let tag of input.tags){

      const tagVerify = await this.productsDatabase.getTagByName(tag)

      if(tagVerify){
      const productTagsId = this.idGenerator.generateId()

      const productTags: ProductTags = {
        id: productTagsId,
        product_id: input.id,
        tag_id: tagVerify.id
      }
  
      await this.productsDatabase.insertProductTags(productTags);
      } else {
        const tagId = this.idGenerator.generateId();

        const productTag: Tag = 
        {id: tagId,
        name: tag}
  
        await this.productsDatabase.insertTag(productTag);
      
  
        const productTagsId = this.idGenerator.generateId()
  
        const productTags: ProductTags = {
          id: productTagsId,
          product_id: input.id,
          tag_id: tagId
        }
    
        await this.productsDatabase.insertProductTags(productTags);
      }

    }

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  };

  getProductById = async (id: number) => {
    try {
      if(!id){
        throw new CustomError(422, "Favor informar o id do produto.")
      }
  
      const product = await this.productsDatabase.getProductById(id)

      if(!product){
        throw new CustomError(422, "Id não cadastrado.")
      }

      const productTags = await this.productsDatabase.getProductTags(id)

      const tags = []
      
      for(let tag of productTags){
        const tagName = await this.productsDatabase.getTagById(tag.tag_id);
        tags.push(tagName.name)
      }

      const fullProduct = {
        id: product.id,
        name: product.name,
        tags: tags
      }

      return fullProduct

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  };

  getProductsByName = async (name: string) => {
    try {
      if(!name){
        throw new CustomError(422, "Favor informar o nome do produto.")
      }
  
      const products = await this.productsDatabase.getProductsByName(name)

      if(!products){
        throw new CustomError(422, "Não foram encontrados produtos com esse nome.")
      }

      const fullProducts = []

      for(let product of products){
        const productTags = await this.productsDatabase.getProductTags(product.id)

        const tags = []
  
        for(let tag of productTags){
          const tagName = await this.productsDatabase.getTagById(tag.tag_id);
          tags.push(tagName.name)
        }
  
        const fullProduct = {
          id: product.id,
          name: product.name,
          tags: tags
        }
  
        fullProducts.push(fullProduct)

      }

      return fullProducts


    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  };

  getProductsByTag = async (tag: string) => {
    try {
      if(!tag){
        throw new CustomError(422, "Favor informar uma tag.")
      }
  
      const productsIds = await this.productsDatabase.getProductsByTag(tag)

      if(!productsIds){
        throw new CustomError(422, "Não foram encontrados produtos com essa tag.")
      }

      const fullProducts = []

      for(let productId of productsIds){
        const product = await this.productsDatabase.getProductById(productId.product_id);
        const productTags = await this.productsDatabase.getProductTags(productId.product_id)

        const tags = []
  
        for(let tag of productTags){
          const tagName = await this.productsDatabase.getTagById(tag.tag_id);
          tags.push(tagName.name)
        }
  
        const fullProduct = {
          ...product,
          tags: tags
        }
  
        fullProducts.push(fullProduct)

      }

      return fullProducts


    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  };

};