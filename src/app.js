require ('dotenv').config();
const  express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config')
const MealsService = require ('./meals-service')
const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get('/api/meals', (req, res, next)=>{
  const knexInstance = req.app.get('db')
  MealsService.getAllMeals(knexInstance)
    .then(data =>{
      res.json(data)
    })
    .catch(next)
})
app.get('/', (req, res)=>{
  res.send('what a good destination!');
});

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