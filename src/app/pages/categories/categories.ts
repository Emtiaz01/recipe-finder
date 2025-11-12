import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe, Category, Meal } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe';
import { RecipeList } from '../../components/recipe-list/recipe-list';
import { BackToTop } from '../../components/back-to-top/back-to-top';
import { mapMealsToRecipes } from '../../utils/recipe-mapper';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RecipeList, BackToTop],
  templateUrl: './categories.html',
  styleUrls: ['./categories.scss']
})
export class Categories implements OnInit {
  categories: Category[] = [];
  recipes: Recipe[] = [];
  selectedCategory: string = '';
  isLoading: boolean = false;

  constructor(
    private recipeService: RecipeService,
  ) {}

  ngOnInit(): void {
    this.recipeService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onSelectCategory(category: string): void {
    this.selectedCategory = category;
    this.isLoading = true;
    this.recipes = []; 
    
    this.recipeService.getRecipesByCategory(category).subscribe((meals: Meal[]) => {
      this.recipes = mapMealsToRecipes(meals);
      this.isLoading = false;
      
      setTimeout(() => {
        const recipesSection = document.querySelector('.recipes-section');
        if (recipesSection) {
          recipesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    });
  }
}
