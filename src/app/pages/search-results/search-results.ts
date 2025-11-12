import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe, Meal } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe';
import { RecipeList } from '../../components/recipe-list/recipe-list';
import { BackToTop } from '../../components/back-to-top/back-to-top';
import { mapMealsToRecipes } from '../../utils/recipe-mapper';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, RecipeList, BackToTop],
  templateUrl: './search-results.html',
  styleUrl: './search-results.scss'
})
export class SearchResults implements OnInit {
  term: string = '';
  recipes: Recipe[] = [];
  isLoading: boolean = false;
  hasSearched: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.term = params.get('term') || '';
      if (this.term) {
        this.searchRecipes();
      }
    });
  }

  searchRecipes(): void {
    this.isLoading = true;
    this.hasSearched = true;
    
    forkJoin({
      nameSearch: this.recipeService.searchRecipes(this.term).pipe(
        catchError(() => of([]))
      ),
      categorySearch: this.recipeService.searchByCategory(this.term).pipe(
        catchError(() => of([]))
      )
    }).subscribe({
      next: (results) => {
        const nameResults = results.nameSearch || [];
        const categoryResults = results.categorySearch || [];
        const allMeals = [...nameResults, ...categoryResults];
        const uniqueMeals = allMeals.filter((meal, index, self) =>
          index === self.findIndex((m) => m.idMeal === meal.idMeal)
        );
        
        this.recipes = mapMealsToRecipes(uniqueMeals);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Search error:', error);
        this.recipes = [];
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
