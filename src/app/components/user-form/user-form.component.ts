import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../../model/User';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  private usersUrl = 'http://localhost:8080/api/users';

  user: User;

  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) {
    this.user = new User();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.http.post<User>(this.usersUrl, this.user).subscribe(res => {
      this.loginService.login({
        username: this.user.name,
        password: this.user.password
      }).subscribe(res => {
        if (res) this.router.navigateByUrl("/");
      });
    });
  }

}