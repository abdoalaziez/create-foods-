import { connect, set } from 'mongoose';
import { UserModel } from '../models/user.model.js';
import { FoodModel } from '../models/food.model.js';
import { sample_users } from '../data.js';
import { sample_foods } from '../data.js';
import bcrypt from 'bcryptjs';
const PASSWORD_HASH_SALT_ROUNDS = 10;
set('strictQuery', true);

export const dbconnect = async () => {
  try {
    connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await seedUsers();
    await seedFoods();
    console.log('connect successfully---');
  } catch (error) {
    console.log(error);
  }
};

async function seedUsers() {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    console.log('Users seed is already done!');
    return;
  }

  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
    await UserModel.create(user);
  }

  console.log('Users seed is done!');
}

async function seedFoods() {
  const foods = await FoodModel.countDocuments();
  if (foods > 0) {
    console.log('Foods seed is already done!');
    return;
  }

  for (const food of sample_foods) {
    food.imageUrl = `/foods/${food.imageUrl}`;
    await FoodModel.create(food);
  }

  console.log('Foods seed Is Done!');
}





// import { connect, set } from 'mongoose';
// import { UserModel } from '../models/user.model.js';
// import { FoodModel } from '../models/food.model.js';
// import { sample_users } from '../data.js';
// import { sample_foods } from '../data.js';
// import bcrypt from 'bcryptjs';
// import mongoose from 'mongoose';

// const PASSWORD_HASH_SALT_ROUNDS = 10;
// set('strictQuery', true);

// export const dbconnect = async () => {
//   try {
//     await connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     await seedUsers();
//     await seedFoods();
//     console.log('Connected successfully!');
//   } catch (error) {
//     console.log(error);
//   }
// };

// async function seedUsers() {
//   const usersCount = await UserModel.countDocuments();
//   if (usersCount > 0) {
//     console.log('Users seed is already done!');
//     return;
//   }

//   for (let user of sample_users) {
//     user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
    
//     // تأكد من أن _id هو ObjectId وليس رقمًا
//     user._id = new mongoose.Types.ObjectId();
    
//     await UserModel.create(user);
//   }

//   console.log('Users seed is done!');
// }

// async function seedFoods() {
//   const foodsCount = await FoodModel.countDocuments();
//   if (foodsCount > 0) {
//     console.log('Foods seed is already done!');
//     return;
//   }

//   for (const food of sample_foods) {
//     food.imageUrl = `/foods/${food.imageUrl}`;
    
//     // تأكد من أن _id هو ObjectId وليس رقمًا
//     food._id = new mongoose.Types.ObjectId();
    
//     await FoodModel.create(food);
//   }

//   console.log('Foods seed is done!');
// }
