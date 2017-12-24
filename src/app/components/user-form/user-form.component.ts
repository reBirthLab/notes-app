import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../../model/User';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  private usersUrl = 'http://localhost:8080/users';

  user: User;

  constructor(private http: HttpClient, private router: Router) {
    this.user = new User();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.http.post<User>(this.usersUrl, this.user).subscribe(res => {
      this.router.navigateByUrl("");
    });
  }

}