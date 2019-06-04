import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';
import { theme } from '../../../classes/theme'
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { image } from '../../../classes/image';
import {MatSnackBar} from '@angular/material';
import { task } from 'src/app/classes/task';
import { TaskService } from '../../../services/task/task.service';

@Component({
  selector: 'app-admin-add-tasks',
  templateUrl: './admin-add-tasks.component.html',
  styleUrls: ['./admin-add-tasks.component.css']
})
export class AdminAddTasksComponent implements OnInit {
  @Output() FerfeshDataSet = new EventEmitter();
  FerfeshDataSetTrue(){
    this.FerfeshDataSet.emit();
  }
  themes: theme[] = [];
  checked:boolean = false;
  addTaskForm: FormGroup;
  selectTheme: theme;
  selectImage: image;
  constructor(
    private ThemeS:ThemeService,
    private _FormB: FormBuilder,
    private MatSnackBar: MatSnackBar,
    private  TaskS: TaskService
  ) { }

  ngOnInit() {
    this.addTaskForm = this._FormB.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      theme_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      text: ['', [Validators.required, Validators.minLength(2)]],

    });
    this.getThemes()
  }
  getThemes(){
    this.ThemeS.getThemes().subscribe((data:theme[]) => {
      this.themes = data;
      console.log(this.themes);
    })
  }
  addTheme(){
    let newTask: task;
    if(this.addTaskForm.valid){
      newTask = new task(
        this.addTaskForm.get('name').value,
        this.addTaskForm.get('text').value,
        this.selectTheme.id
        );
    if(this.checked && this.selectImage!=undefined){
      newTask.image_id = this.selectImage.id;
    }
    console.log(newTask);
    this.TaskS.addTask(newTask).subscribe(data=>{
      if (data.hasOwnProperty('status')){
        this.MatSnackBar.open(`Таск успішно додано`, 'Зачинити', {duration:5000});
        this.FerfeshDataSetTrue()
      }else{
        this.MatSnackBar.open(`Помилка під час додання Таску`, 'Зачинити', {duration:5000})
      }
    });  
  }else{
    this.MatSnackBar.open(`Заповніть всі обов'язкові поля`, 'Зачинити', {duration:5000});  
  }
  }
  getThemeId(theme){
    this.selectTheme = theme;
  }
  getSelectImage(Selimage:image){
    this.selectImage = Selimage;
  }
}
