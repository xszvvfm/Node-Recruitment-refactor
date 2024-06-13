import { UsersService } from '../services/users.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

// User의 Controller 역할을 하는 클래스
export class UsersController {
  // usersService를 Controller 클래스의 멤버 변수로 할당
  usersService = new UsersService();

  /** 내 정보 조회 API **/
  getUser = async (req, res, next) => {
    try {
      const { userId } = req.user;

      // Service 계층에 구현된 findUserById 로직 실행
      const user = await this.usersService.findUserById(userId); // UsersController 클래스의 usersService 인스턴스에서 findUserById 메서드를 호출

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.USERS.READ_ME.SUCCEED,
        data: user,
      });
    } catch (err) {
      next(err);
    }
  };
}
