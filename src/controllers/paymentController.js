import PaymentService from "../service/PaymentService.js";
import sellerReportService from "../service/SellerReportService.js";
import SellerService from "../service/SellerService.js";
import TransactionService from "../service/TransactionService.js";

const paymentSuccessHandler = async (req, res) => {
  const { paymentId } = req.params;
  const { paymentLinkId } = req.query;

  try {
    const user = await req.user;

    const paymentOrder =
      await PaymentService.getPaymentOrderByPaymentLinkId(paymentLinkId);

    const paymentSuccess = await PaymentService.proccedPaymentOrder(
      paymentOrder,
      paymentId,
      paymentLinkId,
    );

    if (paymentSuccess) {
      for (let orderId of paymentOrder.orders) {
        const order = await OrderService.findOrderById(orderId);

        await TransactionService.createTransaction(order);

        const seller = await SellerService.getSellerById(order.seller);
        const sellerReport = await sellerReportService.getSellerReport(seller);

        sellerReport.totalOrders += 1;
        sellerReport.totalEarnings += order.totalSellingPrice;
        sellerReport.totalSales += order.orderItems.length;

        const updatedRepor =
          await sellerReportService.updateSellerReport(sellerReport);
      }
      // await Cart.findOneAndUpdate(
      //   { user: user._id },
      //   { cartItems: [] },
      //   { returnDocument: 'after' },
      // );

      return res.status(201).json({
        message: "Payment successful",
      });
    } else {
      return res.status(400).json({
        message: "Payment failed",
      });
    }
  } catch (error) {
    return res.status(500).json({});
  }
};

export default paymentSuccessHandler;
