import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';

import { UsersRepository } from '../users-repository';

export class PrismaUsersRepository implements UsersRepository {
  async delete(userId: string) {
    await prisma.user.delete({ where: { id: userId } });
  }

  async findAll() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
      },
    });

    return users;
  }

  async findById(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data });

    return user;
  }
}
