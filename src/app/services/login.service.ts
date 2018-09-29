import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable()
export class LoginService {

  private loginUrl = 'http://localhost:8080/api/login';
  private logoutUrl = 'http://localhost:8080/api/logout';
  loggedIn = false;

  private userLoginSource = new Subject<LoginUser>();
  userLogin$ = this.userLoginSource.asObservable();

  constructor(private http: HttpClient) { }

  login(user: LoginUser) {
    return this.http.post(this.loginUrl, user)
      .pipe(tap(res => {
        if (res) {
          this.userLogin(user);
        }
      }));
  }

  logout() {
    return this.http.get(this.logoutUrl)
      .pipe(tap(res => this.userLogout()));
  }

  userLogin(user: LoginUser) {
    this.loggedIn = true;
    this.userLoginSource.next(user);
  }

  userLogout() {
    this.loggedIn = false;
    this.userLoginSource.next(null);
  }

}

export class LoginUser {
  username: string;
  password: string;
}
