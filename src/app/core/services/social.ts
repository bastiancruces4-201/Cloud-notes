import { Injectable } from '@angular/core';

import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where
} from '@angular/fire/firestore';

import { ReviewModel } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(
    private firestore: Firestore
  ) {}

  // ==========================================
  // CREAR O ACTUALIZAR OPINIÓN
  // ==========================================

  async saveReview(
    review: ReviewModel
  ): Promise<void> {

    const reviewId =
      `${review.documentId}_${review.userId}`;

    const reviewRef = doc(
      this.firestore,
      `reviews/${reviewId}`
    );

    const currentReview =
      await getDoc(reviewRef);

    if (currentReview.exists()) {

      await setDoc(
        reviewRef,
        {
          ...review,
          updatedAt: serverTimestamp()
        },
        {
          merge: true
        }
      );

    } else {

      await setDoc(
        reviewRef,
        {
          ...review,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }
      );
    }
  }

  // ==========================================
  // OBTENER OPINIÓN DEL USUARIO ACTUAL
  // ==========================================

  async getUserReview(
    documentId: string,
    userId: string
  ): Promise<ReviewModel | null> {

    const reviewId =
      `${documentId}_${userId}`;

    const reviewRef = doc(
      this.firestore,
      `reviews/${reviewId}`
    );

    const reviewSnapshot =
      await getDoc(reviewRef);

    if (!reviewSnapshot.exists()) {
      return null;
    }

    return {
      id: reviewSnapshot.id,
      ...reviewSnapshot.data()
    } as ReviewModel;
  }

  // ==========================================
  // OBTENER TODAS LAS OPINIONES DEL APUNTE
  // ==========================================

  async getReviewsByDocument(
    documentId: string
  ): Promise<ReviewModel[]> {

    const reviewsRef = collection(
      this.firestore,
      'reviews'
    );

    const reviewsQuery = query(
      reviewsRef,
      where(
        'documentId',
        '==',
        documentId
      )
    );

    const reviewsSnapshot =
      await getDocs(reviewsQuery);

    const reviews =
      reviewsSnapshot.docs.map(
        reviewSnapshot => ({
          id: reviewSnapshot.id,
          ...reviewSnapshot.data()
        } as ReviewModel)
      );

    return reviews.sort(
      (a, b) =>
        this.getTimestamp(b.updatedAt) -
        this.getTimestamp(a.updatedAt)
    );
  }

  // ==========================================
  // OBTENER TODAS LAS OPINIONES
  // ==========================================

  async getAllReviews(): Promise<ReviewModel[]> {

    const reviewsRef = collection(
      this.firestore,
      'reviews'
    );

    const reviewsSnapshot =
      await getDocs(reviewsRef);

    return reviewsSnapshot.docs.map(
      reviewSnapshot => ({
        id: reviewSnapshot.id,
        ...reviewSnapshot.data()
      } as ReviewModel)
    );
  }

  // ==========================================
  // AUXILIAR DE FECHAS
  // ==========================================

  private getTimestamp(
    value: any
  ): number {

    if (!value) {
      return 0;
    }

    if (value.toMillis) {
      return value.toMillis();
    }

    if (value.toDate) {
      return value.toDate().getTime();
    }

    return new Date(value).getTime();
  }
}