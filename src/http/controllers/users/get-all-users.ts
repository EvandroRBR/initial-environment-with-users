import { makeGetAllUsersUseCase } from '@/use-cases/factories/make-get-all-users-use.case';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function getAllUsers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUseProfile = makeGetAllUsersUseCase();

  const users = await getUseProfile.execute();

  return reply.status(200).send(users);
}
