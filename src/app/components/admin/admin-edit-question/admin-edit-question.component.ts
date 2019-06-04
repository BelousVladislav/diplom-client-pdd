import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { QuestionService } from '../../../services/question/question.service';
import { question } from '../../../classes/question'
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { image } from '../../../classes/image';
import {MatSnackBar} from '@angular/material';
import { task } from 'src/app/classes/task';
import { TaskService } from '../../../services/task/task.service';

@Component({
  selector: 'app-admin-edit-question',
  templateUrl: './admin-edit-question.component.html',
  styleUrls: ['./admin-edit-question.component.css']
})
export class AdminEditQuestionComponent implements OnInit {
  @Input() selQuestion: question;
  @Output() FerfeshDataSet = new EventEmitter();
  FerfeshDataSetTrue(){
    this.FerfeshDataSet.emit();
  }
  Tasks: task[] = [];
  checked:boolean = false;
  editQuestionForm: FormGroup;
  selectTask: task;
  selectImage: image;
  constructor(
    private TaskS:TaskService,
    private _FormB: FormBuilder,
    private MatSnackBar: MatSnackBar,
    private  QuestionS: QuestionService
  ) { }

  ngOnInit() {
    this.editQuestionForm = this._FormB.group({
      name: [this.selQuestion.name, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      Task_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]]
    });
    if(this.selQuestion.image_id!=undefined){
      this.checked = true;
    }
    this.getTasks()
  }
  getTasks(){
    this.TaskS.getTasks().subscribe((data:task[]) => {
      this.Tasks = data;
      console.log(this.Tasks);
    })
  }
  editTask(){
    let newQuestion: question;
    if(this.editQuestionForm.valid){
      newQuestion = new question(
        this.editQuestionForm.get('name').value,
        this.selectTask.id,
        this.selQuestion.id
        );
    if(this.checked && this.selectImage!=undefined){
      newQuestion.image_id = this.selectImage.id;
    }
    console.log(newQuestion);
    this.QuestionS.editQuestion(newQuestion).subscribe(data=>{
      if (data.hasOwnProperty('status')){
        this.MatSnackBar.open(`Питання успішно відредаговано`, 'Зачинити', {duration:5000});
        this.FerfeshDataSetTrue()
      }else{
        this.MatSnackBar.open(`Помилка під час редагування питання`, 'Зачинити', {duration:5000})
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
