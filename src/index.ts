import './config'
import app from './app'

const port = process.env.PORT;

const init = () => {
  return app.listen(port, () => {
    console.log(`Hello World! Running on port ${port}`);
  });
}

const server = init();

export default server;