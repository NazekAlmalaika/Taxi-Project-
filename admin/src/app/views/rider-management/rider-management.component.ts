import { Component, OnInit } from '@angular/core';
import { DbService } from 'app/services/db.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateRiderFormComponent } from '../../components/create-rider-form/create-rider-form.component';

@Component({
  selector: 'app-rider-management',
  templateUrl: './rider-management.component.html',
  styleUrls: ['./rider-management.component.css']
})
export class RiderManagementComponent implements OnInit {

  config: any;
  collection = { count: 60, data: [] };

  animal: string;
  name: string;


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

  this.config = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1000
  };

  }

  ngOnInit() {
  }

  pageChanged(event){
    console.log(event);
    /*var n = (event-1) * 15 ;
    this.collection.data = [];
    for (var i = 0; i < 15; i++) {
      this.collection.data.push(
        {
          id: (i + 1) + n,
          value: "items number " + (i + (1 + n)) 
        }
      );
    }*/
    this.config.currentPage = event;
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

    this.dbservice.createRider({
      name : "shit",
      mobileNumber: "09876574674",
      email: "test@blabla.com"
    }).subscribe((data) => {
      console.log(data);
    });

    const dialogRef = this.dialog.open(CreateRiderFormComponent, {
      minWidth: '80vw',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });

  }

}
