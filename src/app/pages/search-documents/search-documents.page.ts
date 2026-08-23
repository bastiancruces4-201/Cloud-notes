import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonIcon,
  IonInput,
  IonSpinner,
  IonButton,
  ToastController
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  searchOutline,
  documentTextOutline,
  cloudUploadOutline
} from 'ionicons/icons';

import { DocumentService } from '../../core/services/document.service';
import { DocumentModel } from '../../core/models/document.model';

@Component({
  selector: 'app-search-documents',
  templateUrl: './search-documents.page.html',
  styleUrls: ['./search-documents.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonIcon,
    IonInput,
    IonSpinner,
    IonButton
  ]
})
export class SearchDocumentsPage {
  documents: DocumentModel[] = [];
  filteredDocuments: DocumentModel[] = [];

  searchTerm = '';
  isLoading = true;

  constructor(
    private router: Router,
    private documentService: DocumentService,
    private toastController: ToastController
  ) {
    addIcons({
      arrowBackOutline,
      searchOutline,
      documentTextOutline,
      cloudUploadOutline
    });
  }

  ionViewWillEnter() {
    this.loadDocuments();
  }

  async loadDocuments() {
    this.isLoading = true;

    try {
      this.documents = await this.documentService.getAllDocuments();
      this.filteredDocuments = [...this.documents];

    } catch (error) {
      console.error('Error al cargar los apuntes:', error);

      await this.showToast(
        'No se pudieron cargar los apuntes disponibles.'
      );

    } finally {
      this.isLoading = false;
    }
  }

  filterDocuments() {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      this.filteredDocuments = [...this.documents];
      return;
    }

    this.filteredDocuments = this.documents.filter((document) => {
      return (
        document.title.toLowerCase().includes(term) ||
        document.subject.toLowerCase().includes(term) ||
        document.description.toLowerCase().includes(term) ||
        document.fileName.toLowerCase().includes(term)
      );
    });
  }

  formatFileSize(bytes: number): string {
    if (!bytes) {
      return '0 KB';
    }

    const kilobytes = bytes / 1024;
    const megabytes = kilobytes / 1024;

    if (megabytes >= 1) {
      return `${megabytes.toFixed(2)} MB`;
    }

    return `${kilobytes.toFixed(2)} KB`;
  }

  formatDate(createdAt: any): string {
    if (!createdAt) {
      return 'Sin fecha';
    }

    const date = createdAt.toDate
      ? createdAt.toDate()
      : new Date(createdAt);

    return date.toLocaleDateString('es-CL');
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  goToUploadDocument() {
    this.router.navigate(['/upload-document']);
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position: 'bottom'
    });

    await toast.present();
  }
  async goToDocumentDetail(documentId?: string) {
  if (!documentId) {
    await this.showToast(
      'No fue posible identificar el apunte.'
    );
    return;
  }

  await this.router.navigate([
    '/document-detail',
    documentId
  ]);
}
}