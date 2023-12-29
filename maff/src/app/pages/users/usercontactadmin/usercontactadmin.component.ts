import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-usercontactadmin',
  templateUrl: './usercontactadmin.component.html',
  styleUrls: ['./usercontactadmin.component.css']
})
export class UsercontactadminComponent implements OnInit {
  constructor(private messageService: MessageService, private fb: FormBuilder) { }
  showerr = false
  contactForm = this.fb.group({
    name: [''],
    email: [''],
    phone: [''],
    content: ['']
  });
  subscriber !: Subscription
  message!:any

  ngOnInit() {
  }
  contact() {
    console.log(this.contactForm.value);
    // Envoyer le message
    this.message = this.contactForm.value
    this.message.user = localStorage.getItem('userid')
    this.subscriber = this.messageService.contactAdmin(this.contactForm.value).subscribe({
      next: (res: any) => {
        // Message envoyé avec succès
        this.showerr = false;
        // Réinitialiser le formulaire
        console.log(res);

        this.contactForm.reset();
      },
      error: (error: any) => {
        // Erreur lors de l'envoi du message
        this.showerr = true;
        console.error(error);
      }
    }
    );
  }

}
