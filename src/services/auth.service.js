import { UsersRepository } from '../repositories/users.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  HASH_SALT_ROUNDS,
} from '../constants/auth.constant.js';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';

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

  /** 로그인 API **/
  signIn = async (email, password) => {
    const user = await this.usersRepository.findUserByEmail(email);

    const isPasswordMatched =
      user && bcrypt.compareSync(password, user.password);

    if (!user || !isPasswordMatched) {
      throw new Error('인증 정보가 유효하지 않습니다.');
    }

    const payload = { id: user.id };

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    return { accessToken };
  };
}
