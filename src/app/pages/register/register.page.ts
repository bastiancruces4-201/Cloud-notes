import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonButton,
    IonInput,
    IonItem,
    IonLabel
  ]
})
export class RegisterPage {
  name = '';
  lastName = '';
  university = '';
  career = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private router: Router) {}

  register() {
    console.log('Registro:', {
      name: this.name,
      lastName: this.lastName,
      university: this.university,
      career: this.career,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goBack() {
    this.router.navigate(['/welcome']);
  }
}
