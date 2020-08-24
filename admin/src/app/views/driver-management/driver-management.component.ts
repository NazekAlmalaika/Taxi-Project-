import { Component, OnInit } from '@angular/core';
import { DbService } from 'app/services/db.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateDriverFormComponent } from 'app/components/forms/create-driver-form/create-driver-form.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-driver-management',
  templateUrl: './driver-management.component.html',
  styleUrls: ['./driver-management.component.css']
})
export class DriverManagementComponent implements OnInit {

  config: any;
  collection = [];

  renderTable: boolean = false;
  resultsCount : Number = 0;

  animal: string;
  name: string;
  searchMobileNumber: string;
  searchName: string;

  query : {};


   constructor(private dbservice: DbService, public dialog: MatDialog) { 
    //Create dummy data
    for (var i = 0; i < 15; i++) {
      /*this.collection.data.push(
        {
          id: i + 1,
          value: "items number " + (i + 1)
        }
      );*/
    }
    
     

  }

  async ngOnInit() {
    var query = {};

    var countResult = await this.dbservice.countDrivers(query);
 
    console.log(countResult);
    this.config = {
      itemsPerPage: 15,
      currentPage: 1,
      totalItems: countResult.count
    };
    this.resultsCount = countResult.count;
    this.renderTable = true;

    this.dbservice.getDrivers(0, 15, {}).subscribe((data) => {
      this.collection = _.union(this.collection, data);
      console.log(data);
    });

  }

  pageChanged(event){
    console.log(event);
    this.dbservice.getDrivers(event, 15, this.query).subscribe((data) => {
      this.collection = _.union(this.collection, data);
      console.log(data);
      this.config.currentPage = event;
    });
  }

  editItem(event, item){
    console.log(event);
    console.log(item);
  }


  removeItem(event, item){
    console.log(event);
    console.log(item);
  }

  createNewItem(){
    console.log("create new");
    const dialogRef = this.dialog.open(CreateDriverFormComponent, {
      minWidth: '80vw',
      data: { driver: {} }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });

  }

  viewItem(event, item){
    console.log("create new");
    const dialogRef = this.dialog.open(CreateDriverFormComponent, {
      minWidth: '80vw',
      data: {driver: item , action : 'view' }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });

  }

  async refreshTable(){
    this.query = {}
    if(this.searchMobileNumber){
      this.query = {mobileNumber: this.searchMobileNumber};
    }
    this.collection = [];
    var countResult = await this.dbservice.countDrivers(this.query);
    this.resultsCount = countResult.count;
    this.dbservice.getDrivers(0, 15, this.query).subscribe((data) => {
      this.collection = _.union(this.collection, data);
      console.log(data);
    })
  }
}
