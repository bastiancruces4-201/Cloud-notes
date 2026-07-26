import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonButton,
  IonIcon,
  ToastController
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  cloudUploadOutline,
  documentTextOutline
} from 'ionicons/icons';

import { AuthService } from '../../core/services/auth';
import { DocumentService } from '../../core/services/document.service';
import { DocumentModel } from '../../core/models/document.model';

@Component({
  selector: 'app-my-documents',
  templateUrl: './my-documents.page.html',
  styleUrls: ['./my-documents.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonIcon
  ]
})
export class MyDocumentsPage {

  documents: DocumentModel[] = [];
  isLoading = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private documentService: DocumentService,
    private toastController: ToastController
  ) {
    addIcons({
      arrowBackOutline,
      cloudUploadOutline,
      documentTextOutline
    });
  }

  async ionViewWillEnter() {
    await this.loadDocuments();
  }

  async loadDocuments() {
    this.isLoading = true;

    try {
      const currentUser = await this.authService.getCurrentUser();

      if (!currentUser) {
        await this.showToast(
          'No fue posible identificar al usuario.'
        );

        this.isLoading = false;
        return;
      }

      this.documents =
        await this.documentService.getDocumentsByUser(
          currentUser.uid
        );

    } catch (error) {
      console.error(
        'Error al cargar los documentos:',
        error
      );

      await this.showToast(
        'No fue posible cargar tus apuntes.'
      );

    } finally {
      this.isLoading = false;
    }
  }

  async goBack() {
    await this.router.navigate(['/home']);
  }

  async goToUploadDocument() {
    await this.router.navigate(['/upload-document']);
  }

  formatDate(createdAt: any): string {
    if (!createdAt) {
      return 'Fecha no disponible';
    }

    const date = createdAt.toDate
      ? createdAt.toDate()
      : new Date(createdAt);

    return date.toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  formatFileSize(fileSize: number): string {
    if (!fileSize) {
      return '0 MB';
    }

    return `${(fileSize / 1024 / 1024).toFixed(2)} MB`;
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom'
    });

    await toast.present();
  }
}