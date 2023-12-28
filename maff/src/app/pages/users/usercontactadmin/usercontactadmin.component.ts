import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-usercontactadmin',
  templateUrl: './usercontactadmin.component.html',
  styleUrls: ['./usercontactadmin.component.css']
})
export class UsercontactadminComponent implements OnInit{
  showerr = false
  contactForm = this.fb.group({
    name: [''],
    email: [''],
    phone: [''],
    message: ['']
  });
    constructor(private fb:FormBuilder) { }

    ngOnInit() {
    }
    contact() {
    }
}
