import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backend } from 'src/app/env';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  base = backend+ "messages/"
  constructor(private http:HttpClient) { }

  contactAdmin(message:any){
    return this.http.post(`${this.base}`,message)
  }
  getAllMessages(){
    return this.http.get(`${this.base}`)
  }
  update(messageid:any){
    return this.http.get(`${this.base}update/${messageid}`)
  }
}
