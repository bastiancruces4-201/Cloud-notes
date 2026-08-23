import { Injectable } from '@angular/core';

import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from '@angular/fire/storage';

export interface UploadedFile {
  fileUrl: string;
  filePath: string;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage
  ) {}

  async uploadDocument(
    userId: string,
    file: File
  ): Promise<UploadedFile> {

    const filePath =
      `documents/${userId}/${Date.now()}-${file.name}`;

    const fileRef = ref(
      this.storage,
      filePath
    );

    await uploadBytes(
      fileRef,
      file,
      {
        contentType: file.type
      }
    );

    const fileUrl = await getDownloadURL(
      fileRef
    );

    return {
      fileUrl,
      filePath
    };
  }

  async deleteDocument(
    filePath: string
  ): Promise<void> {

    const fileRef = ref(
      this.storage,
      filePath
    );

    await deleteObject(fileRef);
  }
}