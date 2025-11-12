import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoriesResponse, MealsResponse, Meal } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) {}
  getRecipes(): Observable<Meal[]> {
    return this.http.get<MealsResponse>(`${this.baseUrl}/search.php?s=`).pipe(
      map(response => response.meals)
    );
  }
  getCategories(): Observable<any> {
    return this.http.get<CategoriesResponse>(`${this.baseUrl}/categories.php`).pipe(
      map(response => response.categories)
    );
  }

  getRecipesByCategory(category: string): Observable<Meal[]> {
    return this.http.get<MealsResponse>(`${this.baseUrl}/filter.php?c=${category}`).pipe(
      map(response => response.meals)
    );
  }

  searchRecipes(term: string): Observable<Meal[]> {
    return this.http.get<MealsResponse>(`${this.baseUrl}/search.php?s=${term}`).pipe(
      map(response => response.meals || [])
    );
  }

  // Search by category name
  searchByCategory(category: string): Observable<Meal[]> {
    return this.http.get<MealsResponse>(`${this.baseUrl}/filter.php?c=${category}`).pipe(
      map(response => response.meals || [])
    );
  }

  // Get full meal details by ID
  getMealById(id: string): Observable<Meal | null> {
    return this.http.get<MealsResponse>(`${this.baseUrl}/lookup.php?i=${id}`).pipe(
      map(response => response.meals ? response.meals[0] : null)
    );
  }
}
