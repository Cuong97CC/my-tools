import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

//RxJS
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators'

import { apiUrl, hostName } from '../../environments/environment';

@Injectable()
export class HttpHelper {

  constructor(
    private http: HttpClient
  ) { }

  get(url: string, params: HttpParams, token: string) {
    const headers = {'Content-Type': 'application/json'};
    if (token) headers['x-access-token'] = token;
    const httpOptions = {
      headers: new HttpHeaders(headers),
      params: params
    };
    return this.http
      .get(apiUrl + url, httpOptions)
      .pipe(
        catchError(this.handleError),
        finalize(() => {})
      );
  }

  post(url: string, data: object, params: HttpParams, token: string) {
    const headers = {'Content-Type': 'application/json'};
    if (token) headers['x-access-token'] = token;
    const httpOptions = {
      headers: new HttpHeaders(headers),
      params: params
    };
    return this.http
      .post(apiUrl + url, data, httpOptions)
      .pipe(
        catchError(this.handleError),
        finalize(() => {})
      );
  }

  put(url: string, data: object, params: HttpParams, token: string) {
    const headers = {'Content-Type': 'application/json'};
    if (token) headers['x-access-token'] = token;
    const httpOptions = {
      headers: new HttpHeaders(headers),
      params: params
    };
    return this.http
      .put(apiUrl + url, data, httpOptions)
      .pipe(
        catchError(this.handleError),
        finalize(() => {})
      );
  }

  delete(url: string, params: HttpParams, token: string) {
    const headers = {'Content-Type': 'application/json'};
    if (token) headers['x-access-token'] = token;
    const httpOptions = {
      headers: new HttpHeaders(headers),
      params: params
    };
    return this.http
      .delete(apiUrl + url, httpOptions)
      .pipe(
        catchError(this.handleError),
        finalize(() => {})
      );
  }

  postForm(url: string, data: FormData, params: HttpParams, token: string) {
    const headers = {};
    if (token) headers['x-access-token'] = token;
    const httpOptions = {
      headers: new HttpHeaders(headers),
      params: params
    };
    return this.http
      .post(apiUrl + url, data, httpOptions)
      .pipe(
        catchError(this.handleError),
        finalize(() => {})
      );
  }

  private handleError = (error: any): Observable<any> => {
    if (error.status === 401) {
      window.location.href = hostName;
    } else if (error.status === 402) {
      window.location.href = hostName;
    } else {
      console.error('An error occurred', error);
    }
    return Observable.create((observer: any) => {
      observer.next(error.message || error);
      observer.complete();
    });
  }
}
