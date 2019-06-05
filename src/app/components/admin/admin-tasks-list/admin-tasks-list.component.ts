import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { task } from '../../../classes/task';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-admin-tasks-list',
  templateUrl: './admin-tasks-list.component.html',
  styleUrls: ['./admin-tasks-list.component.css']
})
export class AdminTasksListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() OutSelectTask = new EventEmitter();
  paramThemeId: number;
  tasks: task[] = [];
  selectedTask: task;
  DataSource: MatTableDataSource<task>;
  displayedColumns: string[] = ['id', 'name'];
  constructor(
    private TaskS:TaskService,
    private route: ActivatedRoute
  ) { }
  applyFilter(filterValue: string) {
    console.log(filterValue);
    this.DataSource.filter = filterValue.trim().toLowerCase();
    if (this.DataSource.paginator) {
      this.DataSource.paginator.firstPage();
  }
}
  ngOnInit() {
    this.refreshDataSource();
  }
  refreshDataSource(theme_id?:number){
    this.TaskS.getTasks(theme_id).subscribe((data:task[]) => {
      this.tasks = data;
      this.DataSource = new MatTableDataSource(this.tasks);
      this.DataSource.paginator = this.paginator;
      console.log(this.tasks);
    })
  };
  selectTask(tsk: task){
    this.selectedTask = tsk;
    this.OutSelectTask.emit(this.selectedTask);
    console.log(this.selectedTask);
  }
}
