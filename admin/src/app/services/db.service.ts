import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rider } from '../models/rider';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  // Define API
  apiURL = 'http://localhost:4400';

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  // HttpClient API get() method => Fetch Riders list
  getRiders(page, limit): Observable<Rider> {
    return this.http.get<Rider>(this.apiURL + `/r/${page}-${limit}`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch Rider
  getRider(id): Observable<Rider> {
    return this.http.get<Rider>(this.apiURL + '/r/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API post() method => Create Rider
  createRider(Rider,query): Observable<Rider> {
    return this.http.post<Rider>(this.apiURL + '/rfg/add/', JSON.stringify({object: Rider ,query: query }), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API put() method => Update Rider
  updateRider(id, Rider): Observable<Rider> {
    return this.http.put<Rider>(this.apiURL + '/r/update/' + id, JSON.stringify(Rider), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete Rider
  deleteRider(id){
    return this.http.delete<Rider>(this.apiURL + '/r/delete/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling 
  handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }


}
