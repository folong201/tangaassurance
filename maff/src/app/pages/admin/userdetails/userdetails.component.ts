import { Component, AfterViewInit, ViewChild, OnDestroy, Inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/users/user.service';
import { Router, RouterModule } from '@angular/router';
import { AssuranceService } from 'src/app/services/assurance/assurance.service';
import { Subscription } from 'rxjs';
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

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css'],
})
export class UserdetailsComponent implements AfterViewInit ,OnInit{
  constructor(private userService: UserService,
    private assuranceService: AssuranceService,
    private router: Router,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.userid = this.router.url.split('/')[3]
    this.getUser()
    // this.getUserAssurance()
    // this.show = true
  }
  displayedColumns: string[] = ['name', 'begin', 'end', 'status', 'editer'];
  dataSource !: MatTableDataSource<any>;
  user !: any
  userid = ''
  show = false
  assurances!: any
  subcribere !: Subscription

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.cdRef.detectChanges();
    this.userid = this.router.url.split('/')[3]
    this.getUser()
    this.getUserAssurance()
    this.show = true
  }
  OnDestroy() {
    if (this.subcribere) {
      this.subcribere.unsubscribe()
    }

  }
  getUser() {
    this.subcribere = this.userService.getById(this.userid).subscribe({
      next: (res: any) => {
        this.user = res
        console.log("utilisateur recuperer");

        console.log(res);

      }, error: (error: any) => {
        console.log(error)
      }
    })

  }
  getUserAssurance() {
    this.subcribere = this.assuranceService.getByUserId(this.userid).subscribe({
      next: (res: any) => {
        this.user = res
        console.log("liste des assurance de l'utilisateur");
        this.assurances = res.assurances
        this.dataSource = new MatTableDataSource<any>(this.assurances);
        this.dataSource.paginator = this.paginator;
      }, error: (error: any) => {
        console.log(error)
      }
    })
  }
  getDifferenceInWeeks(date1: any, date2: any) {
    const date1Millis = Date.parse(date1);
    const date2Millis = Date.parse(date2);
    const diffMillis = Math.abs(date2Millis - date1Millis);
    const diffWeeks = Math.round(diffMillis / (1000 * 60 * 60 * 24 * 7));

    return diffWeeks;
  }

  //creation de l'assurance
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      result.user = this.userid

      result.long = this.getDifferenceInWeeks(result.begin, result.end)
      console.log('The dialog was closed');
      console.log('These are assurance data');
      console.log(result);
      this.subcribere = this.assuranceService.addAssurance(result).subscribe({
        next: (res: any) => {
          console.log(res)
          this.subcribere = this.assuranceService.getByUserId(this.userid).subscribe({
            next: (res: any) => {
              console.log("donne enregistrer avec sucees");
              this.user = res.assurance
              this.ngAfterViewInit()
            }, error: (error: any) => {
              console.log(error)
            }
          })
        }, error: (error: any) => {
          console.log(error)
        }
      })
      //calculer la dureer de l'assurance en semaine

    });
  }
  //metre a jour l'assurance
  updateassurance(assurance: any): void {
    const dialogRef = this.dialog.open(UpdateAssuranceDialog, {
      data: assurance,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.assuranceService.updateAssurance(result).subscribe({
        next: (res: any) => {
          console.log(res)

          this.getUserAssurance();
        }, error: (error: any) => {
          console.log(error)
        }
      })
    });
  }
  //mise a jour de l'utilisateur
  openUpdateuser(user: any): void {
    var userToUpdate = this.user
    userToUpdate.password = ''
    const dialogRef = this.dialog.open(UpdateUserDialog, {
      data: userToUpdate,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.subcribere = this.userService.updateUser(this.user._id, result).subscribe({
        next: (responce: any) => {
          console.log("reponce ce la mise a jour ded l'utilisateur");
          console.log(responce);
        }, error: (error: any) => {
          console.log("erreur lors de la mise a jour de l'utilisateur");

        }
      })
      this.ngAfterViewInit();
    });
  }

}




@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule,
  ],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public assurance: any,
  ) {

    this.assurance.updatedAt = new Date()
    this.assurance.createdAt = new Date()
    this.assurance.state = 'active'
    this.assurance.nbrrelance = 0
    this.assurance.remember = 0


  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

// UpdateAssuranceDialog component
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



@Component({
  selector: 'update-user-dialog',
  templateUrl: 'update-user-dialog.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule,
  ],
})
export class UpdateUserDialog {
  constructor(
    public dialogRef: MatDialogRef<UpdateUserDialog>,
    @Inject(MAT_DIALOG_DATA) public user: any,
    private userService: UserService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
