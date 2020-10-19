const MealsService = {
  getAllMeals(db) {
    return db
      .from('meals_table AS Meals')
      .select(
        'Meals.id',
        'Meals.user_id',
        'Meals.meal_title',
        'Meals.calories',
        'Meals.fats',
        'Meals.carbs',
        'Meals.protiens',
        'Meals.date_published'
      )  
    },

    logNewMeal(db, newMeal){
        return db
         .insert(newMeal)
         .into('meals_table')
         .returning('*')
         .then(rows =>{
             return rows[0]
        })
    },

    getById(db, user_id) {
    return db
      .from('meals_table AS Meals')
      .orderBy('date_published', 'DESC')
      .select('*')
      .where({user_id})
  },

  deleteMeal(db, id) {
    return db('meals_table')
      .where({ id })
      .delete()
  },

};
module.exports = MealsService;
