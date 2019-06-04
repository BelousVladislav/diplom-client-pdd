import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-tool',
  templateUrl: './admin-tool.component.html',
  styleUrls: ['./admin-tool.component.css']
})
export class AdminToolComponent implements OnInit {
@Input() title: string;
@Output() Add = new EventEmitter();
@Output() Edit = new EventEmitter();
@Output() Delete = new EventEmitter();
  clickAdd(){
    this.Add.emit();
  }
  clickEdit(){
    this.Edit.emit();
  }
  clickDelete(){
    this.Delete.emit();
  }
  constructor() { }

  ngOnInit() {
  }

}
