import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Categories } from './pages/categories/categories';
import { About } from './pages/about/about';
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'categories', component: Categories },
  { path: 'about', component: About }
];