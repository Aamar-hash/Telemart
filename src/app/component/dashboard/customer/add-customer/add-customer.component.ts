import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common'; // Make sure to import CommonModule
import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [MatNativeDateModule,MatDatepickerModule, CommonModule, MatButtonModule, MatDividerModule, MatSelectModule, MatRadioModule, MatInputModule, MatFormFieldModule, MatGridListModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent implements OnInit {


  form !: FormGroup;
  title !: string;
  customer_id !: string;
  customer_name !: string;
  mobile_no !: string;
  gender !: string;
  date !: Date;
  id !: string;
  buttonName !: string;


  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<AddCustomerComponent>


  ) {

    this.title = data.title;
    this.id = data.id;
    this.customer_id = data.customer_id;
    this.customer_name = data.customer_name;
    this.mobile_no = data.mobile_no;
    this.gender = data.gender;
    this.date = data.date;
    this.buttonName = data.buttonName;

  }

  ngOnInit(): void {

    this.form=this.fb.group({
      id: [this.id],
      customer_id: [this.customer_id,[]],
      customer_name:[this.customer_name,[Validators.required]],
      mobile_no: [this.mobile_no,[Validators.required]],
      gender:[this.gender,[Validators.required]],
      date:[this.date,[Validators.required]],      

  })
}


  cancelRegistration() {
    this.dialogRef.close();
  }

  registerCustomer() {
    this.dialogRef.close(this.form.value);
  }



}
