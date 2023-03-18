import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { GetAllUsersUseCase } from '../get-all-users';

let usersRepository: InMemoryUsersRepository;
let sut: GetAllUsersUseCase;

describe('Get All Users Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetAllUsersUseCase(usersRepository);
  });

  it('should be able to get all users', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });

    await usersRepository.create({
      name: 'John Doe 2',
      email: 'johndoe2@example.com',
      password_hash: await hash('123456', 6),
    });

    const users = await sut.execute();

    expect(users.users).toHaveLength(2);
  });
});
