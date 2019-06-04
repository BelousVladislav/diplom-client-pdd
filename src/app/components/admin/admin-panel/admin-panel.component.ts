import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import {Router} from '../../../../../node_modules/@angular/router';
import { user } from '../../../classes/user';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
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

  } 
}
