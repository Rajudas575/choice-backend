import HomeCategoryService from "../service/HomeCategoryService.js";
import HomeService from "../service/HomeService.js";

class HomeCategoryController {
  async createHomeCategories(req, res) {
    // console.log("homecategories", req.body)
    try {
      const homeCategories = req.body;
      const categories =
        await HomeCategoryService.createCategories(homeCategories);
      const home = await HomeService.createHomePageData(categories);
      return res.status(202).json(home);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getHomeCategory(req, res) {
    try {
      const categories = await HomeCategoryService.getAllHomeCategories();
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async updateHomeCategory(req, res) {
    try {
      const id = req.params.id;
      const homeCategory = req.body;
      const updatedCategory = await HomeCategoryService.updateHomeCategory(
        homeCategory,
        id,
      );
      return res.status(200).json(updatedCategory);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new HomeCategoryController();
