import bcrypt from 'bcryptjs';
// import request from 'supertest';
// import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password when new user created', async () => {
    // o factory vai gerar todos os atributos do usuario automaticamente
    // estamos sobreescrevendo o password para que consigamos comparar o hash
    const user = await factory.create('User', {
      password: '123123',
    });

    const compareHash = await bcrypt.compare('123123', user.password_hash);

    expect(compareHash).toBe(true);
  });
});
