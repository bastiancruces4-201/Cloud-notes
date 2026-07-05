import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonIcon
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonIcon
  ]
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    console.log('Correo:', this.email);
    console.log('Contraseña:', this.password);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goBack() {
    this.router.navigate(['/welcome']);
  }
}