import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';
import { theme } from '../../../classes/theme'
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { image } from '../../../classes/image';
import {MatSnackBar} from '@angular/material';
import { task } from 'src/app/classes/task';
import { TaskService } from '../../../services/task/task.service';

@Component({
  selector: 'app-admin-edit-task',
  templateUrl: './admin-edit-task.component.html',
  styleUrls: ['./admin-edit-task.component.css']
})
export class AdminEditTaskComponent implements OnInit {
  @Input() selTaskForEdit: task;
  @Output() FerfeshDataSet = new EventEmitter();
  FerfeshDataSetTrue(){
    this.FerfeshDataSet.emit();
  }
  checked:boolean = false;
  editTaskForm: FormGroup;
  selectTheme: theme;
  selectImage: image;
  themes:theme[];
  constructor(
    private ThemeS:ThemeService,
    private _FormB: FormBuilder,
    private MatSnackBar: MatSnackBar,
    private  TaskS: TaskService
  ) { }

  ngOnInit() {
    this.getThemes();
    this.editTaskForm = this._FormB.group({
      name: [this.selTaskForEdit.name, [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
      theme_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      text: [this.selTaskForEdit.text, [Validators.required, Validators.minLength(2)]],
    });
    if(this.selTaskForEdit.image_id!==undefined){
      this.checked = true;
    }
  
  }
  getThemes(){
    this.ThemeS.getThemes().subscribe((data:theme[]) => {
      this.themes = data; 
    })
  }
  getThemeId(theme){
    this.selectTheme = theme;
  }
  getSelectImage(Selimage:image){
    this.selectImage = Selimage;
  }
  EditTask(){
    let edtTask: task;
    if(this.editTaskForm.valid){
      edtTask = new task(
        this.editTaskForm.get('name').value,
        this.editTaskForm.get('text').value,
        this.selectTheme.id,
        this.selTaskForEdit.id
        );
    if(this.checked && this.selectImage!=undefined){
      edtTask.image_id = this.selectImage.id;
    }
    console.log(edtTask);
    this.TaskS.editTask(edtTask).subscribe(data=>{
      if (data.hasOwnProperty('status')){
        this.MatSnackBar.open(`Таск успішно відредаговано`, 'Зачинити', {duration:5000});
        this.FerfeshDataSetTrue();
      }else{
        this.MatSnackBar.open(`Помилка під час редагування Таску`, 'Зачинити', {duration:5000})
      }
    });  
    }else{
      this.MatSnackBar.open(`Заповніть всі обов'язкові поля`, 'Зачинити', {duration:5000});  
    }

  }
  }

