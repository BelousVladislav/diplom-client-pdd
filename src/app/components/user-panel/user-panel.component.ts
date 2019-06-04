import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import {Router} from '../../../../node_modules/@angular/router';
import { user } from '../../classes/user';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {
  THisUser:user;
  constructor(
    private router:Router,
    private UserS:UserService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    if(!this.UserS.validUser()){
      this.snackBar.open('за вами вже виїхали', 'Зачинити', {duration:5000});
      return;
    };
    this.THisUser = this.UserS.getThisUserForCookie();
    console.log(this.THisUser)
  }
  
  accExit(){
    this.UserS.removeThisUserCookieObj();
    this.router.navigateByUrl('autorization');
  }

}
