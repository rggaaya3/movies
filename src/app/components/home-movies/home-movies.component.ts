import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { MovieService } from 'src/app/services/movie-service.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ViewMovieModalComponent } from '../view-movie-modal/view-movie-modal.component';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { catchError, throwError, map } from 'rxjs';

@Component({
  selector: 'app-home-movies',
  templateUrl: './home-movies.component.html',
  styleUrls: ['./home-movies.component.scss']
})


export class HomeMoviesComponent implements OnInit {

  allMovies: any = [];
  selectedMovie: any;
  showAdvancedSearch = false;
  searchTerm = {};
  searchValue = '';
  actorValue = '';
  genreValue = '';
  yearValue = '';
  platformValue = '';  
  showOverlayIndex: number = -1;
  favMovies:any = [];
  errormsg:any;

  constructor(private movieService: MovieService,
    private router: Router,
    private dataSharingService: DataSharingService,
    private modal: NgbModal) { }

 

  /**
 * initializes the component
 */
ngOnInit(): void {

  this.dataSharingService.searchData$.pipe(
    map(data => ({ data, timestamp: new Date() })), // Add a timestamp to make the value unique
    catchError((error) => {
      this.allMovies = [];
      this.errormsg = error;
      // Handle the error or rethrow it if needed
      return error;
    })
  ).subscribe((result:any) => {
    if (result) {
      this.allMovies = result['data'];
      this.getFavMovies();
    }
  });
  
  

  
}

  getFavMovies() {
    this.movieService.getUserWatchList().subscribe((res:any) => {
      this.favMovies = res;
    });
  }

  isFav(id:any ){
    let favres = false;
    const fav =  this.favMovies.filter((x:any)=>{
      return x['movieId'] === id;
    })

    if(fav.length > 0) favres = true;
    return favres;
  }
  getSelectedMovie() {
    this.movieService.getUserWatchList().subscribe((res:any) => {
      this.allMovies = res;
      console.log(this.allMovies);
    });
  }

  addToFavorites(movie:any){
    this.movieService.updateWatchList(movie.movieId, 'add').subscribe((res:any) => {
      
      console.log(res);
      
    this.getFavMovies();
    });
  }
  removeFromFav(movie: Movie): void {
    this.movieService.updateWatchList(movie.movieId, 'delete').subscribe((res: any) => {

      this.getFavMovies();
    });
  }
  overlayClickHandler(event: Event): void {
    // Prevent the click event from propagating to underlying elements
    event.stopPropagation();
  }
  
  

  searchMovie() {
    this.movieService.getMovies(this.searchTerm).subscribe(
      (movies: Movie[]) => this.allMovies = movies
    );
  }

  
  showOverlay(index: number): void {
    this.showOverlayIndex = index;
  }

  // Function to handle mouseout event
  hideOverlay(): void {
    this.showOverlayIndex = -1;
  }


  search() {
    if (this.showAdvancedSearch) {
      this.searchTerm = {
        titleSearch: this.searchValue,
        actorSearch: this.actorValue,
        genreSearch: this.genreValue,
        yearSearch: this.yearValue,
        platformSearch: this.platformValue
      };
    } else  this.searchTerm = { titleSearch: this.searchValue };
    this.searchMovie();
  }


  toggleAdvancedSearch() {
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }

  viewMovie(selectedMovie: any) {
    let modalRef: NgbModalRef = this.modal.open(ViewMovieModalComponent, {
      size: 'lg',
      centered: true,
    })
    modalRef.componentInstance.selectedMovie = selectedMovie;
    
  }

}