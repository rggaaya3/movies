import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  constructor() { }

  private searchData = new BehaviorSubject<any>(null);
  searchData$ = this.searchData.asObservable();

  private errorData = new BehaviorSubject<string | null>(null);
  errorData$ = this.errorData.asObservable();

  setSearchData(data: any): void {
    this.searchData.next(data);
  }

  setErrorData(error: string): void {
    this.errorData.next(error);
  }

  // New method to handle errors
  private handleError(error: any) {
    console.error('An error occurred:', error);
    this.setErrorData('Something went wrong'); // Pass the error to other components
    return throwError('Something went wrong');
  }

  // Updated method using catchError
  getDataWithErrorHandling(): Observable<any> {
    return this.searchData$.pipe(
      catchError(this.handleError)
    );
  }
}
