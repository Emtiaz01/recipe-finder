import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Home } from "./pages/home/home";
import { Categories } from "./pages/categories/categories";
import { About } from "./pages/about/about";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, Home, Categories, About],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'recipe-finder';
}
