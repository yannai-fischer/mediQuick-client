import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../utils/interfaces";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn:boolean;
  user!: User;

  constructor(private userService: UserService) {
    this.isLoggedIn = false;
  }

  ngOnInit(): void {
    this.userService.userObservable$.subscribe((user: User) => {
      this.isLoggedIn = !!user?.id;
      return this.user = user;
    });
  }

  logOut(): void{
    this.userService.logout();
  }
}
