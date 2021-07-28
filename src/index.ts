import './config'
import app from './app'

const port = process.env.PORT;

const init = () => {
  app.listen(port, () => {
    console.log(`Hello World! Running on port ${port}`);
  });
}

Promise.resolve(init());