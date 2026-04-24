import Category from "../models/Category.js";
import Product from "../models/Products.js";

export const calculateDiscountPercentage = (mrpPrice, sellingPrice) => {
  if (mrpPrice <= 0) {
    return 0;
    // throw new Error("MRP Price should be greater than zero!");
  }
  const discount = mrpPrice - sellingPrice;
  return Math.round((discount / mrpPrice) * 100);
};

class ProductService {
  async createProduct(req, seller) {
    try {
      const discountPercent = calculateDiscountPercentage(
        req.mrpPrice,
        req.sellingPrice,
      );

      const category1 = await this.createOrGetCategory(req.category, 1);
      const category2 = await this.createOrGetCategory(
        req.category2,
        2,
        category1._id,
      );
      const category3 = await this.createOrGetCategory(
        req.category3,
        2,
        category2._id,
      );

      const product = new Product({
        title: req.title,
        description: req.description,
        images: req.images,
        sellingPrice: req.sellingPrice,
        mrpPrice: req.mrpPrice,
        discountPercent,
        size: req.size,
        color: req.color,
        quantity: req.quantity,
        seller: seller._id,
        category: category3._id,
      });
      return await product.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createOrGetCategory(categoryId, level, parentId = null) {
    let category = await Category.findOne({ categoryId });

    if (!category) {
      category = new Category({
        categoryId,
        level,
        parentCategory: parentId,
      });
      category = await category.save();
    }
    return category;
  }

  async deleteProduct(productId) {
    try {
      await Product.findByIdAndDelete(productId);
      return "Product deleted successfully";
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProduct(productId, updatedProductData) {
    try {
      const product = await Product.findByIdAndUpdate(
        productId,
        updatedProductData,
        { new: true },
      );
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findProductById(productId) {
    try {
      // console.log("Product id", productId);
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error("Product not found!");
      }
      // console.log("Product--", product);
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async searchProduct(query) {
    try {
      const products = await Product.find({ title: new RegExp(query, "i") });
      return products;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProductsBySeller(sellerId) {
    return await Product.find({ seller: sellerId });
  }

  // async getAllProducts(req) {
  //   const filterQuery = {};

  //   if (req.category) {
  //     const category = await Category.findOne({ categoryId: req.category });

  //     if (!category) {
  //       return {
  //         content: [],
  //         totalpages: 0,
  //         totalElement: 0,
  //       };
  //     }

  //     filterQuery.category = category._id;
  //   }

  //   if (req.color) {
  //     filterQuery.color = req.color;
  //   }

  //   if (req.minPrice && req.maxPrice) {
  //     filterQuery.sellingPrice = {
  //       $gte: Number(req.minPrice),
  //       $lte: Number(req.maxPrice),
  //     };
  //   }

  //   if (req.minDiscount) {
  //     filterQuery.discountPercent = { $gte: Number(req.minDiscount) };
  //   }

  //   if (req.size) {
  //     filterQuery.size = req.size;
  //   }

  //   let sortQuery = { createdAt: -1 };

  //   if (req.sort === "price_low") {
  //     sortQuery = { sellingPrice: 1 };
  //   } else if (req.sort === "price_high") {
  //     sortQuery = { sellingPrice: -1 };
  //   }

  //   const page = Number(req.pageNumber) || 0;

  //   const products = await Product.find(filterQuery)
  //     .sort(sortQuery)
  //     .skip(page * 10)
  //     .limit(10);

  //   const totalElement = await Product.countDocuments(filterQuery);

  //   const totalpages = Math.ceil(totalElement / 10);
  //   const res={
  //     content: products,
  //     totalpages,
  //     totalElement,
  //   };

  //   return res
  // }

  async getAllProducts(req) {
    const filterQuery = {};
    if (req.category) {
      const category = await Category.findOne({ categoryId: req.category });

      if (!category) {
        return {
          content: [],
          totalPages: 0,
          totalElements: 0,
        };
      }
      filterQuery.category = category._id.toString();
    }
    if (req.color) {
      filterQuery.color = req.color;
    }
    if (req.size) {
      filterQuery.size = req.size;
    }
    if (req.minPrice) {
      filterQuery.sellingPrice = { $gte: req.minPrice };
    }
    if (req.maxPrice) {
      filterQuery.sellingPrice = {
        ...filterQuery.sellingPrice,
        $lte: req.maxPrice,
      };
    }
    if (req.minDiscount) {
      filterQuery.discountPercent = { $gte: req.minDiscount };
    }
    if (req.stock) {
      filterQuery.stock = req.stock;
    }

    let sortQuery = {};
    if (req.sort === "price_low") {
      sortQuery.sellingPrice = 1;
    } else if (req.sort === "price_high") {
      sortQuery.sellingPrice = -1;
    }

    const products = await Product.find(filterQuery)
      .sort(sortQuery)
      .skip(req.pageNumber * 10)
      .limit(10);

    const page = parseInt(req.pageNumber) || 0;
    const pageSize = parseInt(req.pageSize) || 10;

    // Count the total number of products matching the filter query
    const totalElements = await Product.countDocuments(filterQuery);

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalElements / pageSize);

    const res = {
      content: products,
      totalPages,
      totalElements,
    };

    return res;
  }
}

export default new ProductService();
