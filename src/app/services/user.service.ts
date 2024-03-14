import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private userInfo: any;

  setUserInfo(user: any): void {
    this.userInfo = user;
    sessionStorage.setItem('userInfo', JSON.stringify(user));
  }

  getUserInfo(): any {
    return this.userInfo || JSON.parse(sessionStorage.getItem('userInfo') || '{}');
  }
}
