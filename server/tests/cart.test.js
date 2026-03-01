const request = require('supertest');
const app = require('../index');

describe("Cart Module - Add Item", () => {

  test("Should add item to cart successfully", async () => {
    const response = await request(app)
      .post("/cart/add")
      .send({
        productId: "123",
        quantity: 2
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Item added successfully");
  });

});