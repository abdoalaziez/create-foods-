// import jwt from 'jsonwebtoken'; 
// import { UNAUTHORIZED } from '../constants/httpStatus.js';

// export default (req, res, next) => {
//   const token = req.headers.access_token;
//   if (!token) return res.status(UNAUTHORIZED).send();

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); { verify }
//     req.user = decoded;
//   } catch (error) {
//     res.status(UNAUTHORIZED).send();
//   }

//   return next();
// };


import jwt from 'jsonwebtoken';
import { UNAUTHORIZED } from '../constants/httpStatus.js';

export default (req, res, next) => {
  const token = req.headers['access_token'];

  if (!token) {
    return res.status(UNAUTHORIZED).send('Access token is missing!');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(UNAUTHORIZED).send('Invalid or expired token!');
  }
};
