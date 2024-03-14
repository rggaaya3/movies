import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { MovieService } from 'src/app/services/movie-service.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ViewMovieModalComponent } from '../view-movie-modal/view-movie-modal.component';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-fav-movies',
  templateUrl: './fav-movies.component.html',
  styleUrls: ['./fav-movies.component.scss']
})


export class FavMoviesComponent implements OnInit {

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

  constructor(private movieService: MovieService,
    private router: Router,
    private dataSharingService: DataSharingService,
    private modal: NgbModal) { }

  /**
 * Initializes the component by retrieving the user's watchlist from the backend and setting it to the component's `allMovies` property.
 */
  ngOnInit(): void {
    this.getSelectedMovie();
  }

  /**
   * Retrieves the user's watchlist from the backend and sets it to the component's `allMovies` property.
   */
  getSelectedMovie(): void {
    this.movieService.getUserWatchList().subscribe((res: any) => {
      this.allMovies = res;
    });
  }




  /**
 * Removes the specified movie from the user's watchlist.
 *
 * @param movie - The movie object to remove from the watchlist.
 */
  removeFromFav(movie: Movie): void {
    this.movieService.updateWatchList(movie.movieId, 'delete').subscribe((res: any) => {


      this.getSelectedMovie();
    });
  }
  /**
 * Event handler for the overlay click event.
 *
 * @param event - The event object.
 * @remarks
 * This method prevents the click event from propagating to underlying elements by calling `event.stopPropagation()`.
 */
  overlayClickHandler(event: Event): void {
    event.stopPropagation();
  }

  // Function to handle mouseover event
  showOverlay(index: number): void {
    this.showOverlayIndex = index;
  }

  // Function to handle mouseout event
  hideOverlay(): void {
    this.showOverlayIndex = -1;
  }


  viewMovie(selectedMovie: any) {
    let modalRef: NgbModalRef = this.modal.open(ViewMovieModalComponent, {
      size: 'lg',
      centered: true,
    })
    modalRef.componentInstance.selectedMovie = selectedMovie;
    
  }

}
