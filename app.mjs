import express from 'express';
import cookieParser from 'cookie-parser';
import expressLayouts from 'express-ejs-layouts';
import postRouter from './routers/postRouter.mjs';
import userRouter from './routers/userRouter.mjs';

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.set('layout', 'layouts/base');

// set middlewares
app.use(express.json());
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

app.use(postRouter);
app.use(userRouter);


app.listen(8000, () => {
    console.clear();
    console.log('Server is listening on port 8000');
});