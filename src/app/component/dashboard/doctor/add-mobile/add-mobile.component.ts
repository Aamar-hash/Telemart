import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'; 
import { CommonModule } from '@angular/common'; // Make sure to import CommonModule
import { NgModule } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button'; 


@Component({
  selector: 'app-add-mobile',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatDividerModule,MatSelectModule,MatRadioModule,MatInputModule,MatFormFieldModule,MatGridListModule, MatDialogModule,ReactiveFormsModule],
  templateUrl: './add-mobile.component.html',
  styleUrl: './add-mobile.component.css'
})
export class AddMobileComponent implements OnInit{


  form !: FormGroup;
  title !: string;
  mobile_id !: string;
  mobile_model !: string;
  mobile_name !: String;
  mobile_color !: String;
  mobile_sim !: string;
  mobile_company : string[]=["Apple","Samsung","Vivo","Real-me"]
    id !: string;
    buttonName !: string;

  constructor(
      private fb: FormBuilder,
      @Inject(MAT_DIALOG_DATA) data: any,
      private dialogRef: MatDialogRef<AddMobileComponent>

  ){

      this.title=data.title;
      this.id=data.id;
      this.mobile_id=data.mobile_id;
      this.mobile_model=data.mobile_model;
      this.mobile_name=data.mobile_name;
      this.mobile_color=data.mobile_color;
      this.mobile_sim=data.mobile_sim;
      this.buttonName = data.buttonName;
  
  }

  ngOnInit(): void {


    this.form=this.fb.group({
      id: [this.id],
      mobile_id: [this.mobile_id,[]],
      mobile_model:[this.mobile_model,[Validators.required]],
      mobile_name: [this.mobile_name,[Validators.required]],
      mobile_color:[this.mobile_color,[Validators.required]],
      mobile_sim:[this.mobile_sim,[Validators.required]],      
      mobile_company:[this.mobile_company,[Validators.required]],

    })
      
  }

  cancelAddMobile()

  {
    this.dialogRef.close();
  }

  addMobile()
  {
      this.dialogRef.close(this.form.value);
  }

}
