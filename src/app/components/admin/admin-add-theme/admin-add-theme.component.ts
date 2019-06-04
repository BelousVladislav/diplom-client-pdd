import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ThemeService } from '../../../services/theme/theme.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-admin-add-theme',
  templateUrl: './admin-add-theme.component.html',
  styleUrls: ['./admin-add-theme.component.css']
})
export class AdminAddThemeComponent implements OnInit {
  @Output() FerfeshDataSet = new EventEmitter();
  FerfeshDataSetTrue(){
    this.FerfeshDataSet.emit();
  }
  addThemeForm: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private ThemeS: ThemeService,
    private MatSnackBar:MatSnackBar
  ) { }
  addTheme(){
    this.ThemeS.addTheme(JSON.stringify({name: this.addThemeForm.get('themeName').value})).subscribe(data=>{
      if (data.hasOwnProperty('status')){
        this.MatSnackBar.open(`Тема успішно додана`, 'Зачинити', {duration:5000});
        this.FerfeshDataSetTrue()
      }else{
        this.MatSnackBar.open(`Помилка під час додання теми`, 'Зачинити', {duration:5000})
      }
    });  
  }
  ngOnInit() {
    this.addThemeForm = this._formBuilder.group({
      themeName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
    });
  }

}
