import { UsersRepository } from '../repositories/users.repository.js';

export class UsersService {
  usersRepository = new UsersRepository();

  /** 내 정보 조회 API **/
  findUser = async (userId) => {
    // Repository에게 데이터 요청
    const user = await this.usersRepository.findUser(userId);

    // 비즈니스 로직 수행 후 사용자에게 보여줄 데이터 가공 (password 제외)
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  };
}
