import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  data="data inside service file"

  serviceMethod(){
    alert("service method")
  }

}
