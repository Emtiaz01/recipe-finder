import { Meal, Recipe } from '../models/recipe.model';
import { extractIngredients } from './ingredient-extractor';

export function mapMealToRecipe(meal: Meal): Recipe {
  return {
    id: +meal.idMeal,
    name: meal.strMeal,
    imageUrl: meal.strMealThumb,
    category: meal.strCategory || '',
    area: meal.strArea || 'Unknown',
    instructions: '',
    youtubeUrl: '',
    ingredients: extractIngredients(meal),
    isFavorite: false,
    time: '25-30',
    servings: 4,
  };
}

export function mapMealsToRecipes(meals: Meal[]): Recipe[] {
  return meals ? meals.map(mapMealToRecipe) : [];
}
