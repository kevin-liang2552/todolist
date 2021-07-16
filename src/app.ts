#!/usr/bin/env node
import {testingConnection} from './models/database'
import express from 'express';

const app = express();
const port = 8080;

testingConnection();

app.listen(port, () => {
  console.log(`Hello World! Running on port ${port}`);
});

app.get('/', (_req, res) => {
    res.send('Well done!');
})
