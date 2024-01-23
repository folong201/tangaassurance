import { Component, AfterViewInit, ViewChild, ChangeDetectorRef, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/users/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router, RouterModule } from '@angular/router';
import { AssuranceService } from 'src/app/services/assurance/assurance.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-arelancer',
  templateUrl: './arelancer.component.html',
  styleUrls: ['./arelancer.component.css']
})
export class ArelancerComponent implements AfterViewInit {
  constructor(private userService: UserService, private assuranceServive: AssuranceService,
    private assuranceService: AssuranceService,
    private router: Router,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef) { }
  displayedColumns: string[] = ['name', 'begin', 'end', 'status', 'action'];
  dataSource !: MatTableDataSource<any>;
  user = []
  assurances!: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.getExpiredAssurance()
  }


  getExpiredAssurance() {
    this.assuranceServive.getExpiredAssurance().subscribe({
      next: (res: any) => {
        console.log("expired assurance");

        console.log(res)
        this.assurances = res
        this.dataSource = new MatTableDataSource<any>(res);
      }, error: (err: any) => {
        console.log(err)
      }
    }
    )

  }

  renew(assurance:any){
    const dialogRef = this.dialog.open(UpdateAssuranceDialog, {
      data: assurance,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.assuranceService.renewAssurance(result).subscribe({
        next: (res: any) => {
          console.log(res)
          this.getExpiredAssurance()
        }, error: (error: any) => {
          console.log(error)
        }
      })
    });
  }
}


@Component({
  selector: 'update-assurance-dialog',
  templateUrl: 'update-assurance-dialog.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
})
export class UpdateAssuranceDialog {
  constructor(
    public dialogRef: MatDialogRef<UpdateAssuranceDialog>,
    @Inject(MAT_DIALOG_DATA) public assurance: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
