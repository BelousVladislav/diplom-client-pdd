import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { task } from '../../../classes/task';
import {MatSnackBar} from '@angular/material';
import { AdminTasksListComponent } from '../admin-tasks-list/admin-tasks-list.component';

import { ActivatedRoute} from '@angular/router';
import { theme } from 'src/app/classes/theme';

@Component({
  selector: 'app-admin-tasks',
  templateUrl: './admin-tasks.component.html',
  styleUrls: ['./admin-tasks.component.css']
})
export class AdminTasksComponent implements OnInit {
  @ViewChild(AdminTasksListComponent) private child: AdminTasksListComponent;
  title = 'Адміністрування завдань';
  showAddPanel = false;
  showEditPanel = false;
  selectedTask: task;
  paramThemeId: number;
  constructor(
    private TaskS:TaskService,
    private MatSnackBar:MatSnackBar,
    private route: ActivatedRoute
  ) { }
  selectedTaskF(selTask: task){
    this.selectedTask = selTask;
    console.log(this.selectedTask);
  }
  refreshDataSet(theme_id?:number){
    console.log('refresh');
    this.child.refreshDataSource(theme_id);
    this.showEditPanel = false; 
    this.showAddPanel = false;
  };
  showAddPanelF(){
    this.showEditPanel = false; 
    this.showAddPanel = !this.showAddPanel 
  }
  showEditPanelF(){
    if (this.selectedTask!=undefined){
        this.showAddPanel = false; 
        this.showEditPanel = !this.showEditPanel
    }else{
        this.MatSnackBar.open('Спочатку оберіть таск для редагування', 'Зачинити', {duration:5000});   
    } 
  }
deleteTask(){
    if (this.selectedTask!=undefined){
        this.TaskS.dropTask(this.selectedTask.id).subscribe(data => {
            if(data.hasOwnProperty('status')){
                this.MatSnackBar.open('Таск успішно видалено', 'Зачинити', {duration:5000});
                this.refreshDataSet()
            }else{
                this.MatSnackBar.open('Помилка під час видалення таску', 'Зачинити', {duration:5000});
            }
        })
    }else{
        this.MatSnackBar.open('Спочатку оберіть таск для видалення', 'Зачинити', {duration:5000});   
    }
}
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.paramThemeId = Number(params.get("theme_id"))
    });
    console.log(this.paramThemeId);
    this.refreshDataSet(this.paramThemeId)
  }

}
