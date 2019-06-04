import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ThemeService } from '../../../services/theme/theme.service';
import {MatSnackBar} from '@angular/material';
import { theme } from '../../../classes/theme';

@Component({
  selector: 'app-admin-edit-theme',
  templateUrl: './admin-edit-theme.component.html',
  styleUrls: ['./admin-edit-theme.component.css']
})
export class AdminEditThemeComponent implements OnInit {
  @Input() SelTheme: theme;
  @Output() FerfeshDataSet = new EventEmitter();
  FerfeshDataSetTrue(){
    this.FerfeshDataSet.emit();
  }
  editThemeForm: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private ThemeS: ThemeService,
    private MatSnackBar:MatSnackBar
    ) { }

  ngOnInit() {
    this.editThemeForm = this._formBuilder.group({
      themeName: [this.SelTheme.name, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
    });
    console.log(this.SelTheme);
  }
  edtTheme(){
    this.ThemeS.editTheme(this.editThemeForm.get('themeName').value, this.SelTheme).subscribe(data =>{
      if (data.hasOwnProperty('status')){
        this.MatSnackBar.open(`Тема успішно додана`, 'Зачинити', {duration:5000});
        this.FerfeshDataSetTrue()
      }else{
        this.MatSnackBar.open(`Помилка під час додання теми`, 'Зачинити', {duration:5000})
      }
    })
  }

}
