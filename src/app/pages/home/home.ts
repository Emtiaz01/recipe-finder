import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe';
import { SearchBar } from '../../components/search-bar/search-bar';
import { RecipeList } from '../../components/recipe-list/recipe-list';
import { Router } from '@angular/router';
import { Meal } from '../../models/recipe.model';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchBar, RecipeList],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {
  recipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    public favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((meals: Meal[]) => {
      this.recipes = meals.map(this.mapMealToRecipe);
    });
  }

  onSearch(term: string): void {
    this.router.navigate(['/search', term]);
  }

  toggleFavorite(recipe: Recipe): void {
    this.favoritesService.toggleFavorite(recipe);
  }

  private mapMealToRecipe(meal: Meal): Recipe {
    return {
  id: +meal.idMeal,
  title: meal.strMeal,
  name: meal.strMeal,
  imageUrl: meal.strMealThumb,
  category: meal.strCategory || '',
  area: '',
  instructions: "",
  youtubeUrl: '',
  ingredients: [],
  isFavorite: false,
  time: '25-30',
  servings: 4,
};
  }
}
