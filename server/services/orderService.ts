import { pool } from "../config/db";

export default class OrderService {
  static async submitOrder(
    model_id: string,
    seller_id: string,
    customer_id: string,
    price: string,
    date: string
  ) {
    try {
      const result = await pool.query(`
        INSERT INTO 'Orders'
        (model_id,
        seller_id,
        customer_id,
        price,
        date)
        VALUES ($1, $2, $3, $4, $5)`);
    } catch (err) {
      return err;
    }
  }
}
