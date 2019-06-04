import { Injectable } from '@angular/core';
import { user } from '../../classes/user';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import {CookieService} from 'angular2-cookie/core';
import { cancatHostPost } from '../../const';
import {Router} from '../../../../node_modules/@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private cookieS:CookieService,
    private router: Router
    ) { }
  private allusers: user[] = [];
  
    getUser(){
      return this.http.get(cancatHostPost+'/getuser')
    }

  addUser(newuser:user){
    return this.http.post(cancatHostPost+'/adduser', JSON.stringify(newuser, ['name','last_name','otchestvo','login','password','is_admin','user_add']), {headers: new HttpHeaders().set('content-type','application/json')});
  }
  EditUser(FRM:FormGroup){
    console.log(FRM.get('id').value);
    console.log(JSON.stringify(FRM.value));
    // let edUser:user = new user(FRM.get('name'), FRM.last_name, FRM.otches)
    return this.http.post(cancatHostPost+`/edituser?id=${FRM.get('id').value}`, JSON.stringify(FRM.value),{headers: new HttpHeaders().set('content-type','application/json')})
  }
  removeUser(UserId:number){
    return this.http.get(cancatHostPost+`/removeUser?id=${UserId}`);
  }
  autorizationUser(frg: FormGroup){
    let jsnForFormAutorization = {
      login: frg.get('login').value,
      password: frg.get('password').value
    };
    return this.http.post(cancatHostPost+'/autorization_user', JSON.stringify(jsnForFormAutorization), {headers: new HttpHeaders().set('content-type','application/json')});
  }
  validUser():boolean{
    if(this.cookieS.getObject('thisUser')==undefined){
      this.router.navigateByUrl('autorization');
      return false;
    }
    return true;
  }
  getThisUserForCookie():user{
    let thisUser: user;
    let cookieJSN = JSON.parse(JSON.stringify(this.cookieS.getObject('thisUser')));
    thisUser = new user(cookieJSN._name, cookieJSN._last_name, cookieJSN._otchestvo, cookieJSN._login, cookieJSN._password, cookieJSN.id, cookieJSN.is_admin, cookieJSN.user_add);
    return thisUser;
  }
  removeThisUserCookieObj(){
    this.cookieS.remove('thisUser');
  }
}
