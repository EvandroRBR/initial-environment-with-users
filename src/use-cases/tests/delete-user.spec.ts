import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { DeleteUserUseCase } from '../delete-user';

let usersRepository: InMemoryUsersRepository;
let sut: DeleteUserUseCase;

describe('Delete User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new DeleteUserUseCase(usersRepository);
  });

  it('should be abre to delete one user', async () => {
    const userToDelete = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });

    await sut.execute({
      userId: userToDelete.id,
    });

    const deletedUser = await usersRepository.findById(userToDelete.id);

    expect(deletedUser).toBe(null);
  });
});
