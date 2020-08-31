import { Component, OnInit, ViewChild } from '@angular/core';
import { Driver } from 'src/app/models/driver';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'cap-list',
  templateUrl: './cap-list.component.html',
  styleUrls: ['./cap-list.component.scss'],
})
export class CapListComponent implements OnInit {

  capList : any = [];
  constructor() { }
  @ViewChild('capSlides') capSlides: IonSlides;

  ngOnInit() {
    setTimeout(()=>{
      let cap1: Driver = new Driver();
      cap1.name = "cap one";
      cap1.online = true;
      cap1.createdAt = new Date(2019,8,9);

      let cap2: Driver = new Driver();
      cap2.name = "cap two";
      cap2.online = true;
      cap2.createdAt = new Date(2020,8,9);

      let cap3: Driver = new Driver();
      cap3.name = "cap three";
      cap3.online = true;
      cap3.createdAt = new Date(2017,8,9);


      this.capList.push(cap1);
      this.capList.push(cap2);
      this.capList.push(cap3);
    }, 4000);

  }

  async next(){
      await this.capSlides.slideNext();
  }

  async prev(){
    await this.capSlides.slidePrev();
  }


  async book(){
    
  }


}
