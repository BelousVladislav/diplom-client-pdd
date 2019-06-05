import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { theme } from '../../classes/theme';
import { task } from '../../classes/task';
import { TaskService } from '../../services/task/task.service';
import { QuestionService } from '../../services/question/question.service';
import{ question } from '../../classes/question';
import { AnswerService } from '../../services/answer/answer.service';
import{ answer } from '../../classes/answer';
import { ImageService } from '../../services/image/image.service';
import { image } from '../../classes/image'
import { load } from '@angular/core/src/render3';

@Component({
  selector: 'app-study-themes-list',
  templateUrl: './study-themes-list.component.html',
  styleUrls: ['./study-themes-list.component.css']
})
export class StudyThemesListComponent implements OnInit {
  @Output() OutTheme = new EventEmitter();
  themes: theme[] = [];
  selectedTheme: theme;
  load: boolean = false;
  constructor(
    private ThemeS:ThemeService,
    private TaskS:TaskService,
    private QuestionS:QuestionService,
    private AnswerS: AnswerService,
    private ImageS: ImageService
  ) { }

  ngOnInit() {
    this.ThemeS.getThemes().subscribe((data: theme[]) => {
      this.themes = data;
      this.themes.sort();
      this.load = true;
      console.log(this.themes)
    });
    
  }
  async selectTheme(sel: theme){
    this.selectedTheme = sel;
    // this.getAllDataForTheme(this.selectedTheme.id);
    // console.log('2')
    // console.log(JSON.stringify(this.selectedTheme));
    this.OutTheme.emit(this.selectedTheme);
  }

  // async getAllDataForTheme(id: number){
  //   this.TaskS.getTasks(id).subscribe((data: task[]) => {
  //     this.selectedTheme.tasks = data;
      
  //     for (let i:number=0; i<this.selectedTheme.tasks.length; i++){
  //       this.QuestionS.getQuestions(this.selectedTheme.tasks[i].id).subscribe((data: question[]) => {
  //         this.selectedTheme.tasks[i].questions =  data;


  //         for (let j:number=0; j<this.selectedTheme.tasks[i].questions.length; j++){
  //           this.AnswerS.getAnswers(this.selectedTheme.tasks[i].questions[j].id).subscribe((data: answer[]) => {
  //             this.selectedTheme.tasks[i].questions[j].answers =  data;       
  //           });
  //         }
  //         for (let j:number=0; j<this.selectedTheme.tasks[i].questions.length; j++){
  //           this.ImageS.getImages(this.selectedTheme.tasks[i].questions[j].image_id).subscribe((data: image[]) => {
  //             this.selectedTheme.tasks[i].questions[j].imageObj =  data[0];       
  //           });
  //         }
  //         // console.log(JSON.stringify(this.selectedTheme)); 
  //         console.log('1')
  //       });
  //     }

  //     for (let i:number=0; i<this.selectedTheme.tasks.length; i++){
  //       this.ImageS.getImages(this.selectedTheme.tasks[i].image_id).subscribe((data: image[]) => {
  //         this.selectedTheme.tasks[i].imageObj =  data[0];
  //       });
  //     }

    
    
  //   })
}



