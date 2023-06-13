import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../customer/database/sequilize/model/customer.model';
import { customerRouter } from './routes/customer.router';
import { productRouter } from './routes/product.router';
import ProductModel from '../product/database/sequelize/model/product.model';

export const app: Express = express();
app.use(express.json());
app.use('/customer', customerRouter)
app.use('/product', productRouter)

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });
  sequelize.addModels([CustomerModel, ProductModel])
  await sequelize.sync();
}

setupDb();
