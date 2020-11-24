import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService} from '../../shared/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router : Router,private userService: UserService) { }

  ngOnInit(): void {
  }

  Logout(){
    localStorage.removeItem('userToken');
    clearInterval(this.userService.timer);
    this.router.navigate(['/login']);
  }

}
