import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    password: ['', Validators.required],
    phone: ['', Validators.required]
  });
  showerr = false
  errmsg = ''
  subscription!: Subscription
  constructor(private fb: FormBuilder, private aurhService: AuthService, private route: Router) { }

  ngOnInit() {
  }


  login() {
    console.log(this.loginForm.value);
    if (this.loginForm.value.password == '' && this.loginForm.value.phone == '') {
      this.showerr = true
      this.errmsg = 'Please enter your email or phone'
    }
    else {
      this.subscription = this.aurhService.login(this.loginForm.value).subscribe({
        next: (responce: any) => {
          this.showerr = false
          if(responce.ok === "true"){
            console.log(responce);

            var res = this.aurhService.setSession(responce)
            console.log(res)
            this.route.navigateByUrl(`/${res}`)
          }else{
            this.errmsg = "Information incorect"
            this.showerr = true
          }
        },
        error: (error: any) => {
          console.log("erreur requette non envoyer");

          this.errmsg = "desole veuiller verifier votre connexion"
          this.showerr = true
        }
      })
    }
  }

}
