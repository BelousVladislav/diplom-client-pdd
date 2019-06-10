import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { theme } from '../../classes/theme';
import { question } from '../../classes/question';
import { answer } from '../../classes/answer';
import { isUndefined } from 'util';
import { StudyTasksPaginatorComponent } from '../study-tasks-paginator/study-tasks-paginator.component'

@Component({
  selector: 'app-study-tests',
  templateUrl: './study-tests.component.html',
  styleUrls: ['./study-tests.component.css']
})
export class StudyTestsComponent implements OnInit {
  @Input() thisThemeForTests: theme;
  @Output() TestEnd = new EventEmitter();
  @ViewChild(StudyTasksPaginatorComponent) private paginator: StudyTasksPaginatorComponent;
  countTests: number = 0;
  questions: question[] = [];
  pos: number = 0;
  themeName: string ='';
  questionText: string = '';
  questionUrl: string = '';
  answers: answer[] = [];
  respAnswers: answer[] = [];
  reiting: number = 0;
  showReiting = false;
  stars: boolean[] = [];
  constructor() { }

  ngOnInit() {
    console.log(this.thisThemeForTests);
    for(let i:number = 0; i<this.thisThemeForTests.tasks.length; i++){
      if(this.thisThemeForTests.tasks[i].questions.length>0){
        this.countTests = this.countTests + this.thisThemeForTests.tasks[i].questions.length;
        for(let j:number = 0; j<this.thisThemeForTests.tasks[i].questions.length; j++){
          if(!isUndefined(this.thisThemeForTests.tasks[i].questions[j])){
            this.questions.push(this.thisThemeForTests.tasks[i].questions[j]);
          }
          
        }
      }
    }
    this.selectQuestion()
    console.log(this.questions)
  }
  EndTestF(){
    this.TestEnd.emit();
  }
  newPos(pos:number){
    this.pos = pos;
    this.selectQuestion();
  }
  selectQuestion(){
    this.themeName = this.thisThemeForTests.name;
    this.questionText = this.questions[this.pos].name;
    this.questionUrl = this.questions[this.pos].imageObj.path;
    this.answers = this.questions[this.pos].answers;
  }
  selectAnswer(thisAnswer: answer){
    console.log(thisAnswer);
    this.respAnswers[this.pos] = thisAnswer;
    for(let i: number = 0; i<this.countTests; i++){
      if(isUndefined(this.respAnswers[i])){
        console.log(`newpos  ${i}`)
        this.paginator.selectPage(i);
        return;
      }
    }
      for(let j: number = 0; j<this.respAnswers.length; j++){
        if(this.respAnswers[j].f_right==true){
          this.reiting = this.reiting+1;
        }
      }
      console.log('End)  '+this.reiting);
      this.reiting = Math.round((this.reiting/this.countTests)*5);
      for (let k:number=0; k<5; k++){
        if(k<this.reiting){
          this.stars[k] = true;
        }else{
          this.stars[k] = false;
        }
      }
      this.showReiting = true;
      
  }


}
