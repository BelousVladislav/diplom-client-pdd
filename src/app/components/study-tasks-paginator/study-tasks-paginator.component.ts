import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-study-tasks-paginator',
  templateUrl: './study-tasks-paginator.component.html',
  styleUrls: ['./study-tasks-paginator.component.css']
})
export class StudyTasksPaginatorComponent implements OnInit {
  @Input() countPage: number;
  @Output() OutPage = new EventEmitter();
  PageArray: number[] = [];
  thisPage: number = 0;
  // activePage: number;
  constructor() { }
  selectPage(sel: number){
    if(sel>=0 && sel<this.countPage){
      this.thisPage = sel;
      this.OutPage.emit(this.thisPage);
      // this.activePage = sel;
      console.log(this.thisPage)
    }
  }
  prevPage(){
    this.selectPage(this.thisPage-1); 
  }
  nextPage(){
    this.selectPage(this.thisPage+1); 
  }
  ngOnInit() {
    console.log('COUNT:  '+this.countPage);
    for(let i: number = 0; i<this.countPage; i++){
      this.PageArray.push(i);
    }
    console.log(this.PageArray)
  }

}
