const express = require('express')
const MealsService = require('./meals-service')
const JwtAuth  = require('../middleware/jwt-auth')


const mealsRouter = express.Router()
const jsonParser= express.json();

mealsRouter
    .route('/')
    .all(JwtAuth)
    .get((req, res, next)=>{
        const knexInstance = req.app.get('db')
        MealsService.getAllMeals(knexInstance)
        .then(data =>{
            res.json(data)
        })
        .catch(next)
    })
    .post( jsonParser, (req, res, next)=>{
        const {meal_title, calories, fats, carbs, protiens} =req.body
        const newMeal = {meal_title, calories, fats, carbs, protiens}
        if(!meal_title){
          return res.status(400).json({
            error: {message: `Missing meal title!`}
          })
        }

        newMeal.user_id =req.user.id
        MealsService.logNewMeal(
          req.app.get('db'), newMeal)
           .then(data=>{
             res.status(201)
             .location('/api/meals/${data.id}')
             .json(data)
           })
           .catch(next)
        
      })


mealsRouter
    .route('/:meal_id')
    .all(JwtAuth)
    .get((req, res, next)=>{
        const knexInstance= req.app.get('db')
        MealsService.getById(knexInstance, req.params.meal_id)
         .then(data=>{
           if(!data){
             return res.status(404).json({
               error:{message:`That meal isnt here!`}
             })
           }
           res.json(data)
         })
         .catch(next)
      })
    .delete( (req, res, next)=>{
        const knexInstance = req.app.get('db')
          MealsService.deleteMeal(knexInstance, req.params.meal_id)
           .then(affected =>{
             res.status(204).end()
           })
           .catch(next)
      })

    module.exports = mealsRouter