import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IssuesListComponent } from './issues-list/issues-list.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
@NgModule({
  declarations: [
    AppComponent,
    IssuesListComponent,
    IssueDetailComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
