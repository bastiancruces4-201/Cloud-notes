import { Injectable } from '@angular/core';

import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  getDoc,
  orderBy,
  query,
  where,
  doc,
  updateDoc,
  serverTimestamp
} from '@angular/fire/firestore';

import { DocumentModel } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(
    private firestore: Firestore
  ) {}

  async createDocument(
    documentData: DocumentModel
  ): Promise<string> {

    const documentsRef = collection(
      this.firestore,
      'documents'
    );

    const documentReference = await addDoc(
      documentsRef,
      {
        ...documentData,
        status: 'active'
      }
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

    const documents = documentsSnapshot.docs.map(
      documentSnapshot => ({
        id: documentSnapshot.id,
        ...documentSnapshot.data()
      } as DocumentModel)
    );

    // Mostramos solamente apuntes que no estén eliminados.
    // Los apuntes antiguos sin "status" seguirán apareciendo.
    return documents.filter(
      document => document.status !== 'deleted'
    );
  }

  async getAllDocuments(): Promise<DocumentModel[]> {

    const documentsRef = collection(
      this.firestore,
      'documents'
    );

    const documentsQuery = query(
      documentsRef,
      orderBy('createdAt', 'desc')
    );

    const documentsSnapshot = await getDocs(
      documentsQuery
    );

    const documents = documentsSnapshot.docs.map(
      documentSnapshot => ({
        id: documentSnapshot.id,
        ...documentSnapshot.data()
      } as DocumentModel)
    );

    // Los apuntes eliminados tampoco aparecerán
    // en el buscador general.
    return documents.filter(
      document => document.status !== 'deleted'
    );
  }

  async markDocumentAsDeleted(
    documentId: string,
    userId: string
  ): Promise<void> {

    const documentRef = doc(
      this.firestore,
      `documents/${documentId}`
    );

    await updateDoc(
      documentRef,
      {
        status: 'deleted',
        deletedAt: serverTimestamp(),
        deletedBy: userId
      }
    );
  }
  async getDocumentById(
  documentId: string
): Promise<DocumentModel | null> {

  const documentRef = doc(
    this.firestore,
    `documents/${documentId}`
  );

  const documentSnapshot = await getDoc(
    documentRef
  );

  if (!documentSnapshot.exists()) {
    return null;
  }

  return {
    id: documentSnapshot.id,
    ...documentSnapshot.data()
  } as DocumentModel;
}}