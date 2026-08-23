import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonButton,
  IonIcon,
  IonSpinner,
  IonInput,
  IonItem,
  IonLabel,
  ToastController
} from '@ionic/angular/standalone';

import { Router } from '@angular/router';

import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  personOutline,
  mailOutline,
  schoolOutline,
  bookOutline,
  checkmarkCircleOutline,
  createOutline,
  saveOutline,
  closeOutline
} from 'ionicons/icons';

import { AuthService } from '../../core/services/auth';
import { UserModel } from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonButton,
    IonIcon,
    IonSpinner,
    IonInput,
    IonItem,
    IonLabel
  ]
})
export class ProfilePage {

  userProfile: UserModel | null = null;

  email = '';
  emailVerified = false;

  isLoading = true;
  isEditing = false;
  isSaving = false;

  editName = '';
  editLastName = '';
  editUniversity = '';
  editCareer = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) {

    addIcons({
      arrowBackOutline,
      personOutline,
      mailOutline,
      schoolOutline,
      bookOutline,
      checkmarkCircleOutline,
      createOutline,
      saveOutline,
      closeOutline
    });
  }

  async ionViewWillEnter() {
    await this.loadProfile();
  }

  async loadProfile() {

    this.isLoading = true;

    try {

      const currentUser =
        await this.authService.getCurrentUser();

      if (!currentUser) {

        await this.showToast(
          'No fue posible identificar al usuario.'
        );

        await this.router.navigate(['/login']);
        return;
      }

      await currentUser.reload();

      this.email =
        currentUser.email ?? '';

      this.emailVerified =
        currentUser.emailVerified;

      this.userProfile =
        await this.authService.getUserProfile(
          currentUser.uid
        );

      if (!this.userProfile) {

        await this.showToast(
          'No fue posible cargar la información del perfil.'
        );

        return;
      }

      this.loadEditFields();

    } catch (error) {

      console.error(
        'Error al cargar el perfil:',
        error
      );

      await this.showToast(
        'Ocurrió un error al cargar tu perfil.'
      );

    } finally {

      this.isLoading = false;
    }
  }

  loadEditFields() {

    if (!this.userProfile) {
      return;
    }

    this.editName =
      this.userProfile.name ?? '';

    this.editLastName =
      this.userProfile.lastName ?? '';

    this.editUniversity =
      this.userProfile.university ?? '';

    this.editCareer =
      this.userProfile.career ?? '';
  }

  startEditing() {

    this.loadEditFields();
    this.isEditing = true;
  }

  cancelEditing() {

    this.loadEditFields();
    this.isEditing = false;
  }

  async saveProfile() {

    if (
      !this.editName.trim() ||
      !this.editLastName.trim() ||
      !this.editUniversity.trim() ||
      !this.editCareer.trim()
    ) {

      await this.showToast(
        'Debes completar todos los campos.'
      );

      return;
    }

    this.isSaving = true;

    try {

      const currentUser =
        await this.authService.getCurrentUser();

      if (!currentUser) {

        await this.showToast(
          'No fue posible identificar al usuario.'
        );

        return;
      }

      await this.authService.updateUserProfile(
        currentUser.uid,
        {
          name: this.editName.trim(),
          lastName: this.editLastName.trim(),
          university: this.editUniversity.trim(),
          career: this.editCareer.trim()
        }
      );

      await this.showToast(
        'Perfil actualizado correctamente.'
      );

      this.isEditing = false;

      await this.loadProfile();

    } catch (error) {

      console.error(
        'Error al actualizar el perfil:',
        error
      );

      await this.showToast(
        'No fue posible actualizar el perfil.'
      );

    } finally {

      this.isSaving = false;
    }
  }

  getInitials(): string {

    if (!this.userProfile) {
      return 'CN';
    }

    const name =
      this.userProfile.name?.trim() || '';

    const lastName =
      this.userProfile.lastName?.trim() || '';

    return (
      name.charAt(0).toUpperCase() +
      lastName.charAt(0).toUpperCase()
    );
  }

  async goBack() {
    await this.router.navigate(['/home']);
  }

  private async showToast(
    message: string
  ) {

    const toast =
      await this.toastController.create({
        message,
        duration: 3000,
        position: 'bottom'
      });

    await toast.present();
  }
}