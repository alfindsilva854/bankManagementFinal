import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  serviceMethod() {
    throw new Error('Method not implemented.');
  }

  BaseUrl:any="http://localhost:5002"
  data: any;

  constructor(private http:HttpClient) { }

  getToken(){
    //create a header object
    const headers=new HttpHeaders()

    if(localStorage.getItem("token")){
      const token=JSON.parse(localStorage.getItem("token") || "")
      options.headers=headers.append("access_token",token)
    }
    return options
  }

  //api to create account
  accountCreate(acno:any,psw:any,uname:any){
    const bodyData={acno,psw,uname}
    return this.http.post(`${this.BaseUrl}/bankuser/create_acc`,bodyData)
  }
  // api to login
  loginApi(acno:any,psw:any){
    const bodyData={acno,psw}
    return this.http.post(`${this.BaseUrl}/bankuser/login`,bodyData)
  }

  // api to get balance
  getBalanceApi(acno:any){
    return this.http.get(`${this.BaseUrl}/bankuser/balance/${acno}`,this.getToken())
  }

  //api to money Transfer
  moneyTransferApi(sAcno:any,rAcno:any,amount:any,spsw:any,date:any){
    //body
    const bodyData={
      sAcno,rAcno,amount,spsw,date
    }  
    return this.http.post(`${this.BaseUrl}/bankuser/money-transfer`,bodyData,this.getToken())
  }

  //api to get transaction history
  accountStatementApi(acno:any){
    return this.http.get(`${this.BaseUrl}/bankuser/account-statement/${acno}`,this.getToken())
  }

  //api to delete an Account
  deleteAccountApi(acno:any){
    return this.http.delete(`${this.BaseUrl}/bankuser/delete-account/${acno}`,this.getToken())
  }

}
