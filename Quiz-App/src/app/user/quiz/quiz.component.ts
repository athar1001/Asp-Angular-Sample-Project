import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService} from '../../shared/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private router: Router, public userService: UserService) { }

  ngOnInit(): void {

    if(parseInt(localStorage.getItem('seconds')) > 0){
      this.userService.seconds = parseInt(localStorage.getItem('seconds'));
      this.userService.qnProgress = parseInt(localStorage.getItem('qnProress'));
      this.userService.qns = JSON.parse(localStorage.getItem('qns'));
      if(this.userService.qnProgress == 10)
      this.router.navigate(['/result']);
      else
      this.startTimer();
    }
    else{
      this.userService.seconds = 0;
      this.userService.qnProgress = 0;
      this.userService.getQuestions().subscribe(
        (data : any) => {
          this.userService.qns = data;
          this.startTimer();
        }
      );
    }
    this.userService.seconds = 0;
    this.userService.qnProgress = 0;

    this.userService.getQuestions().subscribe(
      (data:any)=>{
        this.userService.qns = data;
        this.startTimer();
      }
    );
  }

  startTimer(){
    this.userService.timer = setInterval(() => {
      this.userService.seconds++;
      localStorage.setItem('seconds',this.userService.seconds.toString());
    }, 1000);
  }
  Answer(qID,choice){
    this.userService.qns[this.userService.qnProgress].answer = choice;
    localStorage.setItem('qns', JSON.stringify(this.userService.qns));
    this.userService.qnProgress++;
    localStorage.setItem('qnProgress', this.userService.qnProgress.toString());
    if(this.userService.qnProgress == 10){
      clearInterval(this.userService.timer);
      this.router.navigate(['/result']);
    }

  }

}
