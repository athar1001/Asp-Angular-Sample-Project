import { Component, OnInit } from '@angular/core';
import { UserService} from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isLoginError : boolean = false;
  constructor(private userService : UserService,private router : Router) { }

  ngOnInit(): void {
  }

  OnSubmit(userName,passowrd)
  {
    this.userService.userAuthentocatioin(userName,passowrd).subscribe((data : any)=>{
    localStorage.setItem('userToken',data.access_token);
    this.router.navigate(['/quiz']);
    },
    (err : HttpErrorResponse)=>{
      this.isLoginError = true;
    })

  }

}
