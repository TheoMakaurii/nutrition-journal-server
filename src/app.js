require ('dotenv').config();
const  express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config')
const MealsService = require ('./meals/meals-service')
const MealsRouter = require('./meals/meals-router')
const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')

const app = express();

// const jsonParser= express.json();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use('/api/meals', MealsRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)

// app.get('/api/meals', (req, res, next)=>{
//   const knexInstance = req.app.get('db')
//   MealsService.getAllMeals(knexInstance)
//     .then(data =>{
//       res.json(data)
//     })
//     .catch(next)
// })
// app.get('/', (req, res)=>{
//   res.send('what a good destination!');
// });

// app.post('/api/meals', jsonParser, (req, res, next)=>{
//   const {meal_title, calories, fats, carbs, protiens} =req.body
//   const newMeal = {meal_title, calories, fats, carbs, protiens}
//   if(!meal_title){
//     return res.status(400).json({
//       error: {message: `Missing meal title!`}
//     })
//   }
//   MealsService.logNewMeal(
//     req.app.get('db'), newMeal)
//      .then(data=>{
//        res.status(201)
//        .location('/api/meals/${data.id}')
//        .json(data)
//      })
//      .catch(next)
  
// })

// app.get('/api/meals/:meal_id', (req, res, next)=>{
//   const knexInstance= req.app.get('db')
//   MealsService.getById(knexInstance, req.params.meal_id)
//    .then(data=>{
//      if(!data){
//        return res.status(404).json({
//          error:{message:`That meal isnt here!`}
//        })
//      }
//      res.json(data)
//    })
//    .catch(next)
// })

// app.delete('/api/meals/:meal_id', (req, res, next)=>{
//   const knexInstance = req.app.get('db')
//     MealsService.deleteMeal(knexInstance, req.params.meal_id)
//      .then(affected =>{
//        res.status(204).end()
//      })
//      .catch(next)
// })

app.use(function errorHAndler(error, req, res, next){
    let response
    if(NODE_ENV === 'production'){
        response = {error: {message: 'whoops! server error'}}
    } else{
        console.error(error)
        response ={message: error.message, error}
    }
    res.status(500).json(response)
})

module.exports = app;