import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; // Add this import
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogTitle } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button'; 

@Component({
  selector: 'app-delete-mobile',
  standalone: true,
  imports: [MatDialogTitle,MatButtonModule,MatDialogContent,MatFormFieldModule,FormsModule,MatDialogModule],
  templateUrl: './delete-mobile.component.html',
  styleUrl: './delete-mobile.component.css'
})
export class DeleteMobileComponent implements OnInit {



  mobileName !: string;
  title !: string;
data: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<DeleteMobileComponent> 
  )

    {
        this.mobileName=data.mobileName;
        this.title=data.title;
        console.log(this.mobileName);
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
