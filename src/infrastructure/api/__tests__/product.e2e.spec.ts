import { app, sequelize } from '../express';
import request from 'supertest';

describe('E2E test for Product', () => {

  beforeEach(async () => {
    await sequelize.sync({ force: true});
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const response = await request(app)
          .post("/product")
          .send({
            name: 'Notebook',
            price: 1000.50,
          });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Notebook');
    expect(response.body.price).toBe(1000.50);
  });

  it('should not create a product', async () => {
    const response = await request(app)
          .post("/product")
          .send({
            name: 'Carregador usb-c',
          });

    expect(response.status).toBe(500);
  });

  it('should list product', async () => {
    const response1 = await request(app)
    .post("/product")
    .send({
      name: 'Notebook',
      price: 1000.50,
    });

    expect(response1.status).toBe(200);

    const response2 = await request(app)
    .post("/product")
    .send({
      name: 'Carregador usb-c',
      price: 59.99,
    });

    expect(response2.status).toBe(200);

    const listResponse = await request(app)
          .get("/product")
          .send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    
    const product1 = listResponse.body.products[0];
    expect(product1.name).toBe('Notebook');
    expect(product1.price).toBe(1000.50);
 
    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe('Carregador usb-c');
    expect(product2.price).toBe(59.99);
  });

});