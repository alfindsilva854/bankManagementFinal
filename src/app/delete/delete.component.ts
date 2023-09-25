import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit  {

    //intialize a variable to store data get from parent

  @Input() data:string | undefined

  @Output() onCancel=new EventEmitter()
  @Output() onDelete=new EventEmitter()

  constructor(){ }

  ngOnInit(): void {
      
  }

  cancel(){
    this.onCancel.emit()
  }
  deleteAcc(){
    this.onDelete.emit(this.data)
  }

}
