import { AuthService } from '../services/auth.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

export class AuthController {
  authService = new AuthService();

  /** 회원가입 API **/
  signUp = async (req, res, next) => {
    try {
      const { email, password, name } = req.body;

      const createdUser = await this.authService.signUp(email, password, name);

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
        data: createdUser,
      });
    } catch (err) {
      next(err);
    }
  };

  /** 로그인 API **/
  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const accessToken = await this.authService.signIn(email, password);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
        data: accessToken,
      });
    } catch (err) {
      next(err);
    }
  };
}
