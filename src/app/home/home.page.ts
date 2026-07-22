import { addIcons } from 'ionicons';
import {
  folderOutline,
  cloudUploadOutline,
  searchOutline,
  personOutline
} from 'ionicons/icons';

import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonSpinner
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../core/services/auth';
import { UserModel } from '../core/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonIcon,
    IonSpinner
  ],
})
export class HomePage implements OnInit {

  userProfile: UserModel | null = null;
  loading = true;

  constructor(
  private authService: AuthService,
  private router: Router
) {
  addIcons({
    folderOutline,
    cloudUploadOutline,
    searchOutline,
    personOutline
  });
}

  async ngOnInit() {
    await this.loadUserProfile();
  }

  async loadUserProfile() {
    try {
      const currentUser = await this.authService.getCurrentUser();

      if (!currentUser) {
        await this.router.navigate(['/login']);
        return;
      }

      this.userProfile = await this.authService.getUserProfile(
        currentUser.uid
      );

    } catch (error) {
      console.error('Error al cargar el perfil:', error);
    } finally {
      this.loading = false;
    }
  }

  async goToMyDocuments() {
  await this.router.navigate(['/my-documents']);
  }

  goToUploadDocument() {
    console.log('Ir a Subir apunte');
  }

  goToSearchDocuments() {
    console.log('Ir a Buscar apuntes');
  }

  goToProfile() {
    console.log('Ir a Mi perfil');
  }

  async logout() {
    await this.authService.logout();
    await this.router.navigate(['/login']);
  }
}
