import Order from "../Models/Orders.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { products, totalPrice } = req.body;

    const order = await Order.create({ userId, products, totalPrice });
    return res.status(200).json({ order, message: "Order Successful" });
  } catch (err) {
    console.log(err.message);
    return res.status(200).json({ message: "Internal Server Error" });
  }
};

export const getUserOrder = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId });
    res.status(200).json(orders);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
