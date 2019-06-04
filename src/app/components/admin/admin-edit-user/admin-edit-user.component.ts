import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { user } from '../../../classes/user'
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../../../services/user/user.service'
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.css']
})
export class AdminEditUserComponent implements OnInit {
  @Input() selUser: user;
  @Output() FerfeshDataSet = new EventEmitter();
  FerfeshDataSetTrue(){
    this.FerfeshDataSet.emit();
  }
  registrForm: FormGroup;
  constructor(
    private _formBuilder:FormBuilder,
    private UserService: UserService,
    private MatSnackBar:MatSnackBar,
  ) { }

  ngOnInit() {
    console.log(this.selUser.name);
    this.registrForm = this._formBuilder.group({
      id:[this.selUser.id],
      name: [this.selUser.name+'', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      last_name:[this.selUser.last_name, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      otchestvo:[this.selUser.otchestvo, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      login:[this.selUser.login, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      password:[this.selUser.password, [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
  });
  }
  EditUser(){
    this.UserService.EditUser(this.registrForm).subscribe(data=>{
      if(data.hasOwnProperty('status')){
        this.MatSnackBar.open(`Користувач успішно відредагований`, 'Зачинити', {duration:5000});
        this.FerfeshDataSetTrue()
      }else{
        this.MatSnackBar.open(`Виникла помилка`, 'Зачинити', {duration:5000});
        this.FerfeshDataSetTrue()
      }
    })
  }

}
