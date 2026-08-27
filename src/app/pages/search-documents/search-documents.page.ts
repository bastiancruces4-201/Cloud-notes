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

import {
  ActivatedRoute,
  Router
} from '@angular/router';

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

  selectedSubject = '';

  isLoading = true;

  constructor(
    private route: ActivatedRoute,
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

  async ionViewWillEnter() {

    this.readSubjectFromUrl();

    await this.loadDocuments();
  }

  readSubjectFromUrl() {

    const subject =
      this.route.snapshot.queryParamMap.get(
        'subject'
      );

    this.selectedSubject =
      subject ?? '';
  }

  async loadDocuments() {

    this.isLoading = true;

    try {

      this.documents =
        await this.documentService.getAllDocuments();

      this.filterDocuments();

    } catch (error) {

      console.error(
        'Error al cargar los apuntes:',
        error
      );

      await this.showToast(
        'No se pudieron cargar los apuntes disponibles.'
      );

    } finally {

      this.isLoading = false;
    }
  }

  filterDocuments() {

    const term =
      this.searchTerm
        .trim()
        .toLowerCase();

    const subject =
      this.selectedSubject
        .trim()
        .toLowerCase();

    this.filteredDocuments =
      this.documents.filter(
        (document) => {

          const matchesSearch =
            !term ||
            document.title
              .toLowerCase()
              .includes(term) ||
            document.subject
              .toLowerCase()
              .includes(term) ||
            document.description
              .toLowerCase()
              .includes(term) ||
            document.fileName
              .toLowerCase()
              .includes(term);

          const matchesSubject =
            !subject ||
            document.subject
              .toLowerCase() === subject;

          return (
            matchesSearch &&
            matchesSubject
          );
        }
      );
  }

  clearSubjectFilter() {

    this.selectedSubject = '';

    this.filterDocuments();

    this.router.navigate(
      ['/search-documents'],
      {
        queryParams: {}
      }
    );
  }

  formatFileSize(
    bytes: number
  ): string {

    if (!bytes) {
      return '0 KB';
    }

    const kilobytes =
      bytes / 1024;

    const megabytes =
      kilobytes / 1024;

    if (megabytes >= 1) {

      return `${megabytes.toFixed(2)} MB`;
    }

    return `${kilobytes.toFixed(2)} KB`;
  }

  formatDate(
    createdAt: any
  ): string {

    if (!createdAt) {
      return 'Sin fecha';
    }

    const date =
      createdAt.toDate
        ? createdAt.toDate()
        : new Date(createdAt);

    return date.toLocaleDateString(
      'es-CL'
    );
  }

  async goBack() {

    await this.router.navigate([
      '/home'
    ]);
  }

  async goToUploadDocument() {

    await this.router.navigate([
      '/upload-document'
    ]);
  }

  async goToDocumentDetail(
    documentId?: string
  ) {

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

  private async showToast(
    message: string
  ) {

    const toast =
      await this.toastController.create({
        message,
        duration: 2500,
        position: 'bottom'
      });

    await toast.present();
  }
}