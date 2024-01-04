import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { MaterialModule } from './material/material/material.module';
import { SidebarComponent } from './component/dashboard/sidebar/sidebar.component';
import { MatCardModule } from '@angular/material/card';
import { AddMobileComponent } from './component/dashboard/doctor/add-mobile/add-mobile.component';
import { DoctorComponent } from './component/dashboard/doctor/doctor.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    MatCardModule,
    SidebarComponent,
    LayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule ,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    
    
    // Add other modules here
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
