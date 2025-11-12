import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe';
import { SafePipe } from '../../pipes/safe.pipe';
import { BackToTop } from "../back-to-top/back-to-top";
import { extractIngredientsWithMeasures } from '../../utils/ingredient-extractor';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule, SafePipe, BackToTop],
  templateUrl: './recipe-details.html',
  styleUrls: ['./recipe-details.scss']
})
export class RecipeDetails implements OnInit {
  recipe: any = null;
  ingredients: { ingredient: string; measure: string }[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadRecipeDetails(id);
    }
  }

  loadRecipeDetails(id: string): void {
    this.isLoading = true;
    this.recipeService.getMealById(id).subscribe({
      next: (meal) => {
        if (meal) {
          this.recipe = meal;
          this.ingredients = extractIngredientsWithMeasures(meal);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading recipe:', error);
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  getYoutubeEmbedUrl(url: string): string {
    if (!url) return '';
    const videoId = url.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  }

  getInstructionSteps(): string[] {
    if (!this.recipe || !this.recipe.strInstructions) return [];
    
    // Split by periods, newlines, or numbered steps
    const instructions = this.recipe.strInstructions
      .replace(/\r\n/g, '\n')
      .split(/\n+/)
      .map((step: string) => step.trim())
      .filter((step: string) => step.length > 10); 
    
    return instructions;
  }
}
