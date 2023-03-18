import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { GetAllUsersUseCase } from '../get-all-users';

export function makeGetAllUsersUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const useCase = new GetAllUsersUseCase(prismaUsersRepository);

  return useCase;
}
