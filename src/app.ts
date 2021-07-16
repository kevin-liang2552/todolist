#!/usr/bin/env node
import {database} from './models/index'
import express from 'express';

const app = express();
const port = 8080;

database();

app.listen(port, () => {
  console.log(`Hello World! Running on port ${port}`);
});

app.get('/', (_req, res) => {
    res.send('Well done!');
})
