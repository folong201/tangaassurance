import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AssuranceService } from 'src/app/services/assurance/assurance.service';
import { UserService } from 'src/app/services/users/user.service';


@Component({
  selector: 'app-assurancelist',
  templateUrl: './assurancelist.component.html',
  styleUrls: ['./assurancelist.component.css']
})
export class AssurancelistComponent implements AfterViewInit {
  constructor(private userService: UserService, private assuranceServive: AssuranceService) { }
  displayedColumns: string[] = ['name', 'begin', 'end', 'status', 'action'];
  dataSource !: MatTableDataSource<any>;
  user = []
  assurances!: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {

    // this.getUser()
    this.gatAllAssurance()
  }

  gatAllAssurance() {
    this.assuranceServive.getAssurances().subscribe({
      next: (res: any) => {
        console.log(res)
        this.assurances = res
        this.dataSource = new MatTableDataSource<any>(res);
      }, error: (err: any) => {
        console.log(err)
      }
    }
    )
  }

  getUser(){
    this.userService.getUsers().subscribe((res: any) => {
      this.user = res
      this.dataSource = new MatTableDataSource<any>(this.user);
      console.log(this.user)
      this.dataSource.paginator = this.paginator;
    })
  }

}
