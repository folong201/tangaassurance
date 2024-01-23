import { Component, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/users/user.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription } from 'rxjs';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements AfterViewInit {
  constructor(private userService: UserService, public dialog: MatDialog) { }
  displayedColumns: string[] = ['name', 'email', 'phone', 'role'];
  dataSource !: MatTableDataSource<any>;
  user = []
  username = ''

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  subscriber !: Subscription

  ngAfterViewInit() {

    this.userService.getUsers().subscribe((res:any) => {
      this.user = res
      this.dataSource = new MatTableDataSource<any>(this.user);
      console.log(this.user)
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.subscriber = this.userService.createUser(result).subscribe({
        next: (res: any) => {
          console.log(res)
          this.ngAfterViewInit()
        },
        error: (error: any) => {
          console.log(error)

      }

      })
    });
  }
  filterUserByName(){
    this.dataSource.filter = this.username.trim().toLowerCase();
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
    MatDialogModule
  ],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public user: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
