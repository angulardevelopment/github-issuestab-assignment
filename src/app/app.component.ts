import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { combineLatest, from, Observable, of, throwError } from 'rxjs';
import { catchError, concatAll, map, mergeMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'github';
  place: string;
  language: string;
  results: any = []; // This will hold the data coming from the service
  selected: boolean = false; // Flag to check if a user is clicked or not
  selectedUser: any; // presently Selected user details
  error_text: string = ''; // So called error reporing text to the end user
  private searchUsersEndPoint = `${environment.apiURl}/search/users?q=`;
  private getUserDetailsEndPoint = `${environment.apiURl}/users/`;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.gitApis();
    this.gitApisUsername('sunny7899');
  }

  // api
  search(place: string, language: string) {
    this.selected = false;
    this.error_text = '';
    if (place || language) {
      this.place = place;
      this.language = language;
      this.getUsersByPlaceAndLanguage(place, language).subscribe(
        (users) => {
          this.results = users['items'];
        },
        (error) => {
          console.error(error, 'errorplaace');
          this.results = [];
          this.error_text = 'Sorry! No Users found. Try again';
        }
      );
    }
  }
  // user
  getDetails(username: string) {
    this.getDetailsByUserName(username).subscribe(
      (userDatils) => {
        this.selectedUser = userDatils;
        this.selected = true;
      },
      (error) => {
        console.error(error, 'errorname');
        this.selected = false;
      }
    );
  }

  // url
  getUsersByPlaceAndLanguage(place: string, language: string) {
    let url;
    if (place && !language) {
      url = `${this.searchUsersEndPoint}location:${place}`;
    } else if (!place && language) {
      url = `${this.searchUsersEndPoint}language:${language}`;
    } else {
      url = `${this.searchUsersEndPoint}location:${place}+language:${language}`;
    }
    return this.http.get(url).pipe(
      map((res) => {
        return res;
      })
    );
  }

  // Only
  getDetailsByUserName(username: string) {
    if (username) {
      let url = `${this.getUserDetailsEndPoint}${username}`;
      return this.http.get(url).pipe(catchError(this.handleError));
    }
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = error.message
      ? error.message
      : error.status
      ? `${error.status} - ${error.statusText}`
      : 'Server error';
    console.error('err' + errMsg); // log to console instead
    return throwError(errMsg);
  }

  // https://docs.github.com/en/rest?apiVersion=2022-11-28#pagination
  // https://docs.github.com/en/rest/repos#list-repositories-for-a-user
  // https://docs.github.com/en/graphql/overview/explorer

  // type (string): Can be one of all, owner, member. Default: owner
  // sort (string): Can be one of created, updated, pushed, full_name. Default: full_name
  // direction (string): Can be one of asc or desc. Default: asc when using full_name, otherwise desc
  // page (integer): Current page
  // per_page (integer): number of records per page

  gitApis(orgName) {
    this.http
      .get('https://api.github.com/orgs/angulardevelopment/repos?per_page=100')
      .subscribe((res: any) => {
        let result = res.map((a) => a.clone_url);
        console.log(res, result);
      });

      const req1 = `https://api.github.com/orgs/${orgName}/repos?per_page=100`
      const req2 = `${environment.apiURl}/orgs/${orgName}/repos`
      // const requests = [req1,req2,req3,..., reqN]


  }

  gitApisUsername(userName) {
    const req1 = `https://api.github.com/users/${userName}/repos`;
    const req2 = ` https://api.github.com/users/${userName}/repos?per_page=100`;
    const req3 = `https://api.github.com/users/${userName}/repos?page=2`;
    const requests = [this.commonGet(req1),this.commonGet(req2),this.commonGet(req3)];

    let allObservables$ = from(requests)

    allObservables$.pipe(
      concatAll()
    
    ).subscribe((x) => {
          console.log(x, 'res', this.getAllGitReposUrl(x))
    })
    }

    commonGet(url){
     return this.http.get(url);
    }

    getAllGitReposUrl(res){
return res.map((a) => a.clone_url);
    }


  }


