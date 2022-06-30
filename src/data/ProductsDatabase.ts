import { BaseDatabase } from "./BaseDatabase";
import Product from "../model/Product";
import ProductTags from "../model/ProductTags";
import Tag from "../model/Tag";

export default class ProductsDatabase extends BaseDatabase {
    protected TABLE_NAME = "AMARO_PRODUCTS"
    protected TABLE_TAG = "AMARO_TAG"
    protected TABLE_TAGS = "AMARO_PRODUCT_TAGS"

    insert = async(product: Product) => {
        try {
            await this
            .connection(this.TABLE_NAME)
            .insert(product)

        } catch (error) {
            throw new Error("Erro do banco.")
        }
    }

    insertTag = async(tag: Tag) => {
        try {
            await this
            .connection(this.TABLE_TAG)
            .insert(tag)

        } catch (error) {
            throw new Error("Erro do banco.")
        }
    }

    insertProductTags = async(input: ProductTags) => {
        try {
            await this
            .connection(this.TABLE_TAGS)
            .insert(input)

        } catch (error) {
            throw new Error("Erro do banco.")
        }
    }

    getProductById = async(id: number) => {
        try {
            const queryResult = await this
            .connection(this.TABLE_NAME)
            .select("*")
            .where({id})
            return queryResult[0]
        } catch (error) {
            throw new Error("Erro ao buscar produto no banco.")
        }
    };

    getProductTags = async(id: number) => {
        try {
            const queryResult = await this
            .connection(this.TABLE_TAGS)
            .select("*")
            .where({product_id: id})
            return queryResult
        } catch (error) {
            throw new Error("Erro ao buscar tags no banco.")
        }
    };

    getTagById = async (id: string) => {
        try {
            const queryResult = await this
            .connection(this.TABLE_TAG)
            .select("name")
            .where({id})
            return queryResult[0]
        } catch (error) {
            throw new Error("Erro ao buscar produto no banco.")
        }
    };

    getTagByName = async (name: string) => {
        try {
            const queryResult = await this
            .connection(this.TABLE_TAG)
            .select("*")
            .where({name})
            return queryResult[0]
        } catch (error) {
            throw new Error("Erro ao buscar produto no banco.")
        }
    };

    getProductsByName = async(name: string) => {

        try {
            const queryResult = await this
            .connection(this.TABLE_NAME)
            .select("*")
            .where("name", "like", `%${name}%`)
            return queryResult
        } catch (error) {
            throw new Error("Erro ao buscar produto no banco.")
        }
    };

    getProductsIdsByTag = async(tag: string) => {
        try {
            const [tagId] = await this
            .connection(this.TABLE_TAG)
            .select("*")
            .where({name: tag})

            const result = await this
            .connection(this.TABLE_TAGS)
            .select("*")
            .where({tag_id: tagId.id})

            return result
        } catch (error) {
            throw new Error("Erro ao buscar produto no banco.")
        }
    };
};