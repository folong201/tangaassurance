import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-adminmessage',
  templateUrl: './adminmessage.component.html',
  styleUrls: ['./adminmessage.component.css']
})
export class AdminmessageComponent implements OnInit {
  messages !:any
  subscriber!:Subscription
  displayedColumns: string[] = ['content', 'email', 'phone', 'state','editer'];
  dataSource!: MatTableDataSource<any>;
  user = []

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor (private messageService:MessageService){}
  
  ngOnInit(): void {
    this.getAllMessage()
  }
  getAllMessage(){
    this.subscriber = this.messageService.getAllMessages().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.messages = res.messages
          this.dataSource = new MatTableDataSource<any>(res);
            this.dataSource.paginator = this.paginator
      },
      error:(error:any)=>{
        console.log(error);

      }
    })
  }


  update(message:any){
    this.subscriber = this.messageService.update(message._id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getAllMessage()

      },
      error:(error:any)=>{
        console.log(error);

      }
    })
  }
}


