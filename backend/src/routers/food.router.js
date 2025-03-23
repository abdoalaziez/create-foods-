import { Router } from 'express';
import { FoodModel } from '../models/food.model.js';
import handler from 'express-async-handler';
import admin from '../middleware/admin.mid.js';
// import { sample_foods, sample_tags } from '../data.js';

const router = Router();

router.get(
  '/',
  handler(async (req, res) => {
    const foods = await FoodModel.find({});
    res.send(foods);
  })
);

router.post(
  '/',
  admin,
  handler(async (req, res) => {
    const { name, price, tags, favorite, imageUrl, origins, cookTime } =
      req.body;

    const food = new FoodModel({
      name,
      price,
      tags: tags.split ? tags.split(',') : tags,
      favorite,
      imageUrl,
      origins: origins.split ? origins.split(',') : origins,
      cookTime,
    });

    await food.save();

    res.send(food);
  })
);

router.put(
  '/',
  admin,
  handler(async (req, res) => {
    const { id, name, price, tags, favorite, imageUrl, origins, cookTime } =
      req.body;

    await FoodModel.updateOne(
      { _id: id },
      {
        name,
        price,
        tags: tags.split ? tags.split(',') : tags,
        favorite,
        imageUrl,
        origins: origins.split ? origins.split(',') : origins,
        cookTime,
      }
    );

    res.send();
  })
);

router.delete(
  '/:foodId',
  admin,
  handler(async (req, res) => {
    const { foodId } = req.params;
    await FoodModel.deleteOne({ _id: foodId });
    res.send();
  })
);

router.get(
  '/tags',
  handler(async (req, res) => {
    const tags = await FoodModel.aggregate([
      {
        $unwind: '$tags',
      },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: '$count',
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: 'All',
      count: await FoodModel.countDocuments(),
    };

    tags.unshift(all);

    res.send(tags);
  })
);

router.get(
  '/search/:searchTerm',
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, 'i');

    const foods = await FoodModel.find({ name: { $regex: searchRegex } });
    res.send(foods);
  })
);

router.get(
  '/tag/:tag',
  handler(async (req, res) => {
    const { tag } = req.params;
    const foods = await FoodModel.find({ tags: tag });
    res.send(foods);
  })
);

router.get(
  '/:foodId',
  handler(async (req, res) => {
    const { foodId } = req.params;
    const food = await FoodModel.findById(foodId);
    res.send(food);
  })
);

export default router;









// import { Router } from 'express';
// import { FoodModel } from '../models/food.model.js';
// import handler from 'express-async-handler';
// import admin from '../middleware/admin.mid.js';
// import { body, validationResult } from 'express-validator';

// const router = Router();

// // الحصول على جميع الأطعمة
// router.get(
//   '/',
//   handler(async (req, res) => {
//     const foods = await FoodModel.find({});
//     res.status(200).send(foods);
//   })
// );

// // إضافة طعام جديد
// router.post(
//   '/',
//   admin,
//   [
//     body('name').notEmpty().withMessage('Name is required'),
//     body('price').isNumeric().withMessage('Price must be a number'),
//     body('imageUrl').notEmpty().withMessage('Image URL is required'),
//     body('origins').notEmpty().withMessage('Origins are required'),
//     body('tags').optional().isArray().withMessage('Tags must be an array'),
//     body('cookTime').optional().isString().withMessage('Cook time must be a string'),
//   ],
//   handler(async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { name, price, tags, favorite, imageUrl, origins, cookTime } = req.body;

//     const food = new FoodModel({
//       name,
//       price,
//       tags: tags.split ? tags.split(',') : tags,
//       favorite,
//       imageUrl,
//       origins: origins.split ? origins.split(',') : origins,
//       cookTime,
//     });

//     await food.save();
//     res.status(201).send(food);
//   })
// );

// // تحديث طعام
// router.put(
//   '/',
//   admin,
//   [
//     body('id').notEmpty().withMessage('Food ID is required'),
//     body('name').optional().notEmpty().withMessage('Name is required'),
//     body('price').optional().isNumeric().withMessage('Price must be a number'),
//     body('imageUrl').optional().notEmpty().withMessage('Image URL is required'),
//     body('origins').optional().notEmpty().withMessage('Origins are required'),
//     body('tags').optional().isArray().withMessage('Tags must be an array'),
//     body('cookTime').optional().isString().withMessage('Cook time must be a string'),
//   ],
//   handler(async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { id, name, price, tags, favorite, imageUrl, origins, cookTime } = req.body;

//     const food = await FoodModel.findByIdAndUpdate(id, {
//       name,
//       price,
//       tags: tags.split ? tags.split(',') : tags,
//       favorite,
//       imageUrl,
//       origins: origins.split ? origins.split(',') : origins,
//       cookTime,
//     }, { new: true });

//     if (!food) {
//       return res.status(404).json({ message: 'Food not found' });
//     }

//     res.status(200).send(food);
//   })
// );

// // حذف طعام
// router.delete(
//   '/:foodId',
//   admin,
//   handler(async (req, res) => {
//     const { foodId } = req.params;
//     const food = await FoodModel.findByIdAndDelete(foodId);

//     if (!food) {
//       return res.status(404).json({ message: 'Food not found' });
//     }

//     res.status(200).send({ message: 'Food deleted successfully' });
//   })
// );

// // الحصول على جميع التاجز
// router.get(
//   '/tags',
//   handler(async (req, res) => {
//     const tags = await FoodModel.aggregate([
//       { $unwind: '$tags' },
//       { $group: { _id: '$tags', count: { $sum: 1 } } },
//       { $project: { _id: 0, name: '$_id', count: '$count' } },
//     ]).sort({ count: -1 });

//     const all = {
//       name: 'All',
//       count: await FoodModel.countDocuments(),
//     };

//     tags.unshift(all);

//     res.status(200).send(tags);
//   })
// );

// // البحث عن طعام بواسطة اسم
// router.get(
//   '/search/:searchTerm',
//   handler(async (req, res) => {
//     const { searchTerm } = req.params;
//     const searchRegex = new RegExp(searchTerm, 'i');
//     const foods = await FoodModel.find({ name: { $regex: searchRegex } });
//     res.status(200).send(foods);
//   })
// );

// // الحصول على طعام بناءً على التاج
// router.get(
//   '/tag/:tag',
//   handler(async (req, res) => {
//     const { tag } = req.params;
//     const foods = await FoodModel.find({ tags: tag });
//     res.status(200).send(foods);
//   })
// );

// // الحصول على طعام بناءً على معرفه
// router.get(
//   '/:foodId',
//   handler(async (req, res) => {
//     const { foodId } = req.params;
//     const food = await FoodModel.findById(foodId);
//     if (!food) {
//       return res.status(404).json({ message: 'Food not found' });
//     }
//     res.status(200).send(food);
//   })
// );

// export default router;
