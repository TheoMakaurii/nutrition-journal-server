
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray(){

    return [


        {   
            id: 1,
            user_name: 'test_user',
            full_name: 'Test Smith',
            password: "password1",
            date_created: '2100-05-22T16:30:32.615Z'
        },

        {   
            id: 2,
            user_name: 'test_usertwo',
            full_name: 'Test Brown',
            password: "password2",
            date_created: '2100-05-22T16:30:32.615Z'
        },
        {   
            id: 3,
            user_name: 'test_userthree',
            full_name: 'Test MeToo',
            password: "password3",
            date_created: '2100-05-22T16:30:32.615Z'
        },
    ]
}

function makeMealsArray(users){
   return [
       { id :2,
        meal_title: 'test meals',
        calories: 111,
        fats: 222,
        carbs: 333,
        protiens: 444,
        date_published: '2100-05-22T16:28:32.615Z',
        user_id: users[0].id
        
        },

        {
        id :3,
        meal_title: 'test meals two',
        calories: 111,
        fats: 222,
        carbs: 333,
        protiens: 444,
        date_published: '2100-05-22T16:29:32.615Z',
        user_id: users[1].id
            },

        {
        id :4,
        meal_title: 'test meals three',
        calories: 111,
        fats: 222,
        carbs: 333,
        protiens: 444,
        date_published: '2100-05-22T16:30:32.615Z',
        user_id: users[2].id
            }

    ]
}

function cleanTables(db) {
    return db.transaction(trx =>
      trx.raw(
        `TRUNCATE
          meals_table,
          users_table`
      )

    )
  }

  function makeMealFixtures() {
    const testUsers = makeUsersArray()
    const testMeals = makeMealsArray(testUsers)
    return { testUsers, testMeals}
  }

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
      subject: user.user_name,
      algorithm: 'HS256',
    })
    console.log(secret)
    return `Bearer ${token}`
  }
  
  module.exports = {
    makeAuthHeader,
    cleanTables,
    makeUsersArray,
    makeMealsArray,
    makeMealFixtures}