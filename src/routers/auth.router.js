import express from 'express';
// import jwt from 'jsonwebtoken';
import { signUpValidator } from '../middlewares/validators/sign-up-validator.middleware.js';
// import { signInValidator } from '../middlewares/validators/sign-in-validator.middleware.js';
// import {
//   ACCESS_TOKEN_EXPIRES_IN,
//   HASH_SALT_ROUNDS,
// } from '../constants/auth.constant.js';
// import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';
import { AuthController } from '../controllers/auth.controller.js';

const authRouter = express.Router();

const authController = new AuthController();

/** 회원가입 API **/
authRouter.post('/sign-up', signUpValidator, authController.signUp);

// authRouter.post('/sign-in', signInValidator, async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     const user = await prisma.user.findUnique({ where: { email } });

//     const isPasswordMatched =
//       user && bcrypt.compareSync(password, user.password);

//     if (!isPasswordMatched) {
//       return res.status(HTTP_STATUS.UNAUTHORIZED).json({
//         status: HTTP_STATUS.UNAUTHORIZED,
//         message: MESSAGES.AUTH.COMMON.UNAUTHORIZED,
//       });
//     }

//     const payload = { id: user.id };

//     const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
//       expiresIn: ACCESS_TOKEN_EXPIRES_IN,
//     });

//     return res.status(HTTP_STATUS.OK).json({
//       status: HTTP_STATUS.OK,
//       message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
//       data: { accessToken },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

export { authRouter };
