import CartItemService from "../service/CartItemService.js";
import CartService from "../service/CartService.js";
import productService from "../service/productService.js";

class CartController {
  async findUserCartHandler(req, res) {
    try {
      const user = await req.user;

      const cart = await CartService.findUserCart(user);

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addItemToCart(req, res) {
    // console.log("Request additemtocart--", req.body.productId);
    try {
      const user = await req.user;

      const product = await productService.findProductById(req.body.productId);
      // console.log("PRODUCT--", product);
      const cartItem = await CartService.addCartItem(
        user,
        product,
        req.body.size,
        req.body.quantity,
      );
      res.status(202).json(cartItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteCartItemHandler(req, res) {
    try {
      const user = await req.user;
      await CartItemService.removeCartItem(user._id, req.params.cartItemId);
      res.status(202).json({ message: "Item removed from cart" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCartItemHandler(req, res) {
    try {
      const cartItemId = req.params.cartItemId;
      const { quantity } = req.body;

      const user = await req.user;
      let updateCartItem;

      if (quantity > 0) {
        updateCartItem = await CartItemService.updateCartItem(
          user._id,
          cartItemId,
          { quantity },
        );
      }
      res.status(202).json(updateCartItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new CartController();
