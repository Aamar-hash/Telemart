import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule, MatCardTitle} from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog'; 
import { MatGridTile } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field'; // Add this import
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';



@NgModule({
  declarations: [],
  imports: [MatCardModule,
  LayoutModule,
   MatToolbarModule,
  MatButtonModule,
MatSidenavModule,
MatIconModule,
 MatListModule,
 MatDialogModule,
 MatInputModule,
 MatCardModule,
 MatDialogModule,
 MatRadioModule,
 MatTableModule,
 MatFormFieldModule,
 FormControl,
 MatTableDataSource,

 
 
 
 
 
  

],
  exports:
  [MatCardModule, LayoutModule,
    MatToolbarModule,
   MatButtonModule,
 MatSidenavModule,
 MatIconModule,
  MatListModule, MatDialogModule,
  MatListModule,
  MatDialogModule,
  MatInputModule,
  MatCardModule,
  MatDialogModule,
  MatTableModule,
  MatFormFieldModule,
  FormControl,
  MatTableDataSource
  ]
  
})
export class MaterialModule { }
