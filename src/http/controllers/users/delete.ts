import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error';
import { makeDeleteUserUseCase } from '@/use-cases/factories/make-delete-user-use.case';

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const validateUseIdParamsSchema = z.object({
    userId: z.string().uuid(),
  });

  const { userId } = validateUseIdParamsSchema.parse(request.params);

  try {
    const deleteUserUseCase = makeDeleteUserUseCase();

    await deleteUserUseCase.execute({ userId });

    return reply.status(200).send();
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
