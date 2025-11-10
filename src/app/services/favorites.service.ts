import { Injectable, signal, computed, effect } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites = signal<Recipe[]>([]);

  constructor() {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        this.favorites.set(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error reading favorites from localStorage', error);
    }

    effect(() => {
      try {
        localStorage.setItem('favorites', JSON.stringify(this.favorites()));
      } catch (error) {
        console.error('Error saving favorites to localStorage', error);
      }
    });
  }

  getFavorites = computed(() => this.favorites());

  isFavorite = computed(() => {
    const favs = this.favorites();
    return (recipe: Recipe) => favs.some(r => r.id === recipe.id);
  });

  toggleFavorite(recipe: Recipe): void {
    this.favorites.update(favorites => {
      const recipeIndex = favorites.findIndex(r => r.id === recipe.id);
      if (recipeIndex > -1) {
        return favorites.filter(r => r.id !== recipe.id);
      } else {
        return [...favorites, recipe];
      }
    });
  }
}
