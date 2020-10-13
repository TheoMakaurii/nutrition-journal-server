const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const supertest = require('supertest')

describe('Nutrition Endpoints', function() {
    let db

    before('make knex instance', () => {
      db = knex({
        client: 'pg',
        connection: process.env.TEST_DATABASE_URL,
      })
      app.set('db', db)
    })
  
    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))
  
    // before('clean the table', () => db('users_table').truncate())

    // before('clean the table', () => db('meals_table').truncate())

    // afterEach('cleanup', () => db('users_table').truncate())

    // afterEach('cleanup', () => db('meals_table').truncate())
    
   

    context('Given there meals in the database', () => {

        const testUsers=[
                {   
                    id: 1,
                    user_name: 'test_user',
                    full_name: 'Test Smith',
                    password: "password",
                    date_created: '2100-05-22T16:30:32.615Z'
                },
        
                {   
                    id: 2,
                    user_name: 'test_usertwo',
                    full_name: 'Test Brown',
                    password: "password",
                    date_created: '2100-05-22T16:30:32.615Z'
                },
                {   
                    id: 3,
                    user_name: 'test_userthree',
                    full_name: 'Test MeToo',
                    password: "password",
                    date_created: '2100-05-22T16:30:32.615Z'
                },
        ]

        const testMeals = [ 
            { id :2,
                meal_title: 'test meals',
                calories: 111,
                fats: 222,
                carbs: 333,
                protiens: 444,
                date_published: '2100-05-22T16:28:32.615Z',
                user_id: testUsers[0].id
                
                },
        
                {
                id :3,
                meal_title: 'test meals two',
                calories: 111,
                fats: 222,
                carbs: 333,
                protiens: 444,
                date_published: '2100-05-22T16:29:32.615Z',
                user_id: testUsers[1].id
                    },
        
                {
                id :4,
                meal_title: 'test meals three',
                calories: 111,
                fats: 222,
                carbs: 333,
                protiens: 444,
                date_published: '2100-05-22T16:30:32.615Z',
                user_id: testUsers[2].id
                    }
        

        ]
        beforeEach('insert users', () => {
            return db
              .into('users_table')
              .insert(testUsers)
          })

        beforeEach('insert meals', () => {
          return db
            .into('meals_table')
            .insert(testMeals)
        })
        it('GET /api/meals responds with 200 and all of the meals', () => {
             return supertest(app)
               .get('/api/meals')
               .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
               .expect(200,testMeals)
               // TODO: add more assertions about the body
           })

        it('GET /api/meals/:user_id responds with 200 and specific user meals', ()=>{
            const userId =1
            const userMeal = [
            { id :2,
                meal_title: 'test meals',
                calories: 111,
                fats: 222,
                carbs: 333,
                protiens: 444,
                date_published: '2100-05-22T16:28:32.615Z',
                user_id: testUsers[0].id
                
                }]
            return supertest(app)
                .get(`/api/meals/${userId}`)
                .set('Authorization', helpers.makeAuthHeader(testUsers[1]))
                .expect(200, userMeal)
        })

      })
  })