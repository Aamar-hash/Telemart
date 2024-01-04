import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-delete-customer',
  standalone: true,
  imports: [MatDialogTitle,MatButtonModule,MatDialogContent,MatFormFieldModule,FormsModule,MatDialogModule],
  templateUrl: './delete-customer.component.html',
  styleUrl: './delete-customer.component.css'
})
export class DeleteCustomerComponent implements OnInit {


  customerName !: string;
  title !: string;
data: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<DeleteCustomerComponent> 
  )

    {
        this.customerName=data.customerName;
        this.title=data.title;
        console.log(this.customerName);
    }

    ngOnInit(): void {
        
    }

    delete() {
      const deletemob=true;
      this.dialogRef.close(deletemob);
      }
      close() {
      this.dialogRef.close();
      }
}
