import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonContent,
  IonIcon,
  IonSpinner
} from '@ionic/angular/standalone';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { addIcons } from 'ionicons';

import {
  arrowBackOutline,
  bookOutline,
  documentTextOutline
} from 'ionicons/icons';

import { LibraryService } from '../../core/services/library';
import { DocumentService } from '../../core/services/document.service';

import { LibraryResourceModel } from '../../core/models/library-resource.model';
import { DocumentModel } from '../../core/models/document.model';

@Component({
  selector: 'app-subject-library',
  templateUrl: './subject-library.page.html',
  styleUrls: ['./subject-library.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    IonSpinner
  ]
})
export class SubjectLibraryPage {

  subject = '';

  libraryResources: LibraryResourceModel[] = [];

  studentDocuments: DocumentModel[] = [];

  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private libraryService: LibraryService,
    private documentService: DocumentService
  ) {

    addIcons({
      arrowBackOutline,
      bookOutline,
      documentTextOutline
    });
  }

  async ionViewWillEnter() {
    await this.loadSubjectLibrary();
  }

  async loadSubjectLibrary() {

    this.isLoading = true;

    try {

      const subjectParam =
        this.route.snapshot.paramMap.get(
          'subject'
        );

      if (!subjectParam) {

        await this.router.navigate([
          '/home'
        ]);

        return;
      }

      // Angular normalmente ya entrega
      // el parámetro correctamente decodificado.
      this.subject =
        subjectParam.trim();

      console.log(
        'Asignatura seleccionada:',
        this.subject
      );

      // =====================================
      // 1. LIBROS BASE CLOUD NOTES
      // =====================================

      this.loadLibraryResources();

      // =====================================
      // 2. APUNTES DE ESTUDIANTES
      // =====================================

      await this.loadStudentDocuments();

    } catch (error) {

      console.error(
        'Error general al cargar la asignatura:',
        error
      );

    } finally {

      this.isLoading = false;
    }
  }

  loadLibraryResources() {

    try {

      this.libraryResources =
        this.libraryService.getResourcesBySubject(
          this.subject
        );

      console.log(
        'Recursos base encontrados:',
        this.libraryResources
      );

    } catch (error) {

      console.error(
        'Error al cargar libros base:',
        error
      );

      this.libraryResources = [];
    }
  }

  async loadStudentDocuments() {

    try {

      this.studentDocuments =
        await this.documentService.getDocumentsBySubject(
          this.subject
        );

      console.log(
        'Apuntes de estudiantes encontrados:',
        this.studentDocuments
      );

    } catch (error) {

      console.error(
        'Error al cargar apuntes de estudiantes:',
        error
      );

      // IMPORTANTE:
      // solo vaciamos los apuntes,
      // no los libros base.
      this.studentDocuments = [];
    }
  }

  openLibraryResource(
    resource: LibraryResourceModel
  ) {

    if (!resource.sourceUrl) {

      console.warn(
        'Este recurso todavía no tiene enlace disponible:',
        resource.title
      );

      return;
    }

    window.open(
      resource.sourceUrl,
      '_blank',
      'noopener,noreferrer'
    );
  }

  async openStudentDocument(
    documentId?: string
  ) {

    if (!documentId) {
      return;
    }

    await this.router.navigate([
      '/document-detail',
      documentId
    ]);
  }

  async goBack() {

    await this.router.navigate([
      '/home'
    ]);
  }
}
