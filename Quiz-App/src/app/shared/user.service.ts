import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Response } from "@angular/http";
import {Observable} from 'rxjs';
//import 'rxjs/add/operator/map';
import { User } from './user.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootUrl = 'http://localhost:18267';
  qns: any[];
  seconds: number;
  timer;
  qnProgress: number;
  correctAnswerCount: number = 0;

  constructor(private http: HttpClient) { }

  resgisterUser(user : User)
  {
    const data: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl + '/api/User/Register', data,{headers : reqHeader});

  }

  userAuthentocatioin(userName,password){
    var data = "username="+userName+"&password="+password+"&grant_type=password";
    var reqheader = new HttpHeaders({'content-type':'application/x-www-urlencoded','No-Auth':'True'});
    return this.http.post(this.rootUrl+'/token',data,{headers: reqheader});
  }
  getUserClaims(){
    return this.http.get(this.rootUrl+'/api/GetUserClaims');
  }
  getQuestions(){
    return this.http.get(this.rootUrl+'/api/Questions');
  }
  displayTimeElapsed(){
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }
  getAnswers(){
    var body =this.qns.map(x => x.QnID);
    return this.http.post(this.rootUrl + 'api/Answers' , body);
  }
  getParticipantName(){
    var participant = JSON.parse(localStorage.getItem('participant'));
    return participant.FirstName;
  }
  submitScore(){
    var body = JSON.parse(localStorage.getItem('participant'));
    body.Score = this.correctAnswerCount;
    body.TimeSpent = this.seconds;
    return this.http.post(this.rootUrl + "/api/UpdateOutput", body);
  }
}
