import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { faker } from '@faker-js/faker';

describe('DummyJSON API Full CRUD Tests', () => {
  const p = pactum;
  const baseUrl = 'https://dummyjson.com';

  let userId = '';
  let productId = '';

  p.request.setDefaultTimeout(60000);

  // ---------------- Users ----------------
  describe('Users', () => {
    it('Cadastrar novo usuário', async () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email();
      const password = faker.internet.password({ length: 10 });

      userId = await p
        .spec()
        .post(`${baseUrl}/users/add`)
        .withJson({
          firstName,
          lastName,
          age: 25,
          username: faker.internet.username(),
          email,
          password
        })
        .expectStatus(StatusCodes.CREATED)
        .returns('id');
    });
  });
});
