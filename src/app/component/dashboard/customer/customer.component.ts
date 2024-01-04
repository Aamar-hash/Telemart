import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataService } from '../../../shared/service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Mobile } from '../../../shared/model/mobile'; // Update the path accordingly
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule here
import { MatMenuModule } from '@angular/material/menu'; // Import MatMenuModule
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Import MatPaginatorModule
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field'; // Add this import
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { customer } from '../../../shared/model/customer'; // Update the path accordingly
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatInputModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatMenuModule, MatIconModule, MatFormFieldModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {

  cusArr: customer[] = [];

  displayedColumns: string[] = ['customer_id', 'customer_name', 'mobile_no', 'gender', 'date', 'action']
  dataSource !: MatTableDataSource<customer>;
  appearance !: 'standard';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(

    public dialog: MatDialog,
    private datapi: DataService,

    private snackBar: MatSnackBar
  ) {

  }
  ngOnInit(): void {

    this.getallCustomer();


  }

  addCustomer() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Add Customer Here.',
      buttonName: 'Save'
    };

    const dialogRef = this.dialog.open(AddCustomerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.datapi.addCustomer(data);
        this.openSnackBar('Customer Added Successfully', 'OK');
        console.log('Data', data);
      }
    });
  }

  getallCustomer() {
    this.datapi.getallCustomer().subscribe(res => {

      console.log("Firestore response:", res);
      this.cusArr = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;

        data.dateFormatted = data.date ? this.formatDate(data.date) : null;


        return data;
      })
      console.log(this.cusArr);
      this.dataSource = new MatTableDataSource(this.cusArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  private formatDate(timestamp: any): string {
    const dateObject = timestamp.toDate(); // Convert to JavaScript Date object
    return dateObject.toLocaleDateString(); // Format the date as a string

  }

  deleteCustomer(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Delete Customer',
      customerName: row.customer_name

    };

    const dialogRef = this.dialog.open(DeleteCustomerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.datapi.deleteCustomer(row.id);
        this.openSnackBar('Customer deleted Successfully', 'OK');
        console.log('Data', data);
      }
    });

  }

  editCustomer(row: any) {

    if (row.id == null || row.customer_name == null) {
      return;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = "Edit Customer";
    dialogConfig.data.buttonName = "Update";



    const dialogRef = this.dialog.open(AddCustomerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.datapi.updateCustomer(data);
        this.openSnackBar('Customer updated successfully', 'OK');
        console.log('Data', data);
      }
    });
  }

  viewCustomer(row: any) {
    console.log('working');
    window.open('/dashboard/customer/' + row.id, ('_blank'));
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
