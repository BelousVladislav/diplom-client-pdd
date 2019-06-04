import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { theme } from '../../classes/theme';
import { cancatHostPost } from '../../const';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  headerJSN = {headers: new HttpHeaders().set('content-type','application/json')};
  constructor(
    private http: HttpClient
  ) { }
  getThemes(){
    return this.http.get(cancatHostPost+'/themes/get_themes');
  }
  addTheme(str:string){
    return this.http.post(cancatHostPost+'/themes/add_themes', str, this.headerJSN);
  }
  dropTheme(th: theme){
    return this.http.post(cancatHostPost+'/themes/drop_theme', JSON.stringify(th), this.headerJSN);
  }
  editTheme(newname: string, th: theme){
    return this.http.post(cancatHostPost+'/themes/edit_theme', JSON.stringify({id: th.id, name: newname}), this.headerJSN);
  }
}
