// import { Router } from 'express';
// import handler from 'express-async-handler';
// import auth from '../middleware/auth.mid.js';
// import { BAD_REQUEST } from '../constants/httpStatus.js';
// import { OrderModel } from '../models/order.model.js';
// import { OrderStatus } from '../constants/orderStatus.js';
// import { UserModel } from '../models/user.model.js';
// import { sendEmailReceipt } from '../helpers/mail.helper.js';

// const router = Router();
// router.use(auth);

// router.post(
//   '/create',
//   handler(async (req, res) => {
//     const order = req.body;

//     if (order.items.length <= 0) res.status(BAD_REQUEST).send('Cart Is Empty!');

//     await OrderModel.deleteOne({
//       user: req.user.id,
//       status: OrderStatus.NEW,
//     });

//     const newOrder = new OrderModel({ ...order, user: req.user.id });
//     await newOrder.save();
//     res.send(newOrder);
//   })
// );

// router.put(
//   '/pay',
//   handler(async (req, res) => {
//     const { paymentId } = req.body;
//     const order = await getNewOrderForCurrentUser(req);
//     if (!order) {
//       res.status(BAD_REQUEST).send('Order Not Found!');
//       return;
//     }

//     order.paymentId = paymentId;
//     order.status = OrderStatus.PAYED;
//     await order.save();

//     sendEmailReceipt(order);

//     res.send(order._id);
//   })
// );

// router.get(
//   '/track/:orderId',
//   handler(async (req, res) => {
//     const { orderId } = req.params;
//     const user = await UserModel.findById(req.user.id);

//     const filter = {
//       _id: orderId,
//     };

//     if (!user.isAdmin) {
//       filter.user = user._id;
//     }

//     const order = await OrderModel.findOne(filter);

//     if (!order) return res.send(UNAUTHORIZED);

//     return res.send(order);
//   })
// );

// router.get(
//   '/newOrderForCurrentUser',
//   handler(async (req, res) => {
//     const order = await getNewOrderForCurrentUser(req);
//     if (order) res.send(order);
//     else res.status(BAD_REQUEST).send();
//   })
// );

// router.get('/allstatus', (req, res) => {
//   const allStatus = Object.values(OrderStatus);
//   res.send(allStatus);
// });

// router.get(
//   '/:status?',
//   handler(async (req, res) => {
//     const status = req.params.status;
//     const user = await UserModel.findById(req.user.id);
//     const filter = {};

//     if (!user.isAdmin) filter.user = user._id;
//     if (status) filter.status = status;

//     const orders = await OrderModel.find(filter).sort('-createdAt');
//     res.send(orders);
//   })
// );

// const getNewOrderForCurrentUser = async req =>
//   await OrderModel.findOne({
//     user: req.user.id,
//     status: OrderStatus.NEW,
//   }).populate('user');
// export default router;





import { Router } from 'express';
import handler from 'express-async-handler';
import auth from '../middleware/auth.mid.js';
import { BAD_REQUEST, UNAUTHORIZED } from '../constants/httpStatus.js';
import { OrderModel } from '../models/order.model.js';
import { OrderStatus } from '../constants/orderStatus.js';
import { UserModel } from '../models/user.model.js';
import { sendEmailReceipt } from '../helpers/mail.helper.js';

const router = Router();
router.use(auth);

// 📌 إنشاء طلب جديد
router.post(
  '/create',
  handler(async (req, res) => {
    const order = req.body;

    // Check if the cart is empty
    if (!order.items || order.items.length === 0) {
      return res.status(BAD_REQUEST).json({ message: 'Cart is empty!' });
    }

    // Delete any existing order with status 'NEW' for the current user
    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });

    // Create a new order
    const newOrder = new OrderModel({ ...order, user: req.user.id });
    await newOrder.save();
    res.json(newOrder);
  })
);

// 📌 دفع الطلب
router.put(
  '/pay',
  handler(async (req, res) => {
    const { paymentId } = req.body;
    const order = await getNewOrderForCurrentUser(req);

    if (!order) {
      return res.status(BAD_REQUEST).json({ message: 'Order not found!' });
    }

    // Update the order status to 'PAYED'
    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    // Send an email receipt
    sendEmailReceipt(order);

    res.json({ orderId: order._id });
  })
);

// 📌 تتبع الطلب
router.get(
  '/track/:orderId',
  handler(async (req, res) => {
    if (!req.user || !req.user.id) {
      return res.status(UNAUTHORIZED).json({ message: 'Unauthorized! Please log in.' });
    }

    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(UNAUTHORIZED).json({ message: 'User not found!' });
    }

    const filter = { _id: req.params.orderId };
    if (!user.isAdmin) {
      filter.user = user._id;
    }

    const order = await OrderModel.findOne(filter);
    if (!order) {
      return res.status(UNAUTHORIZED).json({ message: 'Order not found or unauthorized!' });
    }

    res.json(order);
  })
);

// 📌 الحصول على الطلب الجديد للمستخدم الحالي
router.get(
  '/newOrderForCurrentUser',
  handler(async (req, res) => {
    const order = await getNewOrderForCurrentUser(req);
    if (order) {
      res.json(order);
    } else {
      res.status(BAD_REQUEST).json({ message: 'No new orders found!' });
    }
  })
);

// 📌 الحصول على جميع الحالات
router.get('/allstatus', (req, res) => {
  const allStatus = Object.values(OrderStatus);
  res.json(allStatus);
});

// 📌 الحصول على جميع الطلبات مع الفلترة بالحالة
router.get(
  '/:status?',
  handler(async (req, res) => {
    if (!req.user || !req.user.id) {
      return res.status(UNAUTHORIZED).json({ message: 'Unauthorized! Please log in.' });
    }

    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(UNAUTHORIZED).json({ message: 'User not found!' });
    }

    const filter = {};
    if (!user.isAdmin) {
      filter.user = user._id;
    }

    if (req.params.status) {
      filter.status = req.params.status;
    }

    const orders = await OrderModel.find(filter).sort('-createdAt');
    res.json(orders);
  })
);

// 📌 دالة مساعدة لجلب الطلب الجديد للمستخدم الحالي
const getNewOrderForCurrentUser = async (req) =>
  await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW }).populate('user');

export default router;
