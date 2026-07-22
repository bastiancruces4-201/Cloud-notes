import { Component } from '@angular/core';
import {
  IonContent,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  cloudUploadOutline,
  documentTextOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-my-documents',
  templateUrl: './my-documents.page.html',
  styleUrls: ['./my-documents.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonIcon
  ]
})
export class MyDocumentsPage {

  constructor(private router: Router) {
    addIcons({
      arrowBackOutline,
      cloudUploadOutline,
      documentTextOutline
    });
  }

  async goBack() {
    await this.router.navigate(['/home']);
  }

  async goToUploadDocument() {
  await this.router.navigate(['/upload-document']);
 }
}