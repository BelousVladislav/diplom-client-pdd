import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import {Router} from '../../../../node_modules/@angular/router';
import { user } from '../../classes/user';
import {MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {
  THisUser:user;
  FormUserData: FormGroup;
  EditMode= false;
  passwHide = true;
  constructor(
    private router:Router,
    private UserS:UserService,
    private snackBar: MatSnackBar,
    private _FormB:FormBuilder,
    private cookieS: CookieService,
  ) { }

  ngOnInit() {
    if(!this.UserS.validUser()){
      this.snackBar.open('за вами вже виїхали', 'Зачинити', {duration:5000});
      return;
    }else{
      this.THisUser = this.UserS.getThisUserForCookie();
      this.FormUserData = this._FormB.group({
        id:[this.THisUser.id],
        name: [this.THisUser.name+'', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        last_name:[this.THisUser.last_name, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        otchestvo:[this.THisUser.otchestvo, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        login:[this.THisUser.login, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        password:[this.THisUser.password, [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      });
      this.FormControlsEnable(false);
    }
  }
  FormControlsEnable(bool:boolean){
    if (bool){
      this.FormUserData.controls['id'].disable();
      this.FormUserData.controls['name'].enable();
      this.FormUserData.controls['last_name'].enable();
      this.FormUserData.controls['otchestvo'].enable();
      this.FormUserData.controls['login'].enable();
      this.FormUserData.controls['password'].enable();
    }else{
      this.FormUserData.controls['id'].disable();
      this.FormUserData.controls['name'].disable();
      this.FormUserData.controls['last_name'].disable();
      this.FormUserData.controls['otchestvo'].disable();
      this.FormUserData.controls['login'].disable();
      this.FormUserData.controls['password'].disable();
    }
    this.EditMode = bool;
  }
  edit(){
    console.log('edit');
    this.FormControlsEnable(true)
  }
  cancel(){
    console.log('cancel');
    this.FormControlsEnable(false)
  }
  save(){
    let editUser: user;
    console.log('save');
    editUser = new user(
      this.FormUserData.controls['name'].value,
      this.FormUserData.controls['last_name'].value,
      this.FormUserData.controls['otchestvo'].value,
      this.FormUserData.controls['login'].value,
      this.FormUserData.controls['password'].value,
      this.FormUserData.controls['id'].value
    );
    console.log(editUser)
    this.UserS.EditUser(this.FormUserData).subscribe(data=>{
      if(data.hasOwnProperty('status')){
        this.snackBar.open(`Користувач успішно відредагований`, 'Зачинити', {duration:5000});
        this.UserS.removeThisUserCookieObj();
        this.cookieS.putObject('thisUser', editUser);
        // this.FerfeshDataSetTrue()
      }else{
        this.snackBar.open(`Виникла помилка`, 'Зачинити', {duration:5000});
        this.FormUserData.controls['name'].setValue(this.THisUser.name),
        this.FormUserData.controls['last_name'].setValue(this.THisUser.last_name),
        this.FormUserData.controls['otchestvo'].setValue(this.THisUser.otchestvo),
        this.FormUserData.controls['login'].setValue(this.THisUser.login),
        this.FormUserData.controls['password'].setValue(this.THisUser.password),
        this.FormUserData.controls['id'].setValue(this.THisUser.id)
      }
    })
    this.FormControlsEnable(false)
  }
  accExit(){
    this.UserS.removeThisUserCookieObj();
    this.router.navigateByUrl('autorization');
  }

}
