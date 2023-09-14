import { Component, OnInit } from '@angular/core';
import { DataService } from '../BankServer/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name:any=""
  acno:any=""
  balance:any=""

  constructor(private ds:DataService){ }

  ngOnInit(): void {
    //check data present or not in local storage

    if(localStorage.getItem("currentUname")){
      this.name=localStorage.getItem("currentUname")
    }
      
  }
  getbalance(){
    //acno -ls
    if(localStorage.getItem("currentAcno")){
      this.acno=JSON.parse(localStorage.getItem("currentAcno")|| "")
      // balance
      this.ds.getBalanceApi(this.acno).subscribe({
        next: (result:any)=>{
          this.balance=result.message
        },
        error: (result:any)=>{
          alert(result.error.message)
        }
      })
    }
  }
  
  getProfile(){
    if(localStorage.getItem("currentAcno")){
      this.acno=JSON.parse(localStorage.getItem("currentAcno")||"")
      // console.log(this.acno);
      // console.log(this.name);
         
    }
  }

}
