import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-userdashboardskeleton',
  templateUrl: './userdashboardskeleton.component.html',
  styleUrls: ['./userdashboardskeleton.component.css']
})
export class UserdashboardskeletonComponent  implements OnInit{
  constructor(private authService:AuthService,private router:Router,public loaderService:LoaderService){}
  ngOnInit(): void {
  }

  showFiller = false;
  logout(){
    this.authService.logout()
    this.router.navigate(['/auth/login'])
  }
}
