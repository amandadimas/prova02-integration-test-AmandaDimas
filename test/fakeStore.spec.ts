import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';
import { faker } from '@faker-js/faker';

describe('Fake Store API', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://fakestoreapi.com';

  let productId = '';
  let userId = '';
  let token = '';

  p.request.setDefaultTimeout(60000);

  beforeAll(async () => {
    p.reporter.add(rep);
  });

  afterAll(() => p.reporter.end());

  describe('Products', () => {

    it('Buscar produto pelo ID', async () => {
      await p
        .spec()
        .get(`${baseUrl}/products/${productId}`)
        .expectStatus(StatusCodes.OK);
    });

    it('Listar produtos', async () => {
      await p
        .spec()
        .get(`${baseUrl}/products`)
        .expectStatus(StatusCodes.OK);
    });
  });

  describe('Users', () => {

    it('Buscar usuário pelo ID', async () => {
      await p
        .spec()
        .get(`${baseUrl}/users/${userId}`)
        .expectStatus(StatusCodes.OK);
    });
  });
});
