import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-adminskeleton',
  templateUrl: './adminskeleton.component.html',
  styleUrls: ['./adminskeleton.component.css']
})
export class AdminskeletonComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router, public loaderService:LoaderService){}
  ngOnInit(): void {
  }
  logout(){
    this.authService.logout()
    this.router.navigate(['/auth/login'])
  }
  showFiller=false
}
