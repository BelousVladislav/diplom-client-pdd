import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { QuestionService } from '../../../services/question/question.service';
import { question } from '../../../classes/question';
import { AdminListQuestionComponent } from '../admin-list-question/admin-list-question.component';
import { AdminListAnswerComponent } from '../admin-list-answer/admin-list-answer.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-admin-questions',
  templateUrl: './admin-questions.component.html',
  styleUrls: ['./admin-questions.component.css']
})
export class AdminQuestionsComponent implements OnInit {
  @ViewChild(AdminListQuestionComponent) private child: AdminListQuestionComponent;
  @ViewChild(AdminListAnswerComponent) private childAnswers: AdminListAnswerComponent;
  title = 'Адміністрування питань';
  showAddPanel = false;
  showEditPanel = false;
  showAnswersList = false;
  selectedQuestion: question;
  constructor(
    private MatSnackBar:MatSnackBar,
    private QuestionS: QuestionService
  ) { }

  ngOnInit() {
  }
  selectedQuestionF(selQuestion: question){
    this.selectedQuestion = selQuestion
    this.showAnswersListF();
      try{
        this.childAnswers.refreshDataSet(this.selectedQuestion.id);
      }catch{
        console.log('error')
      }
    
    console.log(this.selectedQuestion);
  }
  refreshDataSet(){
    console.log('refresh');
    this.child.refreshDataSet();
    this.showEditPanel = false; 
    this.showAddPanel = false;
  };
  showAnswersListF(){
    this.showEditPanel = false; 
    this.showAddPanel = false; 
    this.showAnswersList = true;
    console.log(this.showAnswersList)
  }
  showAddPanelF(){
    this.showEditPanel = false; 
    this.showAddPanel = !this.showAddPanel 
  }
  showEditPanelF(){
    if (this.selectedQuestion!=undefined){
        this.showAddPanel = false; 
        this.showEditPanel = !this.showEditPanel
    }else{
        this.MatSnackBar.open('Спочатку оберіть питання для редагування', 'Зачинити', {duration:5000});   
    } 
  }
deleteQuestion(){
    if (this.selectedQuestion!=undefined){
        this.QuestionS.dropQuestion(this.selectedQuestion.id).subscribe(data => {
            if(data.hasOwnProperty('status')){
                this.MatSnackBar.open('Питання успішно видалено', 'Зачинити', {duration:5000});
                this.refreshDataSet()
            }else{
                this.MatSnackBar.open('Помилка під час видалення питання', 'Зачинити', {duration:5000});
            }
        })
    }else{
        this.MatSnackBar.open('Спочатку оберіть питання для видалення', 'Зачинити', {duration:5000});   
    }
}

}
