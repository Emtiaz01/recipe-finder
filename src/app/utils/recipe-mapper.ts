import { Meal, Recipe } from '../models/recipe.model';

export function mapMealToRecipe(meal: Meal): Recipe {
  return {
    id: +meal.idMeal,
    name: meal.strMeal,
    imageUrl: meal.strMealThumb,
    category: meal.strCategory || '',
    area: '',
    instructions: '',
    youtubeUrl: '',
    ingredients: [],
    isFavorite: false,
    time: '25-30',
    servings: 4,
  };
}

export function mapMealsToRecipes(meals: Meal[]): Recipe[] {
  return meals ? meals.map(mapMealToRecipe) : [];
}
