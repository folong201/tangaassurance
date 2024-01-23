import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backend } from 'src/app/env';

@Injectable({
  providedIn: 'root'
})
export class AssuranceService {
  base = backend + "assurances/"
  constructor(private http: HttpClient) { }

  getAssurances() {
    return this.http.get(`${this.base}`)
  }

  getAssurance(id:string) {
    return this.http.get(`${this.base}${id}`)
  }

  addAssurance(data:any) {
    return this.http.post(`${this.base}`, data)
  }
  updateAssurance( data:any) {
    return this.http.put(`${this.base}update/${data._id}`, data)
  }
  deleteAssurance(id:string) {
    return this.http.delete(`${this.base}${id}`)
  }
  getByUserId(id:string) {
    return this.http.get(`${this.base}user/${id}`)
  }
  getExpiredAssurance(){
    return this.http.get(`${this.base}expired/get`)
  }
  renewAssurance(assurance:any){
    return this.http.put(`${this.base}renew/${assurance._id}`,assurance)
  }
}
