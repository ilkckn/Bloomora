import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Product from "../models/Product.js";

export async function getWishList(req, res) {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }

    res.status(StatusCodes.OK).json(user.wishlist);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
}

export async function addToWishList(req, res) {
  const { productId } = req.body;
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: "Product not found" });
    }

    const productInWishList = user.wishlist.find((item) =>
      item.productId.equals(productId)
    );

    if (!productInWishList) {
      user.wishlist.push({
        productId,
        userId,
        name: product.name,
        price: product.price,
        image: product.image,
       
      });
    } else {
      user.wishlist = user.wishlist.filter(
        (item) => !item.productId.equals(productId)
      );
    }

    await user.save();

    res.status(StatusCodes.CREATED).json(user.wishlist);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
}

export async function deleteFromWishlist(req, res) {
  const { productId } = req.body;
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }

    const deletedProduct = user.wishlist.find(
      (item) => item.productId.toString() === productId
    );

    if (!deletedProduct) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" });
    } else {
      user.wishlist = user.wishlist.filter(
        (item) => item.productId.toString() !== productId
      );
    }

    await user.save();

    res.status(StatusCodes.OK).json({ user: user });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
}
