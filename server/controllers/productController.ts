import { Request, Response } from "express";
import ProductService from "../services/productService";

export default class ProductController {
  static async getProductById(req, res) {
    try {
      const { productId } = req.params;
      const model = await ProductService.getProductById(productId);
      res.status(200).json({
        model,
      });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}
