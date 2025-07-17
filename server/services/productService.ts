import { pool } from "../config/db";

export default class ProductService {
  static async getProductById(productId) {
    try {
      const result = await pool.query(
        'SELECT * FROM "Models" WHERE model_id = $1',
        [productId]
      );
      return result.rows[0];
    } catch (err) {
      return err;
    }
  }
}
