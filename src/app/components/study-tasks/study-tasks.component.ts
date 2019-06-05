import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { theme } from '../../classes/theme';
import { task } from '../../classes/task';
import { TaskService } from '../../services/task/task.service';
import { QuestionService } from '../../services/question/question.service';
import{ question } from '../../classes/question';
import { AnswerService } from '../../services/answer/answer.service';
import{ answer } from '../../classes/answer';
import { ImageService } from '../../services/image/image.service';
import { image } from '../../classes/image'
import { isUndefined } from 'util';
import { load } from '@angular/core/src/render3';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-study-tasks',
  templateUrl: './study-tasks.component.html',
  styleUrls: ['./study-tasks.component.css']
})
export class StudyTasksComponent implements OnInit {
  @Input() thisTheme: theme;
  @Output() OutExit = new EventEmitter();
  pos: number = 0;
  thisThemeName: string;
  thisTaskName: string;
  thisTaskImageUrl: string;
  thisTaskText: string;
  load: boolean = false;
  ops: boolean = false;
  tasksCount: number = 0;
  constructor(
    private ThemeS:ThemeService,
    private TaskS:TaskService,
    private QuestionS:QuestionService,
    private AnswerS: AnswerService,
    private ImageS: ImageService,
    private MatSnackBar: MatSnackBar
  ) { }
  async ngOnChanges(){
    console.log(JSON.stringify(this.thisTheme))
    // this.thisTask = this.selTheme.tasks[0];
    this.thisTheme.tasks = await this.getTasks(this.thisTheme.id);
    for(let i: number = 0; i<this.thisTheme.tasks.length; i++){
      this.thisTheme.tasks[i].questions = await this.getQuestions(this.thisTheme.tasks[i].id);
        for(let j: number = 0; j<this.thisTheme.tasks[i].questions.length; j++){
          this.thisTheme.tasks[i].questions[j].answers = await this.getAnswers(this.thisTheme.tasks[i].questions[j].id);
          this.thisTheme.tasks[i].questions[j].imageObj = await this.getImages(this.thisTheme.tasks[i].questions[j].image_id);
        }
      this.thisTheme.tasks[i].imageObj = await this.getImages(this.thisTheme.tasks[i].image_id!=null? this.thisTheme.tasks[i].image_id: 0);
    }
    console.log(this.thisTheme);
    if (this.thisTheme.tasks.length>0){
      this.thisThemeName = this.thisTheme.name;
      this.thisTaskName = this.thisTheme.tasks[this.pos].name;
      this.thisTaskImageUrl = !isUndefined(this.thisTheme.tasks[this.pos].imageObj)?this.thisTheme.tasks[this.pos].imageObj.path: '';
      this.thisTaskText = this.thisTheme.tasks[this.pos].text;
      this.load = true;
      this.tasksCount = this.thisTheme.tasks.length;
      console.log(this.thisTheme.tasks[this.pos].image_id)
    }else{
      this.ops = true;
      this.MatSnackBar.open(`Розділ "${this.thisTheme.name}" тимчасово знаходиться в стані розробки`, 'Зачинити', {duration:5000})
    }
    
  }
  EditPos(poss: number){
    this.pos = poss;
    this.thisThemeName = this.thisTheme.name;
    this.thisTaskName = this.thisTheme.tasks[this.pos].name;
    this.thisTaskImageUrl = !isUndefined(this.thisTheme.tasks[this.pos].imageObj)?this.thisTheme.tasks[this.pos].imageObj.path: '';
    this.thisTaskText = this.thisTheme.tasks[this.pos].text;
    console.log('newPos: '+poss);    
  }
  ngOnInit() {

  }
  async getTasks(theme_id: number){
    let tasks: task[];
    tasks = await this.TaskS.getTasks(theme_id).toPromise<task[]>();
    // console.log('1) '+JSON.stringify(tasks));
    return tasks;
  }
  async getQuestions(task_id: number){
    let questions: question[];
    questions = await this.QuestionS.getQuestions(task_id).toPromise<question[]>();
    return questions;
  }
  async getImages(image_id: number){
    let images: image[];
    images = await this.ImageS.getImages(image_id).toPromise<image[]>();
    return images[0];    
  }
  async getAnswers(question_id: number){
    let answers: answer[];
    answers = await this.AnswerS.getAnswers(question_id).toPromise<answer[]>();
    return answers;    
  }  
  exit(){
    this.OutExit.emit();
  }
}
