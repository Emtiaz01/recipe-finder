import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe';
import { SearchBar } from '../../components/search-bar/search-bar';
import { RecipeList } from '../../components/recipe-list/recipe-list';
import { Router } from '@angular/router';
import { Meal } from '../../models/recipe.model';
import { FavoritesService } from '../../services/favorites.service';
import { mapMealsToRecipes } from '../../utils/recipe-mapper';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchBar, RecipeList],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  showBackToTop: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    public favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((meals: Meal[]) => {
      this.recipes = mapMealsToRecipes(meals);
    });

    // Add scroll event listener for back to top button
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  ngOnDestroy(): void {
    // Clean up scroll event listener
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll(): void {
    this.showBackToTop = window.pageYOffset > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSearch(term: string): void {
    this.router.navigate(['/search', term]);
  }

  toggleFavorite(recipe: Recipe): void {
    this.favoritesService.toggleFavorite(recipe);
  }
}
