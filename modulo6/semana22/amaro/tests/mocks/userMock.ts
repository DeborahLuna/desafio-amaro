import { UserRole } from "../../src/model/User";
import User from "../../src/model/User";

export const userMock1 = new User(
    "id_mockado1",
    "User 01",
    "user01@teste.com",
    "User@1234",
    UserRole.ADMIN
)


export const userMock2 = new User(
    "id_mockado2",
    "User 02",
    "user01@teste.com",
    "User2@1234",
    UserRole.NORMAL
)

export const userMock3 = new User(
    "id_mockado3",
    "User 03",
    "user03@teste.com",
    "User3@1234",
    UserRole.NORMAL
)