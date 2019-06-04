import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from '../../../services/image/image.service';
import { image } from '../../../classes/image'
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { Subject } from 'rxjs';
import { AdminImageListComponent } from '../admin-image-list/admin-image-list.component'
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-admin-images',
  templateUrl: './admin-images.component.html',
  styleUrls: ['./admin-images.component.css']
})
export class AdminImagesComponent implements OnInit {
  @ViewChild(AdminImageListComponent) 
  private childImageList: AdminImageListComponent;
  title: string = 'Адміністрування картинок'
  selectImage: image;
  panel_add:boolean = false;
  panel_edit:boolean = false;
  thisURL: string = '';
  addImageForm: FormGroup;
  EditImageForm: FormGroup;
  constructor(
    private ImageS:ImageService,
    private _formBuilder: FormBuilder,
    private MatSnackBar: MatSnackBar
  ) { }
  getSelectImage(sel:image){
    // console.log('111111'+JSON.stringify(sel));
    this.selectImage = sel;
    this.thisURL=sel.path;
    console.log(this.selectImage)
  }
  EmitAdd(){
    console.log('add');
    this.panel_edit = false;
    this.panel_add = !this.panel_add;
  }
  EmitEdit(){
    this.EditImageForm = this._formBuilder.group({
      idEdit:[this.selectImage.id],
      urlEdit:[this.selectImage.path, [Validators.required, Validators.minLength(2), Validators.maxLength(300)]]
    });
    this.EditImageForm.controls['idEdit'].disable();
    if(this.selectImage!=undefined && this.selectImage!=null){
      console.log('Edit');
      this.panel_add = false;
      this.panel_edit = !this.panel_edit;
    }else{
      this.MatSnackBar.open(`Спочатку оберіть картинку для редагування`, 'Зачинити', {duration:5000});  
    }
  }
  EmitDelete(){
    if(this.selectImage!=undefined && this.selectImage!=null){
      console.log('Delete');
      this.ImageS.dropImage(this.selectImage.id).subscribe(data => {
        if(data.hasOwnProperty('status')){
          this.panel_add=false;
          this.panel_edit=false;
          this.MatSnackBar.open(`Картинка успішно видалена з галереї`, 'Зачинити', {duration:5000});
          this.childImageList.refreshData();
        }else{
          this.MatSnackBar.open(`Виникла помилка під час видалення картинки з галереї`, 'Зачинити', {duration:5000})   
        }
      })
    }else{
      this.MatSnackBar.open(`Спочатку оберіть картинку для редагування`, 'Зачинити', {duration:5000});  
    }
  }
  ClickButtonAddImage(){
    console.log(this.addImageForm.get('url').value);
    this.ImageS.addImage(this.addImageForm.get('url').value).subscribe(data => {
      if(data.hasOwnProperty('status')){
        this.panel_add=false;
        this.MatSnackBar.open(`Картинка успішно додана до галереї`, 'Зачинити', {duration:5000});
        this.childImageList.refreshData();
      }else{
        this.MatSnackBar.open(`Виникла помилка під час додання картинки до галереї`, 'Зачинити', {duration:5000})   
      }
    })
  }
  ClickButtonEditImage(){
    this.ImageS.editImage(this.EditImageForm.get('idEdit').value, this.EditImageForm.get('urlEdit').value).subscribe(data => {
      if(data.hasOwnProperty('status')){
        this.panel_edit=false;
        this.MatSnackBar.open(`Картинка успішно відредагована`, 'Зачинити', {duration:5000});
        this.childImageList.refreshData();
      }else{
        this.MatSnackBar.open(`Виникла помилка під час редагування картинки`, 'Зачинити', {duration:5000})   
      }
    })
  }
  // addImage(){
  //   this.ImageS.
  // }
  ngOnInit() {
    this.addImageForm = this._formBuilder.group({
      url:['', [Validators.required, Validators.minLength(2), Validators.maxLength(300)]]
    });
    // this.EditImageForm = this._formBuilder.group({
    //   idEdit:[this.selectImage.id+''],
    //   urlEdit:['', [Validators.required, Validators.minLength(2), Validators.maxLength(300)]]
    // });
  }


}
