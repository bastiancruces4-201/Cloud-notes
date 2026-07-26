import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where
} from '@angular/fire/firestore';

import { DocumentModel } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private firestore: Firestore) {}

  async createDocument(
    documentData: DocumentModel
  ): Promise<string> {

    const documentsRef = collection(
      this.firestore,
      'documents'
    );

    const documentReference = await addDoc(
      documentsRef,
      documentData
    );

    return documentReference.id;
  }

  async getDocumentsByUser(
    userId: string
  ): Promise<DocumentModel[]> {

    const documentsRef = collection(
      this.firestore,
      'documents'
    );

    const documentsQuery = query(
      documentsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const documentsSnapshot = await getDocs(
      documentsQuery
    );

    return documentsSnapshot.docs.map(documentSnapshot => ({
      id: documentSnapshot.id,
      ...documentSnapshot.data()
    } as DocumentModel));
  }
}