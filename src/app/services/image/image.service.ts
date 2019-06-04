import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { cancatHostPost } from '../../const';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  headerJSN = {headers: new HttpHeaders().set('content-type','application/json')};
  constructor(
    private http:HttpClient
  ) { }
  getImages(){
    return this.http.get(cancatHostPost+'/get_images');
  }
  addImage(pathp: string){
    console.log(pathp)
    return this.http.post(cancatHostPost+'/add_image', JSON.stringify({path: pathp}), this.headerJSN);
  }
  editImage(idd:number, patht:string){
    return this.http.post(cancatHostPost+'/edit_image', JSON.stringify({path: patht, id: idd}), this.headerJSN);  
  }
  dropImage(idd:number){
    return this.http.post(cancatHostPost+'/drop_image', JSON.stringify({id: idd}), this.headerJSN);  
  }
}
