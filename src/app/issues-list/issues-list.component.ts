import { environment } from './../../environments/environment';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})
export class IssuesListComponent implements OnInit {
  data;
  searchText;
  counter = 1;
  constructor(public api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getList();
  }

  async getList() {
    // https://api.github.com/search/issues?q=repo:angular/angular/node+type:issue+state:open&per_page=10&page=1
    const data = await this.api.getRequest(environment.apiURl + '/search/issues?q=repo:angular/angular/node+type:issue+state:open&per_page=10&page=1').toPromise();
    console.log(data, 'data');
    this.data = data['items'];

  }

  other(id) {
    this.router.navigate(['detail/', id]);

  }

  async searchissue() {
    const data = await this.api.getRequest(environment.apiURl + `/search/issues?q=repo:angular/angular/node+type:${this.searchText}+state:open&per_page=10&page=1`).toPromise();
    console.log(data, 'data');
    this.data = data['items'];
  }

  async updateList(type) {
    switch (type) {
      case 'next':
        this.counter += 1;
        break;
      case 'prev':

        if (this.counter > 0) {
          this.counter -= 1;
        }
        break;

      case 'first':
        this.counter = 1;
        break;
      case 'second':
        this.counter = 2;
        break;
      case 'third':
        this.counter = 3;
        break;
      default:
        break;

    }
    if (this.counter) {


      const data = await this.api.getRequest(environment.apiURl + `/search/issues?q=repo:angular/angular/node+type:issue+state:open&per_page=10&page=${this.counter}`).toPromise();
      console.log(data, 'data');
      this.data = data['items'];
    }
  }

  async searchByLabel(lblTxt, event){
    event.preventDefault();
    event.stopPropagation();
    // https://github.com/angular/angular/issues?q=is%3Aissue+is%3Aopen+label%3A%22comp%3A+compiler%22
    const data = await this.api.getRequest(environment.apiURl + `/search/issues?q=type:issue+state:open+label:${lblTxt}&per_page=10&page=${this.counter}`).toPromise();
    console.log(data, 'data');
    this.data = data['items'];

  }


}
