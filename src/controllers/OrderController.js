import PaymentOrder from "../models/PaymentOrder.js";
import CartService from "../service/CartService.js";
import OrderService from "../service/OrderService.js";
import PaymentService from "../service/PaymentService.js";

class OrderController {
  async createOrder(req, res, next) {
    const { shippingAddress } = req.body;
    const { paymentMethod } = req.query;
    // const jwt = req.headers.authorization;

    try {
      const user = await req.user;

      const cart = await CartService.findUserCart(user);
      const orders = await OrderService.createOrder(
        user,
        shippingAddress,
        cart,
      );

      const paymentOrder = await PaymentService.createOrder(user, orders);

      const response = {};

      if (paymentMethod === "RAZORPAY") {
        const payment = await PaymentService.createRazorpayPaymentLink(
          user,
          paymentOrder.amount,
          paymentOrder._id,
        );
        response.payment_link_url = payment.short_url;
        paymentOrder.paymentLinkId = payment._id;

        await PaymentOrder.findByIdAndUpdate(paymentOrder._id, paymentOrder);
      }

      return res.status(200).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error creating order: ${error}` });
    }
  }

  async getOrderById(req, res, next) {
    try {
      const { orderId } = req.params;
      const order = await OrderService.findOrderById(orderId);
      return res.status(200).json(order);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  async getOrderItemById(req, res, next) {
    try {
      const { orderItemId } = req.params;
      const orderItem = await OrderService.findOrderItemById(orderItemId);
      return res.status(200).json(orderItem);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  async getUserOrderHistory(req, res) {
    const user = await req.user;
    try {
      const orderHistory = await OrderService.usersOrderHistory(user._id);
      console.log("order history--", orderHistory);
      return res.status(200).json(orderHistory);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  async getSellersOrders(req, res) {
    try {
      const seller = await req.seller;

      const orders = await OrderService.getSellersOrder(seller._id);
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  async updateOrderStatus(req, res) {
  
    try {
      const { orderId, orderStatus } = req.params;
      // console.log("orderId, orderStatus--", orderId, orderStatus);
      const updatedOrder = await OrderService.updateOrderStatus(
        orderId,
        orderStatus,
      );
      return res.status(200).json(updatedOrder);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  async cancelOrder(req, res, next) {
    try {
      const { orderId } = req.params;
      const userId = req.user._id;
      const canceledOrder = await OrderService.cancelOrder(orderId, userId);
      return res.status(200).json({
        message: "Order Cancelled successfully",
        order: canceledOrder,
      });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  //   async deleteOrder(req, res, next) {
  //     try {
  //       const { orderId } = req.params;
  //       await OrderService.deleteOrder(orderId);
  //       return res.status(200).json({ message: "Order deleted successfully" });
  //     } catch (error) {
  //       return res.status(401).json({ error: error.message });
  //     }
  //   }
}

export default new OrderController();
