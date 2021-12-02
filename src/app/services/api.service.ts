import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  public getRequest(url) {
    return this.http.get(url).pipe(
      map(res => {
        return res;
      }),
    );
  }

  handleError(err){

  }
}
