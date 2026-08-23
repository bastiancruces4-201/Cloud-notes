import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { addIcons } from 'ionicons';
import {
  checkmarkCircleOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonIcon
  ]
})
export class VerifyEmailPage {

  constructor(
    private router: Router
  ) {
    addIcons({
      checkmarkCircleOutline
    });
  }

  async goToLogin() {
    await this.router.navigate(['/login']);
  }

  async goToWelcome() {
    await this.router.navigate(['/welcome']);
  }
}