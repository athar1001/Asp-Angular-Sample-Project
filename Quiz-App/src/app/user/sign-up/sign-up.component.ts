import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/user.model';
import { UserService } from '../../shared/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form? : NgForm)
  {
    if(form !=null)
    form.reset();
    this.user = {
      UserName:'',
      Password:'',
      Email:'',
      FirstName:'',
      LastName:''
    }

  }

  OnSubmit(form : NgForm)
  {
    this.userService.resgisterUser(form.value)
    .subscribe((data: any) => {
      localStorage.setItem('participant',JSON.stringify(data));
      if(data.succeeded == true){
        this.resetForm(form);

      }
    });

  }
}
