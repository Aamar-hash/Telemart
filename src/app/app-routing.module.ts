import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './component/dashboard/doctor/doctor.component';
import { ViewMobileComponent } from './component/dashboard/doctor/view-mobile/view-mobile.component';
import { CustomerComponent } from './component/dashboard/customer/customer.component';
import { ViewCustomerComponent } from './component/dashboard/customer/view-customer/view-customer.component';
import { LoginComponent } from './component/auth/login/login.component';
import { AuthguardGuard } from './shared/guard/authguard.guard';
const routes: Routes = [
  {path : 'dashboard', children :
  [
    {path : '', redirectTo: 'mobile', pathMatch: 'full'},
    {path : 'customer', component: CustomerComponent},
    {path : 'doctor', component: DoctorComponent},
    {path : 'doctor/:id', component: ViewMobileComponent},
    {path : 'customer/:id', component: ViewCustomerComponent},

  ], canActivate: [AuthguardGuard]},
  {
    path: 'login', component: LoginComponent
  },
  {path: '', redirectTo: 'login',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }