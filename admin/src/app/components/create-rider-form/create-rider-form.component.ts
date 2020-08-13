import { Inject, Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-create-rider-form',
  templateUrl: './create-rider-form.component.html',
  styleUrls: ['./create-rider-form.component.css']
})
export class CreateRiderFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateRiderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void{
  }

}


