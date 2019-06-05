import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { theme } from '../../classes/theme';
import { task } from 'src/app/classes/task';

@Component({
  selector: 'app-study-page',
  templateUrl: './study-page.component.html',
  styleUrls: ['./study-page.component.css']
})
export class StudyPageComponent implements OnInit {
  selInChildTheme: theme;
  showThemesList = true;
  showTasks = false;
  constructor(
    private ThemeS:ThemeService
  ) { }
  selectThemeFromChild(selTheme_id: theme){
    this.selInChildTheme = selTheme_id;
    this.showThemesList = false;
    this.showTasks = true;
    console.log(this.selInChildTheme);

  }
  ngOnInit() {

  }
  closeTasks(){
    this.showThemesList = true;
    this.showTasks = false;    
  }

}
