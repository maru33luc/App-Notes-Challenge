import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn () {
    // return !!localStorage.getItem('token')
  }

  getToken () {
    // return localStorage.getItem('token')
  }

  getUserName () {
    // return localStorage.getItem('userName')
  }

  logout () {
    // localStorage.removeItem('token')
    // localStorage.removeItem('userName')
  }
}
