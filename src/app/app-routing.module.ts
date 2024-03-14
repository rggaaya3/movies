import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeMoviesComponent } from './components/home-movies/home-movies.component';
import { SearchMoviesComponent } from './components/search-movies/search-movies.component';
import { FavMoviesComponent } from './components/fav-movies/fav-movies.component';




const routes: Routes = [
  { path: 'home', component: HomeMoviesComponent },
  { path: 'search', component: SearchMoviesComponent },
  { path: 'fav', component: FavMoviesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
