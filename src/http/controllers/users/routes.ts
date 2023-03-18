import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt';

import { create } from './create';
import { authenticate } from './authenticate';
import { profile } from './profile';
import { getAllUsers } from './get-all-users';
import { deleteUser } from './delete';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', create);
  app.post('/sessions', authenticate);

  app.get('/me', { onRequest: [verifyJWT] }, profile);
  app.get('/users', { onRequest: [verifyJWT] }, getAllUsers);
  app.delete('/users/:userId', { onRequest: [verifyJWT] }, deleteUser);
}
