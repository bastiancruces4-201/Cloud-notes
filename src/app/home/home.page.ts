import { addIcons } from 'ionicons';

import {
  folderOutline,
  cloudUploadOutline,
  searchOutline,
  personOutline,
  documentTextOutline,
  bookOutline,
  codeSlashOutline,
  shieldCheckmarkOutline,
  calculatorOutline,
  schoolOutline,
  star,
  starOutline,
  gitNetworkOutline,
  constructOutline,
  hardwareChipOutline,
  globeOutline,
  statsChartOutline,
  flaskOutline,
  cashOutline,
  barChartOutline
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
import { DocumentService } from '../core/services/document.service';
import { SocialService } from '../core/services/social';
import { LibraryService } from '../core/services/library';

import { UserModel } from '../core/models/user.model';
import { DocumentModel } from '../core/models/document.model';
import { ReviewModel } from '../core/models/review.model';
import { LibraryResourceModel } from '../core/models/library-resource.model';

interface SubjectCategory {
  name: string;
  icon: string;
  count: number;
}

interface TrendingDocument {
  document: DocumentModel;
  averageRating: number;
  reviewCount: number;
}

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
  ]
})
export class HomePage implements OnInit {

  userProfile: UserModel | null = null;

  recentDocuments: DocumentModel[] = [];

  subjectCategories: SubjectCategory[] = [];

  trendingDocuments: TrendingDocument[] = [];

  libraryResources: LibraryResourceModel[] = [];

  loading = true;

  constructor(
    private authService: AuthService,
    private documentService: DocumentService,
    private socialService: SocialService,
    private libraryService: LibraryService,
    private router: Router
  ) {

    addIcons({
      folderOutline,
      cloudUploadOutline,
      searchOutline,
      personOutline,
      documentTextOutline,
      bookOutline,
      codeSlashOutline,
      shieldCheckmarkOutline,
      calculatorOutline,
      schoolOutline,
      star,
      starOutline,
      gitNetworkOutline,
      constructOutline,
      hardwareChipOutline,
      globeOutline,
      statsChartOutline,
      flaskOutline,
      cashOutline,
      barChartOutline
    });
  }

  async ngOnInit() {
    await this.loadHome();
  }

  async loadHome() {

    this.loading = true;

    try {

      const currentUser =
        await this.authService.getCurrentUser();

      if (!currentUser) {

        await this.router.navigate([
          '/login'
        ]);

        return;
      }

      await Promise.all([
        this.loadUserProfile(
          currentUser.uid
        ),
        this.loadRecentDocuments(),
        this.loadSubjectCategories(),
        this.loadTrendingDocuments()
      ]);

      this.loadLibraryResources();

    } catch (error) {

      console.error(
        'Error al cargar el inicio:',
        error
      );

    } finally {

      this.loading = false;
    }
  }

  async loadUserProfile(
    userId: string
  ) {

    this.userProfile =
      await this.authService.getUserProfile(
        userId
      );
  }

  async loadRecentDocuments() {

    this.recentDocuments =
      await this.documentService.getRecentDocuments(
        6
      );
  }

  loadLibraryResources() {

    this.libraryResources =
      this.libraryService.getFeaturedResources(
        6
      );
  }

  async loadSubjectCategories() {

    const subjects = [

      {
        name: 'Programación',
        icon: 'code-slash-outline'
      },

      {
        name: 'Matemáticas',
        icon: 'calculator-outline'
      },

      {
        name: 'Ciberseguridad',
        icon: 'shield-checkmark-outline'
      },

      {
        name: 'Base de Datos',
        icon: 'book-outline'
      },

      {
        name: 'Redes',
        icon: 'git-network-outline'
      },

      {
        name: 'Ingeniería de Software',
        icon: 'construct-outline'
      },

      {
        name: 'Inteligencia Artificial',
        icon: 'hardware-chip-outline'
      },

      {
        name: 'Desarrollo Web',
        icon: 'globe-outline'
      },

      {
        name: 'Estadística',
        icon: 'stats-chart-outline'
      },

      {
        name: 'Física',
        icon: 'flask-outline'
      },

      {
        name: 'Contabilidad',
        icon: 'cash-outline'
      },

      {
        name: 'Finanzas',
        icon: 'bar-chart-outline'
      }

    ];

    const categories =
      await Promise.all(

        subjects.map(
          async subject => {

            try {

              const documents =
                await this.documentService
                  .getDocumentsBySubject(
                    subject.name
                  );

              const baseResources =
                this.libraryService
                  .getResourcesBySubject(
                    subject.name
                  );

              return {

                name: subject.name,

                icon: subject.icon,

                count:
                  documents.length +
                  baseResources.length
              };

            } catch (error) {

              console.error(
                `Error al cargar ${subject.name}:`,
                error
              );

              return {

                name: subject.name,

                icon: subject.icon,

                count: 0
              };
            }
          }
        )
      );

    this.subjectCategories =
      categories;
  }

  async loadTrendingDocuments() {

    try {

      const [
        documents,
        reviews
      ] = await Promise.all([

        this.documentService
          .getAllDocuments(),

        this.socialService
          .getAllReviews()

      ]);

      const reviewsByDocument =
        new Map<string, ReviewModel[]>();

      for (const review of reviews) {

        if (
          !reviewsByDocument.has(
            review.documentId
          )
        ) {

          reviewsByDocument.set(
            review.documentId,
            []
          );
        }

        reviewsByDocument
          .get(review.documentId)!
          .push(review);
      }

      const trending =
        documents
          .map(
            document => {

              if (!document.id) {
                return null;
              }

              const documentReviews =
                reviewsByDocument.get(
                  document.id
                ) ?? [];

              if (
                documentReviews.length === 0
              ) {

                return null;
              }

              const totalRating =
                documentReviews.reduce(
                  (
                    total,
                    review
                  ) =>
                    total +
                    review.rating,
                  0
                );

              const averageRating =
                totalRating /
                documentReviews.length;

              return {

                document,

                averageRating,

                reviewCount:
                  documentReviews.length
              };
            }
          )
          .filter(
            (
              item
            ): item is TrendingDocument =>
              item !== null
          );

      trending.sort(
        (a, b) => {

          if (
            b.averageRating !==
            a.averageRating
          ) {

            return (
              b.averageRating -
              a.averageRating
            );
          }

          return (
            b.reviewCount -
            a.reviewCount
          );
        }
      );

      this.trendingDocuments =
        trending.slice(0, 4);

    } catch (error) {

      console.error(
        'Error al cargar tendencias:',
        error
      );

      this.trendingDocuments = [];
    }
  }

  getStars(
    rating: number
  ): string {

    const roundedRating =
      Math.round(rating);

    const filledStars =
      '★'.repeat(
        roundedRating
      );

    const emptyStars =
      '☆'.repeat(
        5 - roundedRating
      );

    return (
      filledStars +
      emptyStars
    );
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

  async goToMyDocuments() {

    await this.router.navigate([
      '/my-documents'
    ]);
  }

  async goToUploadDocument() {

    await this.router.navigate([
      '/upload-document'
    ]);
  }

  async goToSearchDocuments() {

    await this.router.navigate([
      '/search-documents'
    ]);
  }

  async goToProfile() {

    await this.router.navigate([
      '/profile'
    ]);
  }

  async goToDocumentDetail(
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

  async goToSubject(
  subject: string
) {

  await this.router.navigate([
    '/subject-library',
    subject
  ]);
}

  async logout() {

    await this.authService.logout();

    await this.router.navigate([
      '/login'
    ]);
  }
}
