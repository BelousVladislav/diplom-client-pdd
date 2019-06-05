import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { cancatHostPost } from '../../const';
import{ answer } from '../../classes/answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  headerJSN = {headers: new HttpHeaders().set('content-type','application/json')};
  constructor(
    private http:HttpClient
  ) { }
  getAnswers(Question_id?: number){
    let url: string='';
    if (Question_id==undefined){
      url = cancatHostPost+'/answers';
    }else{
      url = cancatHostPost+`/answers?question_id=${Question_id}`; 
    }
    return this.http.get<answer[]>(url);
  }
  addAnswer(newAnswer: answer){
    return this.http.post(cancatHostPost+'/answer/add', JSON.stringify(newAnswer), this.headerJSN); 
  }
  editAnswer(editQuestion: answer){
    return this.http.post(cancatHostPost+'/answer/edit', JSON.stringify(editQuestion), this.headerJSN); 
  }
  dropAnswer(idd: number){
    return this.http.post(cancatHostPost+'/answer/drop', JSON.stringify({id:idd}), this.headerJSN);   
  }
}
