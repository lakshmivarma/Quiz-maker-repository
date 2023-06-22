import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { difficultyLevels } from '../quiz-maker-dashboard.constants';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categoryList = [];
  @Output() selectedList = new EventEmitter<any>();
  difficultyLevels = difficultyLevels;
  selectedDetails: object = {};
  questDetails = [];

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.fetchCategories();
  }

  // To get the category list from the API
  fetchCategories(): void {
    this.sharedService.getTriviaCategories().subscribe((data: any) => {
      this.categoryList = [];
      if (
        data &&
        data['trivia_categories'] &&
        data['trivia_categories'].length > 0
      ) {
        const categoryList = JSON.parse(
          JSON.stringify(data['trivia_categories'])
        );
        this.categoryList = JSON.parse(JSON.stringify(categoryList));
      }
    });
  }

  // To get the Questionarie from the API
  fetchQuestionarie(category, difficulty) {
    const payload = {
      amount: 5,
      category,
      difficulty,
      type: 'multiple',
    };
    this.questDetails = [];
    this.sharedService.getquestionarie(payload).subscribe((value: any) => {
      this.questDetails = value['results'];
    });
  }

  // prepared method to pass category and difficulty to get question API
  getSelectedList(e) {
    this.fetchQuestionarie(e.id, e.key);
  }

    // get selected category dropdown value
  selCategory(e) {
    this.selectedDetails['id'] = e.target.value;
  }

  // get selected difficulty dropdown value
  selDifficulty(e) {
    this.selectedDetails['key'] = e.target.value;
  }

  // method to call API based on category and difficulty
  fetchQuest() {
    this.fetchQuestionarie(
      this.selectedDetails['id'],
      this.selectedDetails['key']
    );
  }
}
