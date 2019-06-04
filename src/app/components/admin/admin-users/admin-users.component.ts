import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { user } from '../../../classes/user';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MatSnackBar} from '@angular/material';
// import { AdminEditUserComponent } from '../admin-edit-user/admin-edit-user.component';



import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: user[] = [];
  selectUser: user;
  selectUserS: user;
  selrow:boolean = false;
  displayedColumns: String[] = ['id', 'name', 'last_name', 'otchestvo', 'login', 'is_admin'];
  dataSource: MatTableDataSource<user>;
  showFormAddUser:boolean = false;
  showFormEditUser: boolean = false;



  isLinear = false;
  passwHide = true;
  isregirtered = false;
  testRegForm = false;
  registrForm: FormGroup;
  autorizationForm: FormGroup;

  constructor(
    private userS: UserService,
    private MatSnackBar:MatSnackBar,
    private _formBuilder: FormBuilder
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
  }
}
showFormAddUserFunc(){
  if(this.showFormEditUser ==true){
    this.showFormEditUser = !this.showFormEditUser;  
  }
  this.showFormAddUser = !this.showFormAddUser;
}
showFormEditUserFunc(){
  if(this.showFormAddUser ==true){
    this.showFormAddUser = !this.showFormAddUser;  
  }
  if(this.selectUser!=null && this.selectUser!=undefined){
    this.showFormEditUser = !this.showFormEditUser;
  }else{
    this.MatSnackBar.open(`Спершу оберіть користувача для редагування`, 'Зачинити', {duration:5000})  
  }
}
  ngOnInit() {
    this.registrForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      last_name:['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      otchestvo:['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      login:['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      password:['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      pconfirm:['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]]
    });


    this.refreshDataSource()
  }

  refreshDataSource(){
    this.userS.getUser().subscribe((data: user[]) =>{
      this.users = data;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;
      console.log(this.users);
      this.dataSource.paginator = this.paginator;
      console.log('refresh');
      this.showFormAddUser = false;
      this.showFormEditUser = false;
    });
  } 
  SelectRow(selUser: any){
    // let tr: user =  Object.create(selUser);
    let jsn = JSON.parse(JSON.stringify(selUser));
    //console.log(jsn._name);
    this.selectUserS = selUser;
    this.selectUser = new user(jsn._name, jsn._last_name, jsn._otchestvo, jsn._login, jsn._password,jsn.id);
    this.showFormEditUser = false;
    this.showFormAddUser = false;
    // let mewUser:user = new user('Jec','rtyu','34567','324567','23456');
    // console.log(mewUser.name);
  }
  deleteUser(){
    if(this.selectUser!=null && this.selectUser!=undefined){
      this.userS.removeUser(this.selectUser.id).subscribe(data =>{
        if(data.hasOwnProperty('status')){
          this.refreshDataSource()
          this.MatSnackBar.open(`Користувач успішно видалений!`, 'Зачинити', {duration:5000})
        }else{
          this.MatSnackBar.open(`Виникла помилка під час видалення користувача `, 'Зачинити', {duration:5000})
        }
      });

    }else{
      this.MatSnackBar.open(`Спершу оберіть користувача для видалення`, 'Зачинити', {duration:5000}) 
    }
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
        this.userS.addUser(newUser).subscribe(data => {
            console.log('res: '+JSON.stringify(data)); 
            if(data.hasOwnProperty('status')){
                this.MatSnackBar.open('Реєстрація прошла успішно', 'Зачинити', {duration:5000});
                this.refreshDataSource()
            }else{
                this.MatSnackBar.open('Помилка реєстрації! Спробуйте ще раз...', 'Зачинити', {duration:5000});
            }
            
        });
        
    }
  }

}
