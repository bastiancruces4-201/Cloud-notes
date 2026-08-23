import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonContent,
  IonButton,
  IonIcon,
  ToastController,
  AlertController
} from '@ionic/angular/standalone';

import { Router } from '@angular/router';

import { addIcons } from 'ionicons';

import {
  arrowBackOutline,
  cloudUploadOutline,
  documentTextOutline,
  trashOutline
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
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    addIcons({
      arrowBackOutline,
      cloudUploadOutline,
      documentTextOutline,
      trashOutline
    });
  }

  async ionViewWillEnter() {
    await this.loadDocuments();
  }

  async loadDocuments() {
    this.isLoading = true;

    try {

      const currentUser =
        await this.authService.getCurrentUser();

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

  async openDocument(fileUrl?: string) {

    if (!fileUrl) {

      await this.showToast(
        'Este apunte no tiene un archivo disponible para descargar.'
      );

      return;
    }

    window.open(
      fileUrl,
      '_blank',
      'noopener,noreferrer'
    );
  }

  async confirmDelete(document: DocumentModel) {

    const alert =
      await this.alertController.create({

        header: 'Eliminar apunte',

        message:
          `¿Estás seguro de que deseas eliminar "${document.title}"? El apunte dejará de aparecer en tu cuenta.`,

        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Eliminar',
            role: 'destructive',
            handler: async () => {
              await this.deleteDocument(document);
            }
          }
        ]
      });

    await alert.present();
  }

  async deleteDocument(document: DocumentModel) {

    if (!document.id) {

      await this.showToast(
        'No fue posible identificar el apunte.'
      );

      return;
    }

    try {

      const currentUser =
        await this.authService.getCurrentUser();

      if (!currentUser) {

        await this.showToast(
          'No fue posible identificar al usuario.'
        );

        return;
      }

      // Eliminación lógica:
      // el documento permanece en Firestore,
      // pero queda marcado como eliminado.
      await this.documentService.markDocumentAsDeleted(
        document.id,
        currentUser.uid
      );

      await this.showToast(
        'El apunte fue eliminado correctamente.'
      );

      // Actualizamos la lista para que desaparezca de Mis apuntes.
      await this.loadDocuments();

    } catch (error) {

      console.error(
        'Error al eliminar el apunte:',
        error
      );

      await this.showToast(
        'No fue posible eliminar el apunte.'
      );
    }
  }

  formatDate(createdAt: any): string {

    if (!createdAt) {
      return 'Fecha no disponible';
    }

    const date = createdAt.toDate
      ? createdAt.toDate()
      : new Date(createdAt);

    return date.toLocaleDateString(
      'es-CL',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }
    );
  }

  formatFileSize(fileSize: number): string {

    if (!fileSize) {
      return '0 MB';
    }

    return `${(
      fileSize /
      1024 /
      1024
    ).toFixed(2)} MB`;
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
  }}