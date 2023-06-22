import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-show-results',
  templateUrl: './show-results.component.html',
  styleUrls: ['./show-results.component.css'],
})

export class ShowResultsComponent implements OnInit {
  questDetails = [];
  allQuest = [];
  isCorrect = [];
  submittedData = [];
  score: number = 0;
  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.sharedData$.subscribe((data) => {
      if (data) {
        this.questDetails = data.questDetails;
        this.submittedData = data.submittedData;
        this.fetchSubmittedData();
      }
    });
  }

  // get submitted details by user
  fetchSubmittedData() {
    this.isCorrect = [];
    this.allQuest = [];
    this.questDetails.forEach((ele) => {
      let quest = [];
      if (ele.correct_answer) {
        this.isCorrect.push(ele.correct_answer);
        quest.push(ele.correct_answer);
      }
      if (ele.incorrect_answers) {
        ele.incorrect_answers.forEach((data) => {
          quest.push(data);
        });
      }
      this.allQuest.push(quest);
    });
    this.getResult();
  }

  // to display score based on submitted data
  getResult() {
    let score = 0;
    this.submittedData.forEach((value, i) => {
      if (this.isCorrect[i] === value) {
        score = score + 1;
      }
    });
    this.score = score;
  }
}
