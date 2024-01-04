import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddMobileComponent } from './add-mobile/add-mobile.component';
import { DataService } from '../../../shared/service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Mobile } from '../../../shared/model/mobile'; // Update the path accordingly
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule here
import { MatMenuModule } from '@angular/material/menu'; // Import MatMenuModule
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Import MatPaginatorModule
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field'; // Add this import
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { DeleteMobileComponent } from './delete-mobile/delete-mobile.component';


@Component({
  selector: 'app-doctor',
  styleUrls: ['./doctor.component.css'],
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatInputModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatMenuModule, MatIconModule, MatFormFieldModule],
  templateUrl: './doctor.component.html',

})
export class DoctorComponent implements OnInit {

  mobArr: Mobile[] = [];

  displayedColumns: string[] = ['mobile_id', 'mobile_name', 'mobile_model', 'mobile_color', 'mobile_sim', 'mobile_company', 'action']
  dataSource !: MatTableDataSource<Mobile>;
  appearance !: 'standard';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    public dialog: MatDialog,
    private datapi: DataService,

    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.getAllMobile();


  }

  addMobile() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Add Mobile Here.',
      buttonName: 'Save'
    };

    const dialogRef = this.dialog.open(AddMobileComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.datapi.addMobile(data);
        this.openSnackBar('Mobile Added Successfully', 'OK');
        console.log('Data', data);
      }
    });
  }


  editMobile(row: any) {

    if (row.id == null || row.mobile_name == null) {
      return;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = "Edit Mobile";
    dialogConfig.data.buttonName = "Update";



    const dialogRef = this.dialog.open(AddMobileComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.datapi.updateMobile(data);
        this.openSnackBar('Mobile updated successfully', 'OK');
        console.log('Data', data);
      }
    });
  }

  deleteMobile(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Delete Mobile',
      mobileName: row.mobile_name

    };

    const dialogRef = this.dialog.open(DeleteMobileComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.datapi.deleteMobile(row.id);
        this.openSnackBar('Mobile deleted Successfully', 'OK');
        console.log('Data', data);
      }
    });
  }

  viewMobile(row: any) {
    console.log('working');
    window.open('dashboard/doctor/' + row.id, ('_blank'));
  }



  getAllMobile() {
    this.datapi.getAllMobile().subscribe(res => {

      console.log("Firestore response:", res);
      this.mobArr = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
      console.log(this.mobArr);
      this.dataSource = new MatTableDataSource(this.mobArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
