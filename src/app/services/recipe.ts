import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
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
      switchMap(response => {
        if (!response.meals || response.meals.length === 0) {
          return of([]);
        }
        
        const detailRequests = response.meals.map(meal => 
          this.getMealById(meal.idMeal).pipe(
            catchError(() => of(null))
          )
        );

        return forkJoin(detailRequests).pipe(
          map(meals => meals.filter(meal => meal !== null) as Meal[])
        );
      })
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
