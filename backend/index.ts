import express, { Express } from 'express';
import { router } from './routes/npmRoute';
import cors from 'cors';
import mongoose from 'mongoose';

const app: Express = express();

app.use(express.json());
app.use(cors());

mongoose
    .connect('mongodb+srv://paogribeiro:teste@teste-sprint.ryxvswv.mongodb.net/?retryWrites=true&w=majority&appName=teste-sprint')
    .then(() => console.log('[database]: MongoDB connected'))
    .catch((e) => console.log(e))

app.listen(3000, () => {
    console.log('[server]  Running at 3000');
});

app.use("/", router);