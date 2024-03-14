import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Movie } from 'src/app/interfaces/movie';
import { MovieService } from 'src/app/services/movie-service.service';
import { SearchTerm } from 'src/app/interfaces/searchTerm';
import { DataSharingService } from 'src/app/services/data-sharing.service';

import { Observable, Subject, merge, OperatorFunction } from "rxjs";
import { map, filter } from "rxjs/operators";
@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss']
})


export class SearchMoviesComponent implements OnInit {

  allMovies: any = [];
  selectedMovie: any;
  showAdvancedSearch = false;
  searchTerm: SearchTerm = {};
  searchValue = '';
  actorValue = '';
  genreValue = '';
  yearValue = '';
  platformValue = '';
  actorspossiblevalues = [];
  platformpossiblevalues = [];
  genrespossiblevalues = [];

  searchactor: OperatorFunction<string, readonly { parentTemplateName: any }[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      map((term) =>
        term.length < 0
          ? this.actorspossiblevalues
          : this.actorspossiblevalues.filter((state) =>
            new RegExp(term, "mi").test(state)
          )
      )
    );

    searchplatform: OperatorFunction<string, readonly { parentTemplateName: any }[]> = (
      text$: Observable<string>
    ) =>
      text$.pipe(
        map((term) =>
          term.length < 0
            ? this.platformpossiblevalues
            : this.platformpossiblevalues.filter((state) =>
              new RegExp(term, "mi").test(state)
            )
        )
      );

      searchgenre: OperatorFunction<string, readonly { parentTemplateName: any }[]> = (
        text$: Observable<string>
      ) =>
        text$.pipe(
          map((term) =>
            term.length < 0
              ? this.genrespossiblevalues
              : this.genrespossiblevalues.filter((state) =>
                new RegExp(term, "mi").test(state)
              )
          )
        );


  constructor(private movieService: MovieService,
    private router: Router,
    private modal: NgbModal,
    private dataSharingService: DataSharingService) {
    this.searchTerm = {};
  }

  ngOnInit(): void {
    this.searchTerm = { 'year': '2023' }
    this.searchMovie();
    this.movieService.getAllDropdownValues().subscribe((data: any) => {
      this.actorspossiblevalues = data['actor'];
      this.platformpossiblevalues = data['platform'];
      this.genrespossiblevalues = data['genre'];
    });
  }

  searchMovie() {
    if (Object.keys(this.searchTerm).length === 0) this.searchTerm = { 'year': '2023' };
    this.movieService.getMovies(this.searchTerm).subscribe(
      (movies: Movie[]) => {
        this.allMovies = movies; this.dataSharingService.setSearchData(this.allMovies);
        this.router.navigate(['/home']);
      },  (err) => {
        console.log(err);
        this.dataSharingService.setErrorData(err);// Pass the error to the DataSharingService
        this.router.navigate(['/home']); 
      }
    );
  }


  /**
 * Searches for movies based on the search criteria specified in the searchTerm object.
 * If the showAdvancedSearch flag is set to true, the search will be performed based on the advanced search criteria specified in the other searchTerm properties.
 * If the showAdvancedSearch flag is set to false and the searchValue field is not empty, the search will be performed based on the search term specified in the searchValue field.
 * @param searchTerm - an object containing the search criteria
 * @param showAdvancedSearch - a boolean indicating whether to perform an advanced search or a basic search
 * @param searchValue - the search term to be used for a basic search
 */
  search() {
    this.searchTerm = {};
    if (this.showAdvancedSearch) {
      this.searchValue = '';
      // perform advanced search
      this.searchTerm = {
        titleSearch: '',
        actor: this.actorValue,
        genre: this.genreValue,
        year: this.yearValue,
        platform: this.platformValue
      };
    } else if (this.searchValue) {
      // perform basic search
      this.searchTerm = { titleSearch: this.searchValue };
    }
    this.searchMovie();
  }

  onChangeSearch() {

    this.searchTerm = {}
    if (!this.searchValue) this.searchMovie();
  }

  onClose() {
    this.searchTerm = {};
    this.searchValue = '';
    if (!this.searchValue) this.searchMovie();
  }

  toggleAdvancedSearch() {
    this.actorValue = '';
    this.genreValue = '';
    this.yearValue = '';
    this.platformValue = '';
    this.searchValue = '';
    if (!this.showAdvancedSearch) {
      this.searchValue = '';
    }
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }

  onFilterFocus(e: any, type: string) {
    if ((this.actorValue === "" && type === "actor") || (this.platformValue === "" && type === "platform") || (this.genreValue === "" && type === "genre")) {
      e.stopPropagation();
      setTimeout(() => {
        const inputEvent: Event = new Event("input");
        e.target.dispatchEvent(inputEvent);
      }, 0);
    }
  }



  onFilterSelect(e: any, type: string) {
    type === 'actor' ? this.actorValue = e.item : type === 'platform' ? this.platformValue = e.item : this.genreValue = e.item;
  }


}
