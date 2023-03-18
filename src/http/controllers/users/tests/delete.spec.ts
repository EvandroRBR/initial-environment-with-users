import { app } from '@/app';
import request from 'supertest';

import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Delete User (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to delete user', async () => {
    const { token, id } = await createAndAuthenticateUser(app);

    const profileResponse = await request(app.server)
      .delete(`/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(profileResponse.statusCode).toEqual(200);
  });
});
