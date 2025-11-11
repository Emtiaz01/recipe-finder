import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe, Category, Meal } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe';
import { RecipeList } from '../../components/recipe-list/recipe-list';
import { FavoritesService } from '../../services/favorites.service';
import { mapMealsToRecipes } from '../../utils/recipe-mapper';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RecipeList],
  templateUrl: './categories.html',
  styleUrls: ['./categories.scss']
})
export class Categories implements OnInit, OnDestroy {
  categories: Category[] = [];
  recipes: Recipe[] = [];
  selectedCategory: string = '';
  isLoading: boolean = false;
  showBackToTop: boolean = false;

  constructor(
    private recipeService: RecipeService,
    public favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.recipeService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  ngOnDestroy(): void {

    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll(): void {
    this.showBackToTop = window.pageYOffset > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSelectCategory(category: string): void {
    this.selectedCategory = category;
    this.isLoading = true;
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

  getCategoryDescription(description: string): string {
    if (!description) return '';
    return description.length > 100 ? description.substring(0, 100) + '...' : description;
  }

  toggleFavorite(recipe: Recipe): void {
    this.favoritesService.toggleFavorite(recipe);
  }
}
