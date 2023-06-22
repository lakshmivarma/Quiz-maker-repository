import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable()
export class SharedService {
  public sharedData = new BehaviorSubject<any>(null);
  public sharedData$ = this.sharedData.asObservable();
  public questList = new BehaviorSubject<any>(null);
  public questList$ = this.questList.asObservable();

  //base url
  public hostUrl = 'https://opentdb.com';

  constructor(private http: HttpClient) {}

  //API call to get the list of categories 
  getTriviaCategories(): Observable<any> {
    const baseUrl = `${this.hostUrl}/api_category.php`
    return this.http.get(baseUrl);
  }

//API call to get the list of questions
  getquestionarie(payload: any) {
    const baseUrl = `${this.hostUrl}/api.php?amount=${payload.amount}&category=${payload.category}&difficulty=${payload.difficulty}&type=${payload.type}`
    return this.http.get(baseUrl)
  }

}