import { throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Reminder } from '../models/reminder.model';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private readonly API_URL =  `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getAllReminders(myParams: any): Observable<Reminder[]> {
    // console.log('getAll', myParams);
    const url = `${this.API_URL}`;
    const params: HttpParams  = new HttpParams({ fromObject: myParams });
    return this.http
      .get<Reminder[]>(url, { params }).pipe(
        // tap(console.log),
        catchError(this.handleError));
  }

  getReminder(id: string): Observable<Reminder> {
    // console.log('get', id);
    const url = `${this.API_URL}/${id}`;
    return this.http
      .get<Reminder>(url).pipe(
        // tap(console.log),
        catchError(this.handleError));
  }

  createReminder(object: Reminder): Observable<Reminder> {
    // console.log('create', object);
    const url = `${this.API_URL}`;
    return this.http
      .post<Reminder>(url, object).pipe(
      // tap(console.log),
      catchError(this.handleError));
  }

  updateReminder(object: Reminder): Observable<Reminder> {
    // console.log(`update`, object);
    const url = `${this.API_URL}/update/${object._id}`;
    return this.http
      .put<Reminder>(url, object).pipe(
        // tap(console.log),
        catchError(this.handleError));
  }

  deleteReminder(object: Reminder): Observable<Reminder> {
    return this.http
    .delete<Reminder>(`${this.API_URL}/${object._id}`).pipe(
    tap(console.log),
    catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err);
    return observableThrowError(err.error.message); // mensaje personalizado de mi express
  }
}
