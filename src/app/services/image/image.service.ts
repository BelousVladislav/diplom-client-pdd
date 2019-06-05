import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { cancatHostPost } from '../../const';
import { image } from '../../classes/image'
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  headerJSN = {headers: new HttpHeaders().set('content-type','application/json')};
  constructor(
    private http:HttpClient
  ) { }
  getImages(image_id?: number){
    let url: string='';
    if (image_id==undefined){
      url = cancatHostPost+'/get_images';
    }else{
      url = cancatHostPost+`/get_images?id=${image_id}`; 
    }
    return this.http.get<image[]>(url);
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
