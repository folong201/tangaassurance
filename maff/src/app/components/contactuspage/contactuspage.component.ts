import { Component } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-contactuspage',
  templateUrl: './contactuspage.component.html',
  styleUrls: ['./contactuspage.component.css']
})
export class ContactuspageComponent {
  constructor(private messageService: MessageService) { }
  name: string = '';
  email: string = '';
  content: string = '';
  phone: string = '';
  showerr = false
  errMessage =''
  submitForm() {
    if (this.validateForm()) {
      const message = {
        name: this.name,
        email: this.email,
        content: this.content,
        phone: this.phone
      }
      this.messageService.contactAdmin(message).subscribe({
        next:( data:any) => {
          console.log(data);
          //reinitialiser les donnees
          this.name = '';
          this.email = '';
          this.content = '';
          this.phone = '';

        },
        error:(err:any) => {
          console.log(err);
          this.name = '';
          this.email = '';
          this.content = '';
          this.phone = '';
          this.errMessage = err.error.message
          this.showerr = true
        }
      })
    }else{
      this.errMessage = "Please fill all the fields"
      this.showerr = true
    }
  }

  validateForm(): boolean {
    if (this.name.trim() === '') {
      console.log('Please enter your name');
      return false;
    }
    if (this.email.trim() === '') {
      console.log('Please enter your email');
      return false;
    }
    if (this.content.trim() === '') {
      console.log('Please enter your message');
      return false;
    }
    if (this.phone.trim() === '') {
      console.log('Please enter your phone number');
      return false;
    }
    return true;
  }
}
