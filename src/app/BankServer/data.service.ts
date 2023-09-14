import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http.get(`${this.BaseUrl}/bankuser/balance/${acno}`)
  }

}
