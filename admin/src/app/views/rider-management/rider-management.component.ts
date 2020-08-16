import { Component, OnInit } from '@angular/core';
import { DbService } from 'app/services/db.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateRiderFormComponent } from '../../components/forms/create-rider-form/create-rider-form.component';
import * as _ from 'lodash';
import { CreateBillingMethodFormComponent } from 'app/components/forms/create-billing-method-form/create-billing-method-form.component';

@Component({
  selector: 'app-rider-management',
  templateUrl: './rider-management.component.html',
  styleUrls: ['./rider-management.component.css']
})
export class RiderManagementComponent implements OnInit {

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

    var countResult = await this.dbservice.countRiders(query);
 
    console.log(countResult);
    this.config = {
      itemsPerPage: 15,
      currentPage: 1,
      totalItems: countResult.count
    };
    this.resultsCount = countResult.count;
    this.renderTable = true;

    this.dbservice.getRiders(0, 15, {}).subscribe((data) => {
      this.collection = _.union(this.collection, data);
      console.log(data);
    });

  }

  pageChanged(event){
    console.log(event);
    this.dbservice.getRiders(event, 15, this.query).subscribe((data) => {
      this.collection = _.union(this.collection, data);
      console.log(data);
      this.config.currentPage = event;
    });
  }

  editItem(event, item){
    console.log(event);
    console.log(item);
  }

  addPayment(event, item){
    console.log(event);
    console.log(item);
    const dialogRef = this.dialog.open(CreateBillingMethodFormComponent, {
      minWidth: '80vw',
      data: {name: item.name, mobileNumber: item.mobileNumber, user_id: item._id}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });

  }



  removeItem(event, item){
    console.log(event);
    console.log(item);
  }

  createNewItem(){
    console.log("create new");
    const dialogRef = this.dialog.open(CreateRiderFormComponent, {
      minWidth: '80vw',
      data: { rider: {} }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });

  }

  viewItem(event, item){
    console.log("create new");
    const dialogRef = this.dialog.open(CreateRiderFormComponent, {
      minWidth: '80vw',
      data: {rider: item , action : 'view' }
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
    var countResult = await this.dbservice.countRiders(this.query);
    this.resultsCount = countResult.count;
    this.dbservice.getRiders(0, 15, this.query).subscribe((data) => {
      this.collection = _.union(this.collection, data);
      console.log(data);
    })
  }

}
