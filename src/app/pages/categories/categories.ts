import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe';
import { RecipeList } from '../../components/recipe-list/recipe-list';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RecipeList],
  templateUrl: './categories.html',
  styleUrls: ['./categories.scss']
})
export class Categories implements OnInit {
  categories: string[] = [];
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getCategories().subscribe(categories => {
      this.categories = ['All', ...categories.map((category: { strCategory: any; }) => category.strCategory)];
    });
  }

  onSelectCategory(category: string): void {
    if (category === 'All') {
      this.recipeService.getRecipes().subscribe(recipes => {
        this.recipes = recipes as unknown as Recipe[];
      });
    } else {
      this.recipeService.getRecipesByCategory(category).subscribe(recipes => {
        this.recipes = recipes as unknown as Recipe[];
      });
    }
  }
}
