import productService from "../service/productService.js";

class SellerProductController {
  async getProductsBySellerId(req, res) {
    try {
      const seller = await req.seller;

      const products = await productService.getProductsBySeller(seller._id);
      return res.status(200).json(products);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async createProduct(req, res) {
    try {
      //   await createProductSchema.validate(req.body, { abortEarly: false });
      const seller = await req.seller;
      const product = await productService.createProduct(req.body, seller);
      return res.status(201).json(product);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      await productService.deleteProduct(req.params.productId);
      return res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const product = await productService.updateProduct(
        req.params.productId,
        req.body,
      );
      return res.status(200).json(product);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const product = await productService.findProductById(
        req.params.productId,
      );
      return res.status(200).json(product);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async searchProduct(req, res) {
    try {
      const query = req.query.q;
      const products = await productService.searchProduct(query);
      return res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = await productService.getAllProducts(req.query);
      return res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new SellerProductController();
