import Product from "../../src/model/Product";
import ProductTags from "../../src/model/ProductTags";
import Tag from "../../src/model/Tag";
import { productMock1, productMock2, productMock3 } from "./productMock";
import { tagMock1, tagMock2, tagMock3 } from "./tagMock";
import { productTagsMock1, productTagsMock2, productTagsMock3, productTagsMock4, productTagsMock5, productTagsMock6 } from "./ProductTagsMock";

export default class ProductsDatabaseMock {

    insert = async(product: Product): Promise<void> => {}

    insertTag = async(tag: Tag): Promise<void> => {}

    insertProductTags = async(input: ProductTags): Promise<void> => {}

    getProductById = async(id: number): Promise<Product | undefined> => {
        if (id === 1) {
            return productMock1
        } else if (id === 2) {
            return productMock2
        } else if (id === 3) {
            return productMock3
        }
        return undefined
      };

    getProductTags = async(id: number): Promise<ProductTags[] | undefined> => {
        if (id === 1) {
            return [productTagsMock1, productTagsMock2]
        } else if (id === 2) {
            return [productTagsMock3, productTagsMock4]
        } else if (id === 3) {
            return [productTagsMock5, productTagsMock6]
        }
        return undefined
      };

    getTagById = async (id: string): Promise<Tag | undefined> => {
        if (id === "id_mockado1") {
            return tagMock1
        } else if (id === "id_mockado2") {
            return tagMock2
        } else if (id === "id_mockado3") {
            return tagMock3
        }
        return undefined
      };

    getTagByName = async (name: string): Promise<Tag | undefined> => {
        if (name === "Tag 01") {
            return tagMock1
        } else if (name === "Tag 02") {
            return tagMock2
        } else if (name === "Tag 03") {
            return tagMock3
        }
        return undefined
      };

    getProductsByName = async(name: string): Promise<Product | Product[] | undefined> => {
        const products = [productMock1, productMock2, productMock3]
        if (name === "Product 01") {
            return productMock1
        } else if (name === "Product 02") {
            return productMock2
        } else if (name === "Product 03") {
            return productMock3
        } else if (name === "Product") {
            return products
        }
        return undefined
      };

    getProductsByTag = async(tag: string): Promise<Product | Product[] | undefined> => {
        if (tag === "Tag 01") {
            return [productMock1, productMock3]
        } else if (tag === "Tag 02") {
            return [productMock1, productMock2]
        } else if (tag === "Tag 03") {
            return [productMock2, productMock3]
        } 
        return undefined
      };

}