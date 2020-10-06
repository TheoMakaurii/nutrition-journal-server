const xss = require('xss')

const MealsService = {
  getAllMeals(db) {
    return db
      .from('meals_table AS Meals')
      .select(
        'Meals.id',
        'Meals.meal_title',
        'Meals.calories',
        'Meals.fats',
        'Meals.carbs',
        'Meals.protiens',)
      },

  getById(db, id) {
    return MealsService.getAllMeals(db)
      .where('art.id', id)
      .first()
  },


}
module.exports = MealsService
