import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeMoviesComponent } from './components/home-movies/home-movies.component';
import { SearchMoviesComponent } from './components/search-movies/search-movies.component';
import { FavMoviesComponent } from './components/fav-movies/fav-movies.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewMovieModalComponent } from './components/view-movie-modal/view-movie-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeMoviesComponent,
    SearchMoviesComponent,
    FavMoviesComponent,
    ViewMovieModalComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
