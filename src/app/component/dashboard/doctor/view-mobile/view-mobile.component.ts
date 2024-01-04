import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../shared/service/data.service';
import { MatCardModule } from '@angular/material/card';
import {  MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-view-mobile',
  standalone: true,
  imports: [MatCardModule, MatDividerModule],
  templateUrl: './view-mobile.component.html',
  styleUrl: './view-mobile.component.css'
})
export class ViewMobileComponent implements OnInit{

  id !: any;
  mobileObj !: any;

  constructor(private route: ActivatedRoute, private dataApi: DataService )
  {
      this.id =route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
      
    this.getMobileById();
  }

  getMobileById()
  {
      this.dataApi.getMobileById(this.id).subscribe(res =>
        {
          this.mobileObj =res;
          console.log(this.mobileObj);
        })
  }
}
