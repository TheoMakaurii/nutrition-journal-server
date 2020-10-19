const knex = require('knex');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Auth Endpoints', function() {
  let db;

  const { testUsers } = helpers.makeMealFixtures();
  const testUser = testUsers[0];

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe(`POST /api/auth/login`, () => {
    beforeEach('insert users', () => {
        return db
          .into('users_table')
          .insert(testUsers)
      });

      it(`responds with 400 required error when user_name is missing`, () => {
        

        return supertest(app)
          .post('/api/auth/login')
          .send(testUser.user_name)
          .expect(400, {
            error: `Missing 'user_name' in request body`,
          });
      });

    it(`responds with 400 required error when password is missing`, () => {
        

        return supertest(app)
          .post('/api/auth/login')
          .send(testUser.password)
          .expect(400, {
            error: `Missing 'user_name' in request body`,
          });
      });

    it(`responds 400 'invalid user_name or password' when bad user_name`, () => {
      const userInvalidUser = { user_name: 'user-not', password: 'existy' }
      return supertest(app)
        .post('/api/auth/login')
        .send(userInvalidUser)
        .expect(400, { error: `Incorrect user name of password!` });
    });

    it(`responds 400 'incorrect user_name or password' when bad password`, () => {
      const userInvalidPass = { user_name: testUser.user_name, password: 'incorrect' }
      return supertest(app)
        .post('/api/auth/login')
        .send(userInvalidPass)
        .expect(400, { error: `Incorrect username or password` });
    });
  });
});
