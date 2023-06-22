import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShowResultsComponent } from './show-results/show-results.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent,
  },
  {
    path: 'create',
    component: CategoryListComponent,
  },
  {
    path: 'results',
    component: ShowResultsComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [
    RouterModule,
    CategoryListComponent,
    QuestionDetailsComponent,
    ShowResultsComponent,
  ],
  declarations: [
    CategoryListComponent,
    QuestionDetailsComponent,
    ShowResultsComponent,
  ],
})
export class QuizMakerDashboardModule {}
