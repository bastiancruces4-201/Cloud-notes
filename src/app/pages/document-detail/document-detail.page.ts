import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonButton,
  IonIcon,
  IonSpinner,
  IonTextarea,
  ToastController
} from '@ionic/angular/standalone';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { addIcons } from 'ionicons';

import {
  arrowBackOutline,
  documentTextOutline,
  downloadOutline,
  schoolOutline,
  calendarOutline,
  star,
  starOutline,
  chatbubbleOutline,
  sendOutline,
  createOutline,
  closeOutline
} from 'ionicons/icons';

import { DocumentService } from '../../core/services/document.service';
import { SocialService } from '../../core/services/social';
import { AuthService } from '../../core/services/auth';

import { DocumentModel } from '../../core/models/document.model';
import { ReviewModel } from '../../core/models/review.model';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.page.html',
  styleUrls: ['./document-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonButton,
    IonIcon,
    IonSpinner,
    IonTextarea
  ]
})
export class DocumentDetailPage {

  document: DocumentModel | null = null;

  reviews: ReviewModel[] = [];

  selectedRating = 0;
  reviewComment = '';

  averageRating = 0;

  currentUserReview: ReviewModel | null = null;

  isLoading = true;
  isSavingReview = false;

  // Controla si mostramos el formulario de edición
  isEditingReview = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService,
    private socialService: SocialService,
    private authService: AuthService,
    private toastController: ToastController
  ) {

    addIcons({
      arrowBackOutline,
      documentTextOutline,
      downloadOutline,
      schoolOutline,
      calendarOutline,
      star,
      starOutline,
      chatbubbleOutline,
      sendOutline,
      createOutline,
      closeOutline
    });
  }

  async ionViewWillEnter() {
    await this.loadDocument();
  }

  async loadDocument() {

    this.isLoading = true;

    try {

      const documentId =
        this.route.snapshot.paramMap.get('id');

      if (!documentId) {

        await this.showToast(
          'No fue posible identificar el apunte.'
        );

        await this.router.navigate([
          '/search-documents'
        ]);

        return;
      }

      this.document =
        await this.documentService.getDocumentById(
          documentId
        );

      if (!this.document) {

        await this.showToast(
          'El apunte no existe o ya no está disponible.'
        );

        await this.router.navigate([
          '/search-documents'
        ]);

        return;
      }

      if (this.document.status === 'deleted') {

        await this.showToast(
          'Este apunte ya no está disponible.'
        );

        await this.router.navigate([
          '/search-documents'
        ]);

        return;
      }

      await this.loadReviews();

      await this.loadCurrentUserReview();

    } catch (error) {

      console.error(
        'Error al cargar el apunte:',
        error
      );

      await this.showToast(
        'No fue posible cargar la información del apunte.'
      );

    } finally {

      this.isLoading = false;
    }
  }

  async loadReviews() {

    if (!this.document?.id) {
      return;
    }

    try {

      this.reviews =
        await this.socialService.getReviewsByDocument(
          this.document.id
        );

      this.calculateAverageRating();

    } catch (error) {

      console.error(
        'Error al cargar opiniones:',
        error
      );

      this.reviews = [];
      this.averageRating = 0;
    }
  }

  async loadCurrentUserReview() {

    if (!this.document?.id) {
      return;
    }

    try {

      const currentUser =
        await this.authService.getCurrentUser();

      if (!currentUser) {
        return;
      }

      this.currentUserReview =
        await this.socialService.getUserReview(
          this.document.id,
          currentUser.uid
        );

      if (this.currentUserReview) {

        this.selectedRating =
          this.currentUserReview.rating;

        this.reviewComment =
          this.currentUserReview.comment;

        // Si ya existe una opinión,
        // el formulario queda oculto inicialmente.
        this.isEditingReview = false;

      } else {

        // Si nunca ha opinado,
        // mostramos el formulario.
        this.selectedRating = 0;
        this.reviewComment = '';
        this.isEditingReview = true;
      }

    } catch (error) {

      console.error(
        'Error al cargar la opinión del usuario:',
        error
      );
    }
  }

  calculateAverageRating() {

    if (this.reviews.length === 0) {

      this.averageRating = 0;
      return;
    }

    const total =
      this.reviews.reduce(
        (sum, review) =>
          sum + review.rating,
        0
      );

    this.averageRating =
      total / this.reviews.length;
  }

  selectRating(
    value: number
  ) {

    this.selectedRating = value;
  }

  startEditingReview() {

    if (!this.currentUserReview) {
      return;
    }

    this.selectedRating =
      this.currentUserReview.rating;

    this.reviewComment =
      this.currentUserReview.comment;

    this.isEditingReview = true;
  }

  cancelEditingReview() {

    if (!this.currentUserReview) {
      return;
    }

    this.selectedRating =
      this.currentUserReview.rating;

    this.reviewComment =
      this.currentUserReview.comment;

    this.isEditingReview = false;
  }

  async saveReview() {

    if (!this.document?.id) {
      return;
    }

    if (
      this.selectedRating < 1 ||
      this.selectedRating > 5
    ) {

      await this.showToast(
        'Selecciona una calificación entre 1 y 5 estrellas.'
      );

      return;
    }

    if (!this.reviewComment.trim()) {

      await this.showToast(
        'Debes escribir un comentario junto con tu calificación.'
      );

      return;
    }

    this.isSavingReview = true;

    try {

      const currentUser =
        await this.authService.getCurrentUser();

      if (!currentUser) {

        await this.showToast(
          'Debes iniciar sesión para publicar una opinión.'
        );

        return;
      }

      const userProfile =
        await this.authService.getUserProfile(
          currentUser.uid
        );

      const userName =
        userProfile
          ? `${userProfile.name} ${userProfile.lastName}`.trim()
          : 'Usuario de Cloud Notes';

      // Guardamos si ya existía antes de actualizar.
      const wasExistingReview =
        this.currentUserReview !== null;

      await this.socialService.saveReview({

        documentId: this.document.id,

        userId: currentUser.uid,

        userName,

        rating: this.selectedRating,

        comment: this.reviewComment.trim()
      });

      await this.loadReviews();

      await this.loadCurrentUserReview();

      // Después de guardar, ocultamos el formulario.
      this.isEditingReview = false;

      await this.showToast(
        wasExistingReview
          ? 'Tu opinión fue actualizada correctamente.'
          : 'Tu opinión fue publicada correctamente.'
      );

    } catch (error) {

      console.error(
        'Error al guardar opinión:',
        error
      );

      await this.showToast(
        'No fue posible guardar tu opinión.'
      );

    } finally {

      this.isSavingReview = false;
    }
  }

  isMyReview(
    review: ReviewModel
  ): boolean {

    if (!this.currentUserReview) {
      return false;
    }

    return (
      review.userId ===
      this.currentUserReview.userId
    );
  }

  openDocument() {

    if (!this.document?.fileUrl) {

      this.showToast(
        'Este apunte no tiene un archivo disponible.'
      );

      return;
    }

    window.open(
      this.document.fileUrl,
      '_blank',
      'noopener,noreferrer'
    );
  }

  formatDate(
    createdAt: any
  ): string {

    if (!createdAt) {
      return 'Fecha no disponible';
    }

    const date =
      createdAt.toDate
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

  formatFileSize(
  fileSize: number
): string {

  if (!fileSize) {
    return '0 MB';
  }

  return `${(
    fileSize /
    1024 /
    1024
  ).toFixed(2)} MB`;
}

// Convierte la calificación en estrellas
getStars(rating: number): string {

  const filledStars = '★'.repeat(rating);
  const emptyStars = '☆'.repeat(5 - rating);

  return filledStars + emptyStars;
}

async goBack() {

  await this.router.navigate([
    '/search-documents'
  ]);
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