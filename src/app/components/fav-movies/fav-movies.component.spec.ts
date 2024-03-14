// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FavMoviesComponent } from './fav-movies.component';
// import { Movie } from 'src/app/interfaces/movie';
// import { MovieService } from 'src/app/services/movie-service.service';
// import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
// import { ViewMovieModalComponent } from '../view-movie-modal/view-movie-modal.component';
// import { Router } from '@angular/router';
// import { DataSharingService } from 'src/app/services/data-sharing.service';
// import { of } from 'rxjs';

// describe('FavMoviesComponent', () => {
//   let component: FavMoviesComponent;
//   let fixture: ComponentFixture<FavMoviesComponent>;
//   let movieService: jasmine.SpyObj<MovieService>;
//   let modalService: jasmine.SpyObj<NgbModal>;
//   let router: jasmine.SpyObj<Router>;
//   let dataSharingService: jasmine.SpyObj<DataSharingService>;

//   beforeEach(async () => {
//     movieService = jasmine.createSpyObj('MovieService', ['getUserWatchList', 'updateWatchList']);
//     modalService = jasmine.createSpyObj('NgbModal', ['open']);
//     router = jasmine.createSpyObj('Router', ['navigate']);
//     dataSharingService = jasmine.createSpyObj('DataSharingService', ['getSelectedMovie']);

//     await TestBed.configureTestingModule({
//       declarations: [FavMoviesComponent, ViewMovieModalComponent],
//       providers: [
//         { provide: MovieService, useValue: movieService },
//         { provide: NgbModal, useValue: modalService },
//         { provide: Router, useValue: router },
//         { provide: DataSharingService, useValue: dataSharingService }
//       ]
//     })
//      .compileComponents();

//     fixture = TestBed.createComponent(FavMoviesComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   describe('getSelectedMovie', () => {
//     it('should call the movie service and set the allMovies property', () => {
//       movieService.getUserWatchList.and.returnValue(of([]));
//       component.getSelectedMovie();
//       expect(movieService.getUserWatchList).toHaveBeenCalled();
//       expect(component.allMovies).toEqual([]);
//     });
//   });

//   describe('removeFromFav', () => {
//     let movie: Movie;

//     beforeEach(() => {
//       movie = {
//         movieId: 'testMovieId',
//         name: 'testMovieName',
//         overview: 'testMovieOverview',
//         imageUrl: 'testImageUrl',
//         releasedate: 'testReleaseDate',
//         director: 'testDirector',
//         actors: ['testActor1', 'testActor2'],
//         categories: ['testCategory1', 'testCategory2'],
//         year: 1987,
//         runtime: 122,
//         storyline: 'testStoryline',
//         platform: 'testPlatform'
//       };
//     });

//     it('should call the movie service with the correct parameters', () => {
//       component.removeFromFav(movie);
//       expect(movieService.updateWatchList).toHaveBeenCalledWith(movie.movieId, 'delete');
//     });

//     it('should call the getSelectedMovie method', () => {
//       component.removeFromFav(movie);
//       expect(component.getSelectedMovie).toHaveBeenCalled();
//     });
//   });

//   describe('overlayClickHandler', () => {
//     it('should call event.stopPropagation', () => {
//       const event = { stopPropagation: jasmine.createSpy('stopPropagation') };
//       component.overlayClickHandler(event);
//       expect(event.stopPropagation).toHaveBeenCalled();
//     });
//   });

//   describe('showOverlay', () => {
//     it('should set the showOverlayIndex property to the given index', () => {
//       component.showOverlay(1);
//       expect(component.showOverlayIndex).toBe(1);
//     });
//   });

//   describe('hideOverlay', () => {
//     it('should set the showOverlayIndex property to -1', () => {
//       component.hideOverlay();
//       expect(component.showOverlayIndex).toBe(-1);
//     });
//   });

//   describe('viewMovie', () => {
//     let modalRef: NgbModalRef;
//     let selectedMovie: Movie;

//     beforeEach(() => {
//       modalRef =