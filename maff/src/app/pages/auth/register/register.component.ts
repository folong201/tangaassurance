import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm = this.fb.group({
    password: ['', Validators.required],
    phone: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', Validators.required]
  });

  showerr = false;
  errmsg = '';
  subscription!: Subscription;

  constructor(private fb: FormBuilder, private authService: AuthService,private router:Router) { }

  ngOnInit() {
  }

  register() {
    console.log(this.registerForm.value);
    if (!this.registerForm.valid) {
      this.showerr = true;
      this.errmsg = 'Please fill in all fields';
    } else {
      this.showerr = false;
      this.errmsg = '';
      console.log(this.registerForm.value);

      this.subscription = this.authService.login(this.registerForm.value).subscribe({
        next:(responce:any)=>{
          var res = this.authService.setSession(responce.data)
          this.router.navigateByUrl(`/${res}`)
        },
        error:(error:any)=>{
          this.errmsg = "desole veuiller verifier votre connexion"

        }
      });

    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

  // this.subscription.subscribe(
  //   (response) => {
  //     // Handle successful login response here
  //     console.log(response);
  //   },
  //   (error) => {
  //     // Handle error during login here
  //     console.error(error);
  //   }
  // );
