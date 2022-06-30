import  express  from 'express';
import Authenticator from '../services/Authenticator';
import IdGenerator from '../services/IdGenerator';
import UserBusiness from '../business/UserBusiness';
import UserDatabase from '../data/UserDatabase';
import HashManager from '../services/HashManager';
import UserController from '../controller/UserController';

export const userRouter = express.Router();

const userBusiness = new UserBusiness(
    new UserDatabase(),
    new IdGenerator(),
    new Authenticator(),
    new HashManager()
)

const userController = new UserController(userBusiness)

userRouter.post("/signup", userController.signUp)
userRouter.post("/login", userController.login)
