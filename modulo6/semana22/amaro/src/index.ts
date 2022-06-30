import { app } from './controller/app';
import { userRouter } from './router/userRouter'
import { productRouter } from './router/productRouter';

app.use("/users", userRouter);

app.use("/product", productRouter);