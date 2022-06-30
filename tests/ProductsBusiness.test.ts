import ProductsBusiness from "../src/business/ProductsBusiness";
import { AuthenticatorMock } from "./mocks/AuthenticatorMock";
import { IdGeneratorMock } from "./mocks/idGeneratorMock";
import ProductsDatabaseMock from "./mocks/ProductsDatabaseMock";
import { ProductInputDTO } from "../src/types/DTO/productInputDTO";
import { CustomError } from "../src/errors/CustomError";
import { productMock1, productMock2, productMock3 } from "./mocks/productMock";

const productsBusinessMock = new ProductsBusiness(
    new ProductsDatabaseMock() as any,
    new IdGeneratorMock(),
    new AuthenticatorMock()
)

describe("Teste de criação de produto", ()=>{
    test("Erro que deve retornar quando o nome está vazio", async () => {
        expect.assertions
        try {
           const input1: ProductInputDTO = {
               id: 5,
               name: "",
               tags: ["Teste 01", "Teste 02", "Teste 03"]
           }
            await productsBusinessMock.createProduct(input1, "token_mockado")
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Favor preencher todos os campos.")
                expect(error.statusCode).toEqual(422)
            } else {
                console.log(error)
            }
        }
    });
    test("Erro que deve retornar quando pelo menos uma tag não for passada", async () => {
        expect.assertions
        try {
           const input2: ProductInputDTO = {
               id: 4,
               name: "Vestido",
               tags: []
           }
            await productsBusinessMock.createProduct(input2, "token_mockado")
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Favor preencher todos os campos.")
                expect(error.statusCode).toEqual(422)
            } else {
                console.log(error)
            }
        }
    });
    test("Sucesso no cadastro", async () => {
        expect.assertions
        try {
           const input3: ProductInputDTO = {
           id: 4,
           name: "Produto",
           tags: ["teste 1", "teste 2"]
       }

       await productsBusinessMock.createProduct(input3, "token_mockado")

        } catch (error) {
            console.log(error)
        }
    })
});

describe("Teste de buscar produto pelo id", ()=> {
    test("Erro que deve retornar quando o id não for passado", async () => {
        expect.assertions
        try {
            const id = Number("")
            await productsBusinessMock.getProductById(id)
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Favor informar o id do produto.")
                expect(error.statusCode).toEqual(422)
            } else {
                console.log(error)
            }
        }
    });
    test("Erro que deve retornar quando o produto não estiver cadastrado", async () => {
        expect.assertions
        try {
            const id = 7
            await productsBusinessMock.getProductById(id)
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Id não cadastrado.")
                expect(error.statusCode).toEqual(422)
            } else {
                console.log(error)
            }
        }
    });
    test("Sucesso na busca, listagem do produto", async () => {
        expect.assertions;
        try {
        const product = await productsBusinessMock.getProductById(1);
      
        expect(product).toBeTruthy();
        expect(product).toContain([productMock1]);
    } catch (error) {}
    })
    
});

describe("Teste de buscar produto pelo nome", ()=> {
    test("Erro que deve retornar quando o nome não for passado", async () => {
        expect.assertions
        try {
            await productsBusinessMock.getProductsByName("")
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Favor informar o nome do produto.")
                expect(error.statusCode).toEqual(422)
            } else {
                console.log(error)
            }
        }
    });
    test("Erro que deve retornar quando nenhum produto for encontrado", async () => {
        expect.assertions
        try {
            await productsBusinessMock.getProductsByName("Teste")
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Não foram encontrados produtos com esse nome.")
                expect(error.statusCode).toEqual(422)
            } else {
                console.log(error)
            }
        }
    });
    test("Sucesso na busca, listagem do(s) produto(s)", async () => {
        expect.assertions;
        try {
        const product = await productsBusinessMock.getProductsByName("Produto");
      
        expect(product).toBeTruthy();
        expect(product).toContain([productMock1, productMock2, productMock3]);
    } catch (error) {}
    })
});

describe("Teste de buscar produto por tag", ()=> {
    test("Erro que deve retornar quando a tag não for passada", async () => {
        expect.assertions
        try {
            await productsBusinessMock.getProductsByTag("")
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Favor informar uma tag.")
                expect(error.statusCode).toEqual(422)
            } else {
                console.log(error)
            }
        }
    });
    test("Erro que deve retornar quando nenhum produto for encontrado", async () => {
        expect.assertions
        try {
            await productsBusinessMock.getProductsByTag("Teste")
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Não foram encontrados produtos com essa tag.")
                expect(error.statusCode).toEqual(422)
            } else {
                console.log(error)
            }
        }
    });
    test("Sucesso na busca, listagem do(s) produto(s)", async () => {
        expect.assertions;
        try {
        const product = await productsBusinessMock.getProductsByTag("Tag 01");
      
        expect(product).toBeTruthy();
        expect(product).toContain([productMock1, productMock3]);
    } catch (error) {}
    });
});