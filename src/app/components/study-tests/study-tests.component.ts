import { Component, OnInit, Input } from '@angular/core';
import { theme } from '../../classes/theme';
import { question } from '../../classes/question';
import { answer } from '../../classes/answer';
import { isUndefined } from 'util';

@Component({
  selector: 'app-study-tests',
  templateUrl: './study-tests.component.html',
  styleUrls: ['./study-tests.component.css']
})
export class StudyTestsComponent implements OnInit {
  @Input() thisThemeForTests: theme;
  countTests: number;
  questions: question[] = [];
  pos: number = 0;
  themeName: string ='';
  questionText: string = '';
  questionUrl: string = '';
  answers: answer[] = [];
  constructor() { }

  ngOnInit() {
    console.log(this.thisThemeForTests);
    for(let i:number = 0; i<this.thisThemeForTests.tasks.length; i++){
      if(this.thisThemeForTests.tasks[i].questions.length>0){
        this.countTests = this.thisThemeForTests.tasks[i].questions.length;
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

}
