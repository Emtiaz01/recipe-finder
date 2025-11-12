import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Categories } from './pages/categories/categories';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { SearchResults } from './pages/search-results/search-results';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';
import { TermsOfService } from './pages/terms-of-service/terms-of-service';
import { CookiePolicy } from './pages/cookie-policy/cookie-policy';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'categories', component: Categories },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'search/:term', component: SearchResults },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: 'terms-of-service', component: TermsOfService },
  { path: 'cookie-policy', component: CookiePolicy }
];