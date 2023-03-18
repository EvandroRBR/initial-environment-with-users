import { Prisma, User } from '@prisma/client';

interface GetAllUsersResponse {
  id: string;
  name: string;
  email: string;
  created_at: Date;
}

export interface UsersRepository {
  findAll(): Promise<GetAllUsersResponse[]>;
  findById(userId: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}
