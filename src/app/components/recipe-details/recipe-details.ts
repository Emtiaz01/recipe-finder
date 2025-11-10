import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-details.html',
  styleUrls: ['./recipe-details.scss']
})
export class RecipeDetails implements OnInit {
  recipe: Recipe | undefined;

  constructor(
    private route: ActivatedRoute,
    @Inject(forwardRef(() => RecipeService)) private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    // this.recipeService.getRecipe(id).subscribe(recipe => {
    //   this.recipe = recipe;
    // });
  }
}
