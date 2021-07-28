import * as dotenv from 'dotenv'

if (process.env.DOTENV) {
  dotenv.config({ path: process.env.DOTENV });
}