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

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  async register() {
    if (!this.name || !this.lastName || !this.university || !this.career || !this.email || !this.password || !this.confirmPassword) {
      await this.showToast('Debes completar todos los campos.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      await this.showToast('Las contraseñas no coinciden.');
      return;
    }

    if (this.password.length < 6) {
      await this.showToast('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      await this.authService.register(this.email, this.password);

      await this.showToast('Cuenta creada. Revisa tu correo para verificarla.');
      this.router.navigate(['/login']);

    } catch (error) {
      console.error(error);
      await this.showToast('No se pudo crear la cuenta. Revisa los datos ingresados.');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
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