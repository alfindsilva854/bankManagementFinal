import { Component, OnInit } from '@angular/core';
import { DataService } from '../BankServer/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name:any=""
  acno:any=""
  balance:any=""
  message:any=""
  msgClr:any=true
  dAcno:any=""

  // reactive form for Moneytransfer
  moneyTransferForm=this.fb.group({
    rAcno:['',[Validators.required,Validators.pattern('[0-9]+')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]+')]],
    psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]]
  })

  constructor(private ds:DataService,private fb:FormBuilder,private dp:DatePipe,private rout:Router){ }

  ngOnInit(): void {
    //check data present or not in local storage

    if(localStorage.getItem("currentUname")){
      this.name=localStorage.getItem("currentUname")
    }
    //login or not
    if(!localStorage.getItem("currentAcno")){
      this.rout.navigateByUrl("")
      alert("plz login first")
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

  moneyTransfer(){
    if(this.moneyTransferForm.valid){
      var path=this.moneyTransferForm.value
      var rAcno=path.rAcno
      var amount=path.amount
      var psw=path.psw

      // console.log(rAcno);
      //sender acno
      if(localStorage.getItem("currentAcno")){
        this.acno=JSON.parse(localStorage.getItem("currentAcno")||"")
        console.log(this.acno);
      }
      // date
      const date=new Date()
      // console.log(date);
      var latestDate=this.dp.transform(date,'medium')
      // console.log(latestDate);

      if(this.acno==rAcno){
        this.message="sender and reciever account number are same"
        this.msgClr=false
      }
      else{
        //api
        this.ds.moneyTransferApi(this.acno,rAcno,amount,psw,latestDate).subscribe({
          next:(result:any)=>{
            // alert(result.message)
            this.message=result.message
            this.msgClr=true
          },
          error:(result:any)=>{
            // alert(result.error.message)
            this.message=result.error.message
            this.msgClr=false
          }
        })
      }
      
      
    }
    else{
      this.message="Invalid form"
      this.msgClr=false
    }
  }

  logout(){
    localStorage.removeItem("currentUname")
    localStorage.removeItem("currentAcno")
    this.rout.navigateByUrl("")
  }

  deleteActive(){
    if(localStorage.getItem("currentAcno")){
      this.dAcno=JSON.parse(localStorage.getItem("currentAcno")||"")
      console.log(this.dAcno);
      
    }
  }

  cancelp(){
    this.dAcno=""
  }

  yesDelete(event:any){
    // alert("delete api call")
    // console.log(event);
    this.ds.deleteAccountApi(event).subscribe({
      next:(data:any)=>{
        alert(data.message)
        this.logout()
      }
    })
    
  }
}
