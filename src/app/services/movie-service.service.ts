import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { Observable, finalize } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  host = 'http://10.44.29.150:8080';

  headers: HttpHeaders = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  })
  constructor(private http: HttpClient,
    private userService: UserService,
    private loadingService: LoadingService) {


  }

  /**
   * Returns an Observable that emits an array of Movie objects from the API endpoint.
   *
   * @param searchTerm The search term to be passed in the request body.
   * @param headers The headers to be sent with the request.
   * @returns An Observable that emits an array of Movie objects.
   */
  getMovies(
    searchTerm: object = {},

  ): Observable<Movie[]> {

    this.loadingService.setLoadingState(true);

    // const headers: HttpHeaders = new HttpHeaders()
    return this.http.post<Movie[]>(
      `${this.host}/movie/api/moviesearch`, searchTerm, { headers: this.headers }
    ).pipe(
      finalize(() => {
        this.loadingService.setLoadingState(false);
      })
    );


  }

  getUserWatchList() {
    this.loadingService.setLoadingState(true);
    return this.http.get(`${this.host}/movie/api/watchlist/XDDlRVfk4blckF6fnLw6`).pipe(
      finalize(() => {
        this.loadingService.setLoadingState(false);
      })
    )
  }

  getAllDropdownValues()  {    
    this.loadingService.setLoadingState(true);
    return this.http.get(`${this.host}/movie/api/moviesearch/dropdowns`).pipe(
      finalize(() => {
        this.loadingService.setLoadingState(false);
      })
    )
  }

  updateWatchList(movie: any, action: string) {
    this.loadingService.setLoadingState(true);
    const request = {
      "userId": this.userService.getUserInfo().userId,
      "movieId": movie,
      action
    }
    return this.http.post(`${this.host}/movie/api/watchlist`, request, { headers: this.headers }).pipe(
      finalize(() => {
        this.loadingService.setLoadingState(false);
      })
    );
  }

}