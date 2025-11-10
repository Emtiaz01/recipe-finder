import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe';
import { SearchBar } from '../../components/search-bar/search-bar';
import { RecipeList } from '../../components/recipe-list/recipe-list';
import { Router } from '@angular/router';
import { Meal } from '../../models/recipe.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchBar, RecipeList],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((meals: Meal[]) => {
      this.recipes = meals.map(this.mapMealToRecipe);
    });
  }

  onSearch(term: string): void {
    this.router.navigate(['/search', term]);
  }

  private mapMealToRecipe(meal: Meal): Recipe {
    return {
      id: +meal.idMeal,
      title: meal.strMeal,
      imageUrl: meal.strMealThumb,
      ingredients: [], 
      instructions: [], 
      prepTime: 0,
      cookTime: 0,
      servings: 0,
      category: '',
    };
  }
}
