import { pool } from "../config/db";

type ProductQuery = {
  searchQuery?: string;
  categories?: string[];
  features?: string[];
  materials?: string[];
  licenses?: string;
  minPrice?: number;
  maxPrice?: number;
};

export default class ProductService {
  static async getProductById(productId) {
    try {
      const result = await pool.query(
        'SELECT "Models".*, COALESCE("Users".login, "Users".email) AS username FROM "Models" JOIN "Users" ON "Models".uploader_id = "Users".user_id WHERE "Models".model_id = $1;',
        [productId]
      );
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }
  static async getProductIds() {
    const result = await pool.query('SELECT model_id FROM "Models";');
    return result.rows.map((row) => row.model_id);
  }
  static async getProductIdsByQuery(query: ProductQuery) {
    const values: any[] = [];
    const conditions: string[] = [];

    if (query.searchQuery) {
      values.push(`%${query.searchQuery}%`);
      conditions.push(`"Models".name ILIKE $${values.length}`);
    }

    if (query.categories?.length) {
      values.push(query.categories);
      conditions.push(`"Models".category = ANY($${values.length})`);
    }

    if (query.features?.length) {
      values.push(query.features);
      conditions.push(`"Models".features && $${values.length}::text[]`);
    }

    if (query.materials?.length) {
      values.push(query.materials);
      conditions.push(`"Models".materials && $${values.length}::text[]`);
    }

    if (query.licenses) {
      values.push(query.licenses);
      conditions.push(`"Models".license = $${values.length}`);
    }

    if (query.minPrice !== undefined && query.minPrice > 0) {
      values.push(query.minPrice);
      conditions.push(`"Models".price >= $${values.length}`);
    }

    if (query.maxPrice !== undefined && query.maxPrice > 0) {
      values.push(query.maxPrice);
      conditions.push(`"Models".price <= $${values.length}`);
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

    const sql = `
    SELECT "Models".model_id
    FROM "Models"
    ${whereClause};
  `;

    try {
      const result = await pool.query(sql, values);
      return result.rows.map((row) => row.model_id);
    } catch (err) {
      throw err;
    }
  }
  static async getPopularProductNames() {
    try {
      const result = await pool.query(
        'SELECT name FROM "Models" ORDER BY rating DESC LIMIT 5;'
      );
      return result.rows;
    } catch (err) {
      throw err;
    }
  }
  static async getInitialPrice() {
    try {
      const result = await pool.query(
        'SELECT MIN(price), MAX(price) FROM "Models"'
      );
      const minPrice = result.rows[0].min;
      const maxPrice = result.rows[0].max;
      if (minPrice && maxPrice) {
        return [minPrice, maxPrice];
      } else if (maxPrice) {
        return maxPrice;
      } else {
        return 0;
      }
    } catch (err) {
      console.log(err);
    }
  }
}
