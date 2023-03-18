import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

describe('Get All Users (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it('should be able to get all users', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const usersResponse = await request(app.server)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(usersResponse.status).toEqual(200);
    expect(usersResponse.body.users).toHaveLength(1);
  });
});
