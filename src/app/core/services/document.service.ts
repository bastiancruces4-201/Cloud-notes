import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection
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
}