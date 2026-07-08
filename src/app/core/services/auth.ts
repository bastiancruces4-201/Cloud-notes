import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  sendPasswordResetEmail,
  User
} from '@angular/fire/auth';

import {
  Firestore,
  doc,
  setDoc
} from '@angular/fire/firestore';

import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {}

  async register(userData: UserModel, password: string): Promise<User> {
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      userData.email,
      password
    );

    if (credential.user) {
      await sendEmailVerification(credential.user);

      const userRef = doc(this.firestore, `users/${credential.user.uid}`);

      await setDoc(userRef, {
        ...userData,
        uid: credential.user.uid,
        emailVerified: credential.user.emailVerified
      });
    }

    return credential.user;
  }

  async login(email: string, password: string): Promise<User> {
    const credential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    return credential.user;
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(this.auth, email);
  }
}