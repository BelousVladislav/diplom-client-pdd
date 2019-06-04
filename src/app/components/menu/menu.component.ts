import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {Router} from '../../../../node_modules/@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  thisUser = 'Мій кабінет';
  constructor(
    private cookieS:CookieService,
    private router:Router
  ) { }

  ngOnInit() {
  }
  myAccount(){
    //this.cookieS.remove('thisUser');
    let thisUserCookieObj = this.cookieS.getObject('thisUser');
    if(thisUserCookieObj !=null){
      let isAdmin: boolean = Boolean(JSON.parse(JSON.stringify(thisUserCookieObj)).is_admin);
      console.log(isAdmin);
      if(isAdmin == true){
        console.log('admin');
        this.router.navigateByUrl('/thisadmin');
      }else if(isAdmin == false){
        console.log('user');
        this.router.navigateByUrl('/thisuser');  
      }else this.router.navigateByUrl('/autorization'); 
      
    }else{
      this.router.navigateByUrl('/autorization');  
    }
  }
}
