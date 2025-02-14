import { prisma } from '../utils/prisma.util.js';

export class UsersRepository {
  findUserById = async (userId) => {
    // ORM인 Prisma에서 User 모델의 findFirst 메서드를 사용해 데이터 요청
    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    });

    return user;
  };

  findUserByEmail = async (email) => {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    return user;
  };

  createUser = async (email, password, name) => {
    const createdUser = await prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });

    return createdUser;
  };
}
