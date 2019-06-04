import { Injectable } from '@angular/core';
import { question } from '../../classes/question'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { cancatHostPost } from '../../const';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  headerJSN = {headers: new HttpHeaders().set('content-type','application/json')};
  constructor(
    private http:HttpClient
  ) { }
  getQuestions(task_id?: number){
    let url: string='';
    if (task_id==undefined){
      url = cancatHostPost+'/questions';
    }else{
      url = cancatHostPost+`/questions?task_id=${task_id}`; 
    }
    return this.http.get(url);
  }
  addQuestion(newQuestion: question){
    return this.http.post(cancatHostPost+'/questions/add', JSON.stringify(newQuestion), this.headerJSN); 
  }
  editQuestion(editQuestion: question){
    return this.http.post(cancatHostPost+'/questions/edit', JSON.stringify(editQuestion), this.headerJSN); 
  }
  dropQuestion(idd: number){
    return this.http.post(cancatHostPost+'/questions/drop', JSON.stringify({id:idd}), this.headerJSN);   
  }
}
