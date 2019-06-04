import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ImageService } from '../../../services/image/image.service';
import { image } from '../../../classes/image'

@Component({
  selector: 'app-admin-image-list',
  templateUrl: './admin-image-list.component.html',
  styleUrls: ['./admin-image-list.component.css']
})
export class AdminImageListComponent implements OnInit {

  @Output() OutSelectImage = new EventEmitter();

  images: image[] = [];
  selectImage: image;
  constructor(
    private ImageS: ImageService
  ) { }

  selImage(row: image){
    this.selectImage = row;
    this.OutSelectImage.emit(this.selectImage);
    // console.log(row);
  }
  refreshData(){
    this.ImageS.getImages().subscribe((data: image[]) => {
      this.images = data;
    })
  }
  ngOnInit() {
    this.refreshData();

  }

}
