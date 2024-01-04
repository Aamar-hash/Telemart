import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Add this line
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,MatInputModule,MatButtonModule,MatFormFieldModule,ReactiveFormsModule,ReactiveFormsModule,CommonModule,MatCardModule,MatFormFieldModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  form !: FormGroup;
  email : any =' ';
  password : any =' ';


  constructor(private authApi: AuthService,
     private fb: FormBuilder) {

    this.form = this.fb.group({
      email: [this.email, [Validators.required,Validators.email]],
      password: [this.password, [Validators.required]],
      
    })
    }

  ngOnInit(): void {

    }

    login()
    {
      this.authApi.login(this.form.value.email,this.form.value.password);
    }

}
