import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly API_URL =  `${environment.openWeatherMapApi}`;
  private readonly API_KEY =  `${environment.openWeatherMapKey}`;

  constructor(private http: HttpClient) { }

  getWeatherForecast(city: string): Observable<any> {
    let cityToSearch = '';
    if (city) {
      cityToSearch = city;
    }

    const url = `${this.API_URL}?q=${cityToSearch}&appid=${this.API_KEY}`;

    return this.http
      .get<any>(url).pipe(
        // tap(console.log),
        catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err);
    return observableThrowError(err.error.message);
  }
}
