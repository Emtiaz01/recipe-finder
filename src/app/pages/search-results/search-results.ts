import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Recipe, Meal } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe';
import { RecipeList } from '../../components/recipe-list/recipe-list';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, RecipeList],
  template: `
    <div class="search-results-container">
      <h2>Search Results for "{{ term }}"</h2>
      <app-recipe-list [recipes]="recipes"></app-recipe-list>
    </div>
  `,
  styles: [`
    .search-results-container {
      padding: 20px;
    }
  `]
})
export class SearchResults implements OnInit {
  term: string = '';
  recipes: Recipe[] = [];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.term = params.get('term') || '';
      this.recipeService.searchRecipes(this.term).subscribe((meals: Meal[]) => {
        this.recipes = meals ? meals.map(this.mapMealToRecipe) : [];
      });
    });
  }

  private mapMealToRecipe(meal: Meal): Recipe {
    return {
    id: +meal.idMeal,
    title: meal.strMeal,
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
}
