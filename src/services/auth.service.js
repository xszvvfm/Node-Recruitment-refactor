import { UsersRepository } from '../repositories/users.repository.js';
import bcrypt from 'bcrypt';
import { HASH_SALT_ROUNDS } from '../constants/auth.constant.js';

export class AuthService {
  usersRepository = new UsersRepository();

  /** 회원가입 API **/
  signUp = async (email, password, name) => {
    const existedUser = await this.usersRepository.findUserByEmail(email);

    if (existedUser) {
      throw new Error('이미 가입 된 사용자입니다.');
    }

    const hashedPassword = await bcrypt.hashSync(password, HASH_SALT_ROUNDS);

    const createdUser = await this.usersRepository.createUser(
      email,
      hashedPassword,
      name,
    );

    createdUser.password = undefined;

    return {
      id: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
      role: createdUser.role,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    };
  };
}
