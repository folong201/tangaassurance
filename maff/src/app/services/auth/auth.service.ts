import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backend } from 'src/app/env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  base = backend
  constructor(private http: HttpClient) { }

  login(user: any) {
    return this.http.post(`${this.base}auth/login`, user)
  }

  register(user: any) {
    return this.http.post(`${this.base}auth/register`, user)
  }

  logout() {
    localStorage.clear()
  }

  setSession(data: any) {
    //configurer la session
    localStorage.setItem('token', data.token)
    localStorage.setItem('role', data.user.role)
    localStorage.setItem('id', data.user._id)
    localStorage.setItem('name', data.user.name)
    localStorage.setItem('email', data.user.email)
    localStorage.setItem('phone', data.user.phone)

    if (data.user.role == "admin") {
      return "admin"
    } else {
      return "user"
    }
  }
}
