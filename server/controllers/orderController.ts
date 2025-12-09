import OrderService from "../services/orderService";

export default class OrderController {
  static async submitOrder(req, res) {
    try {
      const { model_id, customer, date } = req.body;

      if (!model_id || !customer || !date) {
        throw new Error("Fill all fields");
      }

      const result = await OrderService.submitOrder(
        model_id,
        seller_id,
        customer_id,
        price,
        date
      );
      res.status(200).json({
        message: "Order submitted successfully",
        ...req.body,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
