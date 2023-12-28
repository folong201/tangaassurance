import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AssuranceService } from 'src/app/services/assurance/assurance.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit{
  constructor(private assuranceservice:AssuranceService){}
  ngOnInit(): void {
    this.getMyAssurance()
  }
subscriber !:Subscription
assurances !:any
  getMyAssurance(){
    this.subscriber = this.assuranceservice.getByUserId(localStorage.getItem('id') || '').subscribe({
      next:(responce:any)=>{
        console.log(responce);
        this.assurances = responce.assurances
      },
      error:(error:any)=>{
        console.log(error);

      }
    })
  }
}
