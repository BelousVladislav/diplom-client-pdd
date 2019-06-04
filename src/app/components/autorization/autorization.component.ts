import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { user } from '../../classes/user';
import { UserService } from '../../services/user/user.service';
import {MatSnackBar} from '@angular/material';
import {CookieService} from 'angular2-cookie/core';
import {Router} from '../../../../node_modules/@angular/router';

@Component({
    selector: 'app-autorization',
    templateUrl: './autorization.component.html',
    styleUrls: ['./autorization.component.css']
})
export class AutorizationComponent implements OnInit {
    users: user[] = [];
    isLinear = false;
    passwHide = true;
    isregirtered = false;
    testRegForm = false;
    registrForm: FormGroup;
    autorizationForm: FormGroup;
    
    constructor(
        private _formBuilder: FormBuilder,
        private userService: UserService,
        private snackBar: MatSnackBar,
        private cookieS: CookieService,
        private router: Router
    ) {}

  ngOnInit() {
    //this.userService.getUser().subscribe((data: user[]) => {this.users = data; console.log(this.users[0].otchestvo);});
    this.autorizationForm = this._formBuilder.group({
        login:['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        password:['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]]
    });
    this.registrForm = this._formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        last_name:['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        otchestvo:['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        login:['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        password:['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
        pconfirm:['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]]
    });
  }
  registrationDataSend(){
    let newUser: user;
    if (this.registrForm.valid){
        newUser = new user(
            this.registrForm.get('name').value, 
            this.registrForm.get('last_name').value,
            this.registrForm.get('otchestvo').value,
            this.registrForm.get('login').value,
            this.registrForm.get('password').value
        );
        console.log('req: '+JSON.stringify(newUser, ['name','last_name','otchestvo','login','password','is_admin','user_add']));
        this.userService.addUser(newUser).subscribe(data => {
            console.log('res: '+JSON.stringify(data)); 
            if(data.hasOwnProperty('status')){
                this.isregirtered = true;
                this.snackBar.open('Реєстрація прошла успішно', 'Зачинити', {duration:5000});
            }else{
                this.snackBar.open('Помилка реєстрації! Спробуйте ще раз...', 'Зачинити', {duration:5000});
            }
            
        });
        
    }this.snackBar.open("Заповніть обов'язкові поля", 'Зачинити', {duration:5000});
  }
  autorizationUser(){
      if(this.autorizationForm.valid){
        this.cookieS.remove('thisUser');
        console.log('autorization');
        this.userService.autorizationUser(this.autorizationForm).subscribe(
            data => {
                // let txt = JSON.parse(JSON.stringify(data));
                console.log(data);
                let prsData = JSON.parse(JSON.stringify(data));
                if(data.hasOwnProperty('id')){
                    let thisUser: user;
                    thisUser = new user(prsData.name, prsData.last_name, prsData.otchestvo, prsData.login, prsData.password, prsData.id, prsData.is_admin, prsData.user_add);
                    console.log('This User: '+JSON.stringify(thisUser));
                    this.cookieS.putObject('thisUser', thisUser);
                    console.log('cookie: '+JSON.stringify(this.cookieS.getObject('thisUser')));
                    this.snackBar.open(`Вітаємо Вас, ${prsData.name} ${prsData.otchestvo}`, 'Зачинити', {duration:5000});    
                    if(thisUser.is_admin == true){
                        this.router.navigateByUrl('thisadmin');
                    }else{
                        this.router.navigateByUrl('thisuser');
                    }
                    
                }else{
                    this.snackBar.open('Невірний логін або пароль', 'Зачинити', {duration:5000});    
                }
                // console.log(txt.name);
            }
        );
      }else{
        this.snackBar.open("Заповніть обо'язкові поля", 'Зачинити', {duration:5000});    
      }
  }
}
