import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../shared/service/data.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { DatePipe } from '@angular/common';
import { Mobile } from '../../../../shared/model/mobile';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddMobileComponent } from '../../doctor/add-mobile/add-mobile.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteMobileComponent } from '../../doctor/delete-mobile/delete-mobile.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-view-customer',
  standalone: true,
  providers: [DatePipe],
  imports: [MatCardModule, MatDividerModule,MatIconModule,MatInputModule,MatFormFieldModule,MatTableModule,MatPaginatorModule,MatMenuModule, MatIconModule, MatFormFieldModule],
  templateUrl: './view-customer.component.html',
  styleUrl: './view-customer.component.css'
})
export class ViewCustomerComponent implements OnInit {
  id !: any;
  customerObj !: any;
  allmobiles: Mobile[] = [];

  displayedColumns: string[] = ['mobile_id', 'mobile_name', 'mobile_model', 'mobile_color', 'mobile_sim', 'mobile_company', 'action']
  dataSource !: MatTableDataSource<Mobile>;
  appearance !: 'standard';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private route: ActivatedRoute,
     private dataApi: DataService,
      private datePipe: DatePipe,
     private dialog: MatDialog,

       private snackBar: MatSnackBar) {
    this.id = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getCustomerById();
    this.getAllMobileForCustomers();
  }

  getCustomerById() {
    this.dataApi.getCustomerById(this.id).subscribe(res => {
      this.customerObj = res;
      console.log(this.customerObj);

      // Format the date
      if (this.customerObj && this.customerObj.date) {
        this.customerObj.formattedDate = this.datePipe.transform(this.customerObj.date.toDate(), 'MM/dd/yyyy');
      }
    });
  }

  getAllMobileForCustomers() {
    this.dataApi.getAllMobile().subscribe(res => {
      this.allmobiles = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.mobile_id = e.payload.doc.id;
        if (data.customer_id = this.id) {
          return data;
        }
      })
      console.log(this.allmobiles);
      this.dataSource = new MatTableDataSource(this.allmobiles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
        this.dataApi.updateMobile(data);
        this.openSnackBar('Mobile updated successfully', 'OK');
        console.log('Data', data);
      }
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }


  viewMobile(row: any) {
    console.log('working');
    window.open('dashboard/doctor/' + row.id, ('_blank'));
  }





}