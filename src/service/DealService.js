import Deal from "../models/Deals.js";
import HomeCategory from "../models/HomeCategory.js";

class DealService {
  async getDeals() {
    return await Deal.find().populate({ path: "category" });
  }

  async createDeals(deal) {
    try {
      const category = await HomeCategory.findById(deal.categoryId);

      const newDeal = new Deal({
        ...deal,
        category: category,
      });
      const savedDeal = await newDeal.save();
      return await Deal.findById(savedDeal._id).populate({ path: "category" });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateDeal(deal, id) {
    const existingDeal = await HomeCategory.findById(id).populate({
      path: "category",
    });

    if (existingDeal) {
      return await Deal.findByIdAndUpdate(
        existingDeal._id,
        { discount: deal.discount },
        { new: true },
      );
    }
    throw new Error("Deal not found");
  }

  async deleteDeal(id) {
    const deal = await Deal.findById(id);
    if (!deal) {
      throw new Error("Deal not found");
    }
    await Deal.deleteOne({ _id: id });
  }
}
export default new DealService();
