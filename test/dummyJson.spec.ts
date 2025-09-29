import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { faker } from '@faker-js/faker';

describe('DummyJSON API Tests', () => {
  const p = pactum;
  const baseUrl = 'https://dummyjson.com';

  let userId = '';
  let productId = '';

  p.request.setDefaultTimeout(60000);

  // ---------------- Users ----------------
  describe('Users', () => {

    // Testa o cadastro de um novo usuário
    it('Cadastrar novo usuário', async () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email();
      const password = faker.internet.password({ length: 10 });

      // Faz POST criando um novo usuário e salva o ID retornado
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
        .returns('id'); // Armazena o ID do usuário criado
    });

    // Testa busca de um usuário já existente (id = 1)
    it('Buscar usuário existente', async () => {
      await p
        .spec()
        .get(`${baseUrl}/users/1`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({ id: 1 }); // Confere que o ID retornado é 1
    });

    // Testa edição de um usuário existente (id = 1)
    it('Editar usuário existente', async () => {
      await p
        .spec()
        .put(`${baseUrl}/users/1`)
        .withJson({ firstName: 'Editado', age: 30 })
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({ firstName: 'Editado', age: 30 }); // Valida atualização
    });

    // Testa listagem de todos os usuários
    it('Listar todos os usuários', async () => {
      await p
        .spec()
        .get(`${baseUrl}/users`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({ users: [] }); // Confere que a resposta tem array de usuários
    });
  });

  // ---------------- Products ----------------
  describe('Products', () => {

    // Testa o cadastro de um novo produto
    it('Cadastrar novo produto', async () => {
      productId = await p
        .spec()
        .post(`${baseUrl}/products/add`)
        .withJson({
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: faker.number.int({ min: 10, max: 500 }),
          discountPercentage: faker.number.int({ min: 0, max: 50 }),
          rating: faker.number.float({ min: 1, max: 5}),
          stock: faker.number.int({ min: 1, max: 100 }),
          brand: faker.company.name(),
          category: 'smartphones',
          thumbnail: faker.image.url(),
          images: [faker.image.url(), faker.image.url()]
        })
        .expectStatus(StatusCodes.CREATED)
        .returns('id'); // Salva ID do produto criado
    });

    // Testa busca de um produto já existente (id = 1)
    it('Buscar produto existente', async () => {
      await p
        .spec()
        .get(`${baseUrl}/products/1`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({ id: 1 }); // Valida que o produto tem ID 1
    });

    // Testa edição de um produto existente (id = 1)
    it('Editar produto existente', async () => {
      await p
        .spec()
        .put(`${baseUrl}/products/1`)
        .withJson({ title: 'Produto Editado', price: 999 })
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({ title: 'Produto Editado', price: 999 }); // Valida atualização
    });

    // Testa listagem de todos os produtos
    it('Listar todos os produtos', async () => {
      await p
        .spec()
        .get(`${baseUrl}/products`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({ products: [] }); // Confere que a resposta tem array de produtos
    });

    // Testa pesquisa de produtos com query string (?q=phone)
    it('Pesquisar produtos', async () => {
      await p
        .spec()
        .get(`${baseUrl}/products/search`)
        .withQueryParams({ q: 'phone' })
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({ products: [] }); // Confere que existe array de produtos
    });

    // Testa exclusão de um produto já existente (id = 1)
    it('Excluir produto existente', async () => {
      await p
        .spec()
        .delete(`${baseUrl}/products/1`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({ id: 1 }); // Confere que o produto deletado tinha ID 1
    });
  });
});