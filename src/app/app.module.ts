import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from './shared/shared.service';
import { QuizMakerDashboardModule } from './quiz-maker-dashboard/quiz-maker-dashboard.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    QuizMakerDashboardModule,
  ],
  declarations: [AppComponent],
  providers: [SharedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
