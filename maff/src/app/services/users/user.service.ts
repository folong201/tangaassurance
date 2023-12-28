import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backend } from 'src/app/env';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  base = backend+'users/'
  constructor(private http:HttpClient) { }

  getUsers() {
    return this.http.get(`${this.base}`)
  }
  createUser(data:any) {
    return this.http.post(`${this.base}`, data)
  }
  updateUser(id:string, data:any) {
    return this.http.put(`${this.base}${id}`, data)
  }
  deleteUser(id:string) {
    return this.http.delete(`${this.base}${id}`)
  }
  getById(id:string) {
    return this.http.get(`${this.base}${id}`)
  }

}
