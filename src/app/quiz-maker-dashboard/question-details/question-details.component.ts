import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css'],
})
export class QuestionDetailsComponent implements OnInit, OnChanges {
  @Input() questDetails: any;
  allQuest = [];
  isSubmit = [];
  count: number = 0;

  constructor(private router: Router, private sharedService: SharedService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.allQuest = [];
    this.isSubmit = [];
    let questDetails = JSON.parse(JSON.stringify(this.questDetails));
    questDetails.forEach((ele) => {
      let quest = [];
      if (ele.correct_answer) {
        quest.push(ele.correct_answer);
      }
      if (ele.incorrect_answers) {
        ele.incorrect_answers.forEach((data) => {
          quest.push(data);
        });
      }
      this.shuffle(quest);
      this.allQuest.push(quest);
    });
  }

  //To display the answers randomly
  shuffle(a): void {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // fetch selected button values i.e., selected answer for each question
  getAnswer(val, i): any {
    this.isSubmit[i] = val;
    console.log(this.isSubmit);
    this.count = 0;
    this.isSubmit.forEach((ele) => {
      if (ele) {
        this.count = 1 + this.count;
      }
    });
  }

  // submit answer
  onSubmit(): any {
    this.sharedService.sharedData.next({
      submittedData: this.isSubmit,
      questDetails: this.questDetails,
    });
    this.router.navigate(['/results']);
  }
}
