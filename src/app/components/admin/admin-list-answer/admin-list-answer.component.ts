import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { AnswerService } from '../../../services/answer/answer.service';
import { answer } from '../../../classes/answer';
import { question } from '../../../classes/question';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-admin-list-answer',
  templateUrl: './admin-list-answer.component.html',
  styleUrls: ['./admin-list-answer.component.css']
})
export class AdminListAnswerComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() OutSelectAnswer = new EventEmitter();
  @Input() selectedQuestion:question;
  Answers: answer[] = [];
  selectedAnswer: answer;
  DataSource: MatTableDataSource<answer>;
  displayedColumns: string[] = ['id', 'name', 'f_right'];
  addEditAnswerForm: FormGroup;
  constructor(
    private AnswerS:AnswerService,
    private _FormBuilder:FormBuilder,
    private MatSnackBar: MatSnackBar,
  ) { }
  applyFilter(filterValue: string) {
    console.log(filterValue);
    this.DataSource.filter = filterValue.trim().toLowerCase();
    if (this.DataSource.paginator) {
      this.DataSource.paginator.firstPage();
  }
}
  ngOnInit() {
    this.refreshDataSet(this.selectedQuestion.id);
    this.addEditAnswerForm = this._FormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      istruef: [false, [Validators.required]],

    });
  }
  refreshDataSet(Question_id?:number){
    this.AnswerS.getAnswers(Question_id).subscribe((data:answer[]) => {
      this.Answers = data;
      this.DataSource = new MatTableDataSource(this.Answers);
      this.DataSource.paginator = this.paginator;
      console.log(this.selectedQuestion.name);
    })
  };
  selectAnswer(tsk: answer){
    this.selectedAnswer = tsk;
    this.OutSelectAnswer.emit(this.selectedAnswer);
    this.addEditAnswerForm.controls['name'].setValue(this.selectedAnswer.name);
    this.addEditAnswerForm.controls['istruef'].setValue(this.selectedAnswer.f_right);
    console.log(this.selectedAnswer);
  }
  addAnswer(){
    if (this.addEditAnswerForm.valid){
      console.log('add');
      let newAnswer: answer;
      newAnswer = new answer(
        this.addEditAnswerForm.controls['name'].value,
        this.selectedQuestion.id,
        this.addEditAnswerForm.controls['istruef'].value
      );
      this.AnswerS.addAnswer(newAnswer).subscribe(data=>{
        if (data.hasOwnProperty('status')){
          this.MatSnackBar.open(`Відповідь успішно додано`, 'Зачинити', {duration:5000});
          this.refreshDataSet(this.selectedQuestion.id);
        }else{
          this.MatSnackBar.open(`Помилка під час додання відповіді`, 'Зачинити', {duration:5000})
        }
      });
    }else{
      this.MatSnackBar.open(`Заповніть всі обов'язкові поля`, 'Зачинити', {duration:5000})
    }
  }

  editAnswer(){
    if(this.selectedAnswer!=undefined){
      if (this.addEditAnswerForm.valid){
        console.log('add');
        let newAnswer: answer;
        newAnswer = new answer(
          this.addEditAnswerForm.controls['name'].value,
          this.selectedQuestion.id,
          this.addEditAnswerForm.controls['istruef'].value,
          this.selectedAnswer.id
        );
        this.AnswerS.editAnswer(newAnswer).subscribe(data=>{
          if (data.hasOwnProperty('status')){
            this.MatSnackBar.open(`Відповідь успішно відредагована`, 'Зачинити', {duration:5000});
            this.refreshDataSet(this.selectedQuestion.id);
          }else{
            this.MatSnackBar.open(`Помилка під час редагування відповіді`, 'Зачинити', {duration:5000})
          }
        });
      }else{
        this.MatSnackBar.open(`Заповніть всі обов'язкові поля`, 'Зачинити', {duration:5000})
      }
  }else{
    this.MatSnackBar.open(`Спочатку оберіть відповідь`, 'Зачинити', {duration:5000})
  }
  }
  clearForm(){
    if(this.selectedAnswer!=undefined){
      this.AnswerS.dropAnswer(this.selectedAnswer.id).subscribe(data=>{
        if (data.hasOwnProperty('status')){
          this.MatSnackBar.open(`Відповідь успішно видалено`, 'Зачинити', {duration:5000});
          this.refreshDataSet(this.selectedQuestion.id);
        }else{
          this.MatSnackBar.open(`Помилка під час редагування видалення`, 'Зачинити', {duration:5000})
        }
      });     
    }else{
      this.MatSnackBar.open(`Спочатку оберіть відповідь`, 'Зачинити', {duration:5000})
    }
  }


}
