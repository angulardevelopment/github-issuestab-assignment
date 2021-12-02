import { ErrorComponent } from './error/error.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { IssuesListComponent } from './issues-list/issues-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [


{
  path: '',
  component: IssuesListComponent,
},
{
  path: 'detail/:id',
  component: IssueDetailComponent,
},
{
  path:'**',
  component:ErrorComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
