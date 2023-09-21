import { Component, OnInit } from '@angular/core';
import { DataService } from '../BankServer/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  acno:any
  transactionArray:any
  spinner:any=true
  date:any=""
  searchTerm:any=""

  constructor(private ds:DataService,private rout:Router){ }

    ngOnInit(): void{
    //acno
    if(localStorage.getItem("currentAcno")){
      this.acno=JSON.parse(localStorage.getItem("currentAcno")||"")
      // console.log(this.acno)
      this.ds.accountStatementApi(this.acno).subscribe({
        next:(result:any)=>{
          this.transactionArray=result.message
          console.log(this.transactionArray);
          
        }
      })
       
    }  
    
    setTimeout(() => {
      this.spinner=false
    },2000);

    //date
    this.date=new Date()
    
  }
  backtoHome(){
    this.rout.navigateByUrl("home")
  }
  filterData(search:any){
    this.searchTerm=search
  }
}
