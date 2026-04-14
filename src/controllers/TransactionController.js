import TransactionService from "../service/TransactionService.js";

class TransactionController {
  async getTransactionBySeller(req, res) {
    try {
      const seller = await req.seller;
      console.log("Seller--", seller);
      const transactions = await TransactionService.getTransactionBySellerId(
        seller._id,
      );
      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new TransactionController();
