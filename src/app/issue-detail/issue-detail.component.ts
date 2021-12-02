
import { ApiService } from './../services/api.service';
import { environment } from './../../environments/environment';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit {
  detail;
  constructor(public api: ApiService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {

      console.log(params);
      this.getDetail(params.id);
    }, error => { });

  }

  ngOnInit(): void {
    console.log();

  }

  async getDetail(id) {

    const data = await this.api.getRequest(environment.apiURl + '/repos/angular/angular/issues/' + id).toPromise();
    console.log(data, 'data');
    this.detail = data;

  }

}
