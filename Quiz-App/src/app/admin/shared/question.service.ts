import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { httpclient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  formData : Question;
  list : Question[];
  readonly rootURL = "http://localhost:18267/api"

  constructor(private http : httpclient) { }

  postQuestion(formData : Question){
   return this.http.post(this.rootURL+'/Question' ,formData);

  }

  refreshQuestionList(){
    return this.http.get(this.rootURL+'/Question')
    .toPromise().then(res => this.list = res as Question[]);
  }
}
