import 'dotenv/config';
import express from 'express';
import { connect } from 'mongoose';
import { MONGO_URI } from './consts/db.const.js';
import mainRouter from './consts/router.const.js';

const app = express();

app.use(express.json());

app.use('/api', mainRouter);

connect(MONGO_URI)
.then(() => app.listen(process.env.PORT, process.env.HOST, () => console.log(`The server is listening at http://${process.env.HOST}:${process.env.PORT}.`)))
.catch(error => console.log('Something went wrong while connecting to the database.', { error }));

