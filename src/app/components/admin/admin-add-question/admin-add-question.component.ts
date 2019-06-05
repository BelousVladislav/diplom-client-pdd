import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QuestionService } from '../../../services/question/question.service';
import { question } from '../../../classes/question'
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { image } from '../../../classes/image';
import {MatSnackBar} from '@angular/material';
import { task } from 'src/app/classes/task';
import { TaskService } from '../../../services/task/task.service';

@Component({
  selector: 'app-admin-add-question',
  templateUrl: './admin-add-question.component.html',
  styleUrls: ['./admin-add-question.component.css']
})
export class AdminAddQuestionComponent implements OnInit {
  @Output() FerfeshDataSet = new EventEmitter();
  FerfeshDataSetTrue(){
    this.FerfeshDataSet.emit();
  }
  Tasks: task[] = [];
  checked:boolean = false;
  addQuestionForm: FormGroup;
  selectTask: task;
  selectImage: image;
  constructor(
    private TaskS:TaskService,
    private _FormB: FormBuilder,
    private MatSnackBar: MatSnackBar,
    private  QuestionS: QuestionService
  ) { }

  ngOnInit() {
    this.addQuestionForm = this._FormB.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
      Task_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]]
    });
    this.getTasks()
  }
  getTasks(){
    this.TaskS.getTasks().subscribe((data:task[]) => {
      this.Tasks = data;
      console.log(this.Tasks);
    })
  }
  addTask(){
    let newQuestion: question;
    if(this.addQuestionForm.valid){
      newQuestion = new question(
        this.addQuestionForm.get('name').value,
        this.selectTask.id
        );
    if(this.checked && this.selectImage!=undefined){
      newQuestion.image_id = this.selectImage.id;
    }
    console.log(newQuestion);
    this.QuestionS.addQuestion(newQuestion).subscribe(data=>{
      if (data.hasOwnProperty('status')){
        this.MatSnackBar.open(`Питання успішно додано`, 'Зачинити', {duration:5000});
        this.FerfeshDataSetTrue()
      }else{
        this.MatSnackBar.open(`Помилка під час додання питання`, 'Зачинити', {duration:5000})
      }
    });  
  }else{
    this.MatSnackBar.open(`Заповніть всі обов'язкові поля`, 'Зачинити', {duration:5000});  
  }
  }
  getTaskId(Task){
    this.selectTask = Task;
  }
  getSelectImage(Selimage:image){
    this.selectImage = Selimage;
  }

}
