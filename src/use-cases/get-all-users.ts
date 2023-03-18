import { User as PrismaUser } from '@prisma/client';

import { UsersRepository } from '@/repositories/users-repository';

type User = Omit<PrismaUser, 'password_hash'>;

interface GetAllUsersUseCaseResponse {
  users: User[];
}

export class GetAllUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<GetAllUsersUseCaseResponse> {
    const users = await this.usersRepository.findAll();

    return { users };
  }
}
