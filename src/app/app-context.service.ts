import { Injectable } from '@angular/core';

export const DataServiceConst = {
  LIST_USERS: '/api/users',
  REGISTER: '/api/register',
  LOGIN:'/api/login'
}

@Injectable({
  providedIn: 'root'
})
export class AppContextService {
  isLoggedIn = false;
  loggedInUserEmail = null;
  constructor() { }
  createSession(email){
    this.loggedInUserEmail = email;
    this.isLoggedIn = true;
  }
  destroySession(){
    this.loggedInUserEmail = null;
    this.isLoggedIn = false;
  }
}
