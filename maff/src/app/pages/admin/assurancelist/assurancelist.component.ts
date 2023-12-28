import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/users/user.service';


@Component({
  selector: 'app-assurancelist',
  templateUrl: './assurancelist.component.html',
  styleUrls: ['./assurancelist.component.css']
})
export class AssurancelistComponent implements AfterViewInit {
  constructor(private userService: UserService) { }
  displayedColumns: string[] = ['name', 'email', 'phone', 'role'];
  dataSource !: MatTableDataSource<any>;
  user = []

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {

    this.userService.getUsers().subscribe((res: any) => {
      this.user = res
      this.dataSource = new MatTableDataSource<any>(this.user);
      console.log(this.user)
      this.dataSource.paginator = this.paginator;
    })
  }

}
