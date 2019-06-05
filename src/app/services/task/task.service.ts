import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { cancatHostPost } from '../../const';
import { task } from '../../classes/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  headerJSN = {headers: new HttpHeaders().set('content-type','application/json')};
  constructor(
    private http:HttpClient
  ) { }
  getTasks(theme_id?: number){
    let url: string='';
    if (theme_id==undefined){
      url = cancatHostPost+'/tasks';
    }else{
      url = cancatHostPost+`/tasks?theme_id=${theme_id}`; 
    }
    return this.http.get<task[]>(url);

  }
  addTask(newTask: task){
    return this.http.post(cancatHostPost+'/add_task', JSON.stringify(newTask), this.headerJSN); 
  }
  editTask(editTask: task){
    return this.http.post(cancatHostPost+'/edit_task', JSON.stringify(editTask), this.headerJSN); 
  }
  dropTask(idd: number){
    return this.http.post(cancatHostPost+'/drop_task', JSON.stringify({task_id:idd}), this.headerJSN);   
  }
}
