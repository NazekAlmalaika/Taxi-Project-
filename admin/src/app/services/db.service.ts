import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Rider } from "../models/rider";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { BillingMethod } from "app/models/billing-method";
import { Driver } from "app/models/driver";
import { User } from "app/models/user";
import { Trip } from "app/models/trip";

@Injectable({
  providedIn: "root",
})
export class DbService {
  // Define API
  apiURL = "http://localhost:4400";

  selectedUser: User = {
    name: "",
    email: "",
    password: "",
    _id: "",
    createdBy: "",
    active: false,
    mobileNumber: 0,
    region: "",
    onilne: false,
    address: "",
    billing_id: "",
    billingMethods_id: [""],
    bookings_id: [""],
    defaultBillingMethod_id: "",
    emailToken: "",
    isVerified: false,
  };
  //Server Errors
  loggedIn: boolean = false;
  //router
  router: Router;
  //Error messages
  serverErrorMessages: string = "";

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private http: HttpClient) {}

  // HttpClient API get() method => Fetch Riders list
  getRiders(page, limit, query): Observable<any> {
    return this.http
      .post<Rider>(
        this.apiURL + `/r/${limit}-${page}`,
        JSON.stringify({ query: query }),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch Rider
  getRider(id): Promise<Rider> {
    return this.http
      .get<Rider>(this.apiURL + "/r/" + id)
      .pipe(retry(1), catchError(this.handleError))
      .toPromise();
  }

  countRiders(query): Promise<any> {
    return this.http
      .post<any>(
        this.apiURL + `/r/count/`,
        JSON.stringify({ query: query }),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError))
      .toPromise();
  }

  // HttpClient API post() method => Create Rider
  createRider(Rider, query): Promise<Rider> {
    return this.http
      .post<Rider>(
        this.apiURL + "/rfg/add/",
        JSON.stringify({ object: Rider, query: query }),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError))
      .toPromise();
  }

  // HttpClient API put() method => Update Rider
  updateRider(id, Rider): Promise<Rider> {
    return this.http
      .put<Rider>(
        this.apiURL + "/r/update/" + id,
        JSON.stringify(Rider),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError))
      .toPromise();
  }

  // HttpClient API delete() method => Delete Rider
  deleteRider(id): Promise<Rider> {
    return this.http
      .delete<Rider>(this.apiURL + "/r/delete/" + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
      .toPromise();
  }

  // Billing methods
  createBillingMethod(billingMethod, query): Promise<BillingMethod> {
    return this.http
      .post<BillingMethod>(
        this.apiURL + "/bm/add/",
        JSON.stringify({ object: billingMethod, query: query }),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError))
      .toPromise();
  }

  // HttpClient API get() method => Fetch Riders list
  getBillingMethods(page, limit, query): Observable<any> {
    return this.http
      .post<Rider>(
        this.apiURL + `/bm/${limit}-${page}`,
        JSON.stringify({ query: query }),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  countBillingMethods(query): Promise<any> {
    return this.http
      .post<any>(
        this.apiURL + `/bm/count/`,
        JSON.stringify({ query: query }),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError))
      .toPromise();
  }

  //Driver methods

  // HttpClient API get() method => Fetch Riders list
  getDrivers(page, limit, query): Observable<any> {
    return this.http
      .post<Driver>(
        this.apiURL + `/d/${limit}-${page}`,
        JSON.stringify({ query: query }),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch Rider
  getDriver(id): Promise<Driver> {
    return this.http
      .get<Driver>(this.apiURL + "/d/" + id)
      .pipe(retry(1), catchError(this.handleError))
      .toPromise();
  }

  countDrivers(query): Promise<any> {
    return this.http
      .post<any>(
        this.apiURL + `/d/count/`,
        JSON.stringify({ query: query }),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError))
      .toPromise();
  }

  // HttpClient API post() method => Create Rider
  createDriver(Driver, query): Promise<Driver> {
    return this.http
      .post<Driver>(
        this.apiURL + "/d/add/",
        JSON.stringify({ object: Driver, query: query }),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError))
      .toPromise();
  }

  // HttpClient API put() method => Update Rider
  updateDriver(id, Driver): Promise<Driver> {
    return this.http
      .put<Driver>(
        this.apiURL + "/d/update/" + id,
        JSON.stringify(Driver),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError))
      .toPromise();
  }

  // HttpClient API delete() method => Delete Rider
  deleteDriver(id): Promise<Driver> {
    return this.http
      .delete<Driver>(this.apiURL + "/d/delete/" + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
      .toPromise();
  }

  // Error handling
  handleError(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }

  // booking methods

  createTrip(Trip, query): Promise<Trip> {
    return this.http
      .post<Trip>(
        this.apiURL + "/bo/add/",
        JSON.stringify({ object: Trip, query: query }),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError))
      .toPromise();
  }
  countTrips(query): Promise<any> {
    return this.http
      .post<any>(
        this.apiURL + `/bo/count/`,
        JSON.stringify({ query: query }),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError))
      .toPromise();
  }
  updateTrip(id, Trip): Promise<Trip> {
    return this.http
      .put<Trip>(
        this.apiURL + "bo/update/" + id,
        JSON.stringify(Trip),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError))
      .toPromise();
  }
  getTrips(page, limit, query): Observable<any> {
    return this.http
      .post<Trip>(
        this.apiURL + `/bo/${limit}-${page}`,
        JSON.stringify({ query: query }),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch Rider
  getTrip(id): Promise<Trip> {
    return this.http
      .get<Trip>(this.apiURL + "/bo/" + id)
      .pipe(retry(1), catchError(this.handleError))
      .toPromise();
  }
  deleteTrip(id): Promise<Trip> {
    return this.http
      .delete<Trip>(this.apiURL + "/bo/delete/" + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
      .toPromise();
  }

  /** Register user  */
  postUser(user: User) {
    return this.http.post(this.apiURL + "/register", user);
  }
  /** Login user  */
  login(authCredentials) {
    return this.http.post(this.apiURL + "/authenticate", authCredentials);
  }
  setToken(token: string) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }
  deleteToken() {
    localStorage.removeItem("token");
  }
  getUserPayLoad() {
    var token = this.getToken();
    if (token) {
      var userPayLoad = atob(token.split(".")[1]);
      return JSON.parse(userPayLoad);
    } else {
      return null;
    }
  }
  getUserPayment() {
    return this.http.get(this.apiURL + "/userProfile");
  }
  isLoggedIn() {
    var userPayLoad = this.getUserPayLoad();
    if (userPayLoad) {
      return userPayLoad.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
  forgetPassword(email) {
    return this.http
      .put<User>(this.apiURL + "/forgetPassword", email)
      .subscribe(
        (res) => {
          console.log(
            "reset Link has been sent at your email, Please check..."
          );
        },
        (err) => {
          this.serverErrorMessages = err.error.message;
          console.log(this.serverErrorMessages);
        }
      );
  }
  resetPassword(resetLink, newPassword) {
    return this.http
      .put<User>(this.apiURL + "/resetPassword", resetLink, newPassword)
      .subscribe(
        (res) => {
          console.log(
            "reset Link has been sent at your email, Please check..."
          );
        },
        (err) => {
          this.serverErrorMessages = err.error.message;
          console.log(this.serverErrorMessages);
        }
      );
  }
}
