import { Component, OnInit } from '@angular/core';
import { UserService} from '../../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(public userService : UserService,private router : Router) { }

  ngOnInit(): void {
   
    if(parseInt(localStorage.getItem('qnProgress')) == 10){
      this.userService.seconds = parseInt(localStorage.getItem('seconds'));
      this.userService.qnProgress = parseInt(localStorage.getItem('qnProress'));
      this.userService.qns = JSON.parse(localStorage.getItem('qns'));
    
   
    this.userService.getAnswers().subscribe(
      (data : any) =>{
        this.userService.correctAnswerCount = 0;
        this.userService.qns.forEach((e,i)=>{
          if(e.answer == data[i])
          this.userService.correctAnswerCount++;
          e.correct = data[i];
        });
      }
    );
  }
  else
  this.router.navigate(['/quiz']);
  }

  OnSubmit(){
    this.userService.submitScore().subscribe(() => {
    this.restart();
    });
  }
  restart(){
    localStorage.setItem('qnProgress' , "0");
    localStorage.setItem('qns' , "");
    localStorage.setItem('seconds' , "0");
    this.router.navigate(['/quiz']);
  }

}
