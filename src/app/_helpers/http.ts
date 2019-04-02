import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

//RxJS
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators'

import { apiUrl, hostName } from '../../environments/environment';
import { ProgressBarService } from '../shared/services/progress-bar.service';

@Injectable()
export class HttpHelper {

  constructor(
    private http: HttpClient,
    private progressBarService: ProgressBarService
  ) { }

  get(url: string, params: HttpParams, token: string) {
    this.showLoader();
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
        finalize(() => this.hideLoader())
      );
  }

  post(url: string, data: object, params: HttpParams, token: string) {
    this.showLoader();
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
        finalize(() => this.hideLoader())
      );
  }

  put(url: string, data: object, params: HttpParams, token: string) {
    this.showLoader();
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
        finalize(() => this.hideLoader())
      );
  }

  delete(url: string, params: HttpParams, token: string) {
    this.showLoader();
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
        finalize(() => this.hideLoader())
      );
  }

  postForm(url: string, data: FormData, params: HttpParams, token: string) {
    this.showLoader();
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
        finalize(() => this.hideLoader())
      );
  }

  private handleError = (error: any): Observable<any> => {
    if (error.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      window.location.href = hostName;
    } else if (error.status === 402) {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      window.location.href = hostName;
    } else {
      console.error('An error occurred', error);
    }
    return Observable.create((observer: any) => {
      observer.next(error.message || error);
      observer.complete();
    });
  }

  private showLoader(): void {
    this.progressBarService.show();
  }
  private hideLoader(): void {
    this.progressBarService.hide();
  }
}
