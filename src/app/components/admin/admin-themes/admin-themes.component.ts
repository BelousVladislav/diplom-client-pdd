import { Component, OnInit, ViewChild} from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';
import { theme } from '../../../classes/theme';
import {MatSnackBar} from '@angular/material';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-admin-themes',
  templateUrl: './admin-themes.component.html',
  styleUrls: ['./admin-themes.component.css']
})
export class AdminThemesComponent implements OnInit {
  // @Output() refreshDataSet = new EventEmitter;
  // refreshDataSetTrue(){
  //   this.refreshDataSet.emit();
  // }
  themes: theme[] = [];
  displayedColumns = ['id', 'name', 'min_balls', 'datachange', 'user_add'];
  showAddTheme: boolean = false;
  showEditTheme: boolean = false;
  selectThemeS: theme;
  selectTheme: theme;
  dataSource: MatTableDataSource<theme>;
  constructor(
    private ThemeS:ThemeService,
    private MatSnackBar:MatSnackBar,
    private router: Router
  ) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  applyFilter(filterValue: string) {
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
  }
}
  showAddThemeFunc(){
    this.showEditTheme = false;
    this.showAddTheme = !this.showAddTheme; 
  }
  showEditThemeFunc(){
    this.showAddTheme = false;
    if(this.selectTheme!= null && this.selectTheme!= undefined){
      this.showEditTheme = !this.showEditTheme; 
    }else{
      this.MatSnackBar.open(`Спочатку оберіть тему для редагування`, 'Зачинити', {duration:5000});
    }
  }

  getThemes(){
    this.ThemeS.getThemes().subscribe((data: theme[]) => {
      this.themes = data;
      console.log(JSON.stringify(this.themes))
    })
  }
  refreshDataSource(){
    this.ThemeS.getThemes().subscribe((data: theme[]) => {
      this.themes = data;
      this.dataSource = new MatTableDataSource(this.themes);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
        this.showAddTheme = false;
        this.showEditTheme = false;
      console.log(JSON.stringify(this.themes))
    })
  } 
  dropTheme(){
    if(this.selectTheme!= null && this.selectTheme!= undefined){
      this.ThemeS.dropTheme(this.selectTheme).subscribe(data=>{
        if(data.hasOwnProperty('status')){
          this.MatSnackBar.open(`Тема успішно видалена`, 'Зачинити', {duration:5000});
          this.refreshDataSource();
          this.showAddTheme = false;
          this.showEditTheme = false;
          this.selectThemeS = undefined;
        }else{
          this.MatSnackBar.open(`Помилка під видалення теми`, 'Зачинити', {duration:5000})
        }
      })
    }else{
    this.MatSnackBar.open(`Спочатку оберіть тему`, 'Зачинити', {duration:5000}) 
  }
}

  ngOnInit() {
    this.refreshDataSource();
  }
  SelectRow(selTheme: any){
    // let tr: user =  Object.create(selUser);
    let jsn = JSON.parse(JSON.stringify(selTheme));
    //console.log(jsn._name);
    this.selectThemeS = selTheme;
    this.selectTheme = new theme(jsn.name, jsn.min_balls, jsn.id, jsn.datachange, jsn.user_add);
    this.showEditTheme = false;
    this.showAddTheme = false;
    // let mewUser:user = new user('Jec','rtyu','34567','324567','23456');
     console.log(this.selectTheme);
  }
  toTasks(){
    console.log('task');
    this.router.navigateByUrl('/thisadmin/tasks/16');
  }

}
