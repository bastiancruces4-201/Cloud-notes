import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  ToastController
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';

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
    IonLabel
  ]
})
export class LoginPage {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  async login() {
    if (!this.email || !this.password) {
      await this.showToast('Debes ingresar correo y contraseña.');
      return;
    }

    try {
      const user = await this.authService.login(this.email, this.password);

      if (!user.emailVerified) {
        await this.showToast('Debes verificar tu correo antes de ingresar.');
        await this.authService.logout();
        return;
      }

      await this.showToast('Inicio de sesión exitoso.');
      this.router.navigate(['/home']);

    } catch (error) {
      console.error(error);
      await this.showToast('Correo o contraseña incorrectos.');
    }
  }
  async resetPassword() {
  if (!this.email) {
    await this.showToast('Ingresa tu correo para recuperar la contraseña.');
    return;
  }

  try {
    await this.authService.resetPassword(this.email);
    await this.showToast('Te enviamos un correo para restablecer tu contraseña.');
  } catch (error) {
    console.error(error);
    await this.showToast('No se pudo enviar el correo de recuperación.');
  }
}

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goBack() {
    this.router.navigate(['/welcome']);
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position: 'bottom',
      color: 'primary'
    });

    await toast.present();
  }
}