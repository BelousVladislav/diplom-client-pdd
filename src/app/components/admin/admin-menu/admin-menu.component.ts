import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import {Router} from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  constructor(
    private userS:UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  accExit(){
    this.userS.removeThisUserCookieObj();
    this.router.navigateByUrl('/autorization');
  }
}
