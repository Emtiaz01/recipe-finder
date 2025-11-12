import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe';
import { SearchBar } from '../../components/search-bar/search-bar';
import { RecipeList } from '../../components/recipe-list/recipe-list';
import { BackToTop } from '../../components/back-to-top/back-to-top';
import { Router } from '@angular/router';
import { Meal } from '../../models/recipe.model';
import { mapMealsToRecipes } from '../../utils/recipe-mapper';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchBar, RecipeList, BackToTop],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {
  recipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((meals: Meal[]) => {
      this.recipes = mapMealsToRecipes(meals);
    });
  }

  onSearch(term: string): void {
    this.router.navigate(['/search', term]);
  }
}
