import { DocumentService } from '../../core/services/document.service';
import { AuthService } from '../../core/services/auth';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  ToastController
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  cloudUploadOutline,
  documentAttachOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.page.html',
  styleUrls: ['./upload-document.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonButton,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonTextarea,
    IonSelect,
    IonSelectOption
  ]
})
export class UploadDocumentPage {

  title = '';
  subject = '';
  description = '';
  selectedFile: File | null = null;

  constructor(
  private router: Router,
  private toastController: ToastController,
  private documentService: DocumentService,
  private authService: AuthService
   ) {
    addIcons({
      arrowBackOutline,
      cloudUploadOutline,
      documentAttachOutline
    });
  }

  async goBack() {
    await this.router.navigate(['/my-documents']);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.selectedFile = null;
      return;
    }

    const file = input.files[0];

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ];

    if (!allowedTypes.includes(file.type)) {
      this.selectedFile = null;
      input.value = '';
      this.showToast(
        'Solo puedes seleccionar archivos PDF, Word, Excel o PowerPoint.'
      );
      return;
    }

    this.selectedFile = file;
  }

  async prepareUpload() {
  if (!this.title.trim() || !this.subject || !this.selectedFile) {
    await this.showToast(
      'Debes ingresar el título, la asignatura y seleccionar un archivo.'
    );
    return;
  }

  try {
    const currentUser = await this.authService.getCurrentUser();

    if (!currentUser) {
      await this.showToast(
        'No fue posible identificar al usuario.'
      );
      return;
    }

    await this.documentService.createDocument({
      title: this.title.trim(),
      subject: this.subject,
      description: this.description.trim(),
      fileName: this.selectedFile.name,
      fileType: this.selectedFile.type,
      fileSize: this.selectedFile.size,
      userId: currentUser.uid,
      createdAt: new Date()
    });

    await this.showToast(
      'La información del apunte fue guardada correctamente.'
    );

    await this.router.navigate(['/my-documents']);

  } catch (error) {
    console.error(
      'Error al guardar el documento:',
      error
    );

    await this.showToast(
      'Ocurrió un error al guardar la información del apunte.'
    );
  }
}
  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom'
    });

    await toast.present();
  }
}