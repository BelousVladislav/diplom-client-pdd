import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { QuestionService } from '../../../services/question/question.service';
import { question } from '../../../classes/question';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-admin-list-question',
  templateUrl: './admin-list-question.component.html',
  styleUrls: ['./admin-list-question.component.css']
})
export class AdminListQuestionComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() OutSelectQuestion = new EventEmitter();

  Questions: question[] = [];
  selectedQuestion: question;
  DataSource: MatTableDataSource<question>;
  displayedColumns: string[] = ['id', 'name'];
  constructor(
    private QuestionS:QuestionService
  ) { }
  applyFilter(filterValue: string) {
    console.log(filterValue);
    this.DataSource.filter = filterValue.trim().toLowerCase();
    if (this.DataSource.paginator) {
      this.DataSource.paginator.firstPage();
  }
}
  ngOnInit() {
    this.refreshDataSet();
  }
  refreshDataSet(id?:number){
    this.QuestionS.getQuestions(id).subscribe((data:question[]) => {
      this.Questions = data;
      this.DataSource = new MatTableDataSource(this.Questions);
      this.DataSource.paginator = this.paginator;
      console.log(this.Questions);
    })
  };
  selectQuestion(tsk: question){
    this.selectedQuestion = tsk;
    this.OutSelectQuestion.emit(this.selectedQuestion);
    console.log(this.selectedQuestion);
  }

}
