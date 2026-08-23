import { Injectable } from '@angular/core';

import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  applyActionCode,
  User
} from '@angular/fire/auth';

import {
  Firestore,
  doc,
  setDoc,
  getDoc,
  updateDoc
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

  async register(
    userData: UserModel,
    password: string
  ): Promise<User> {

    const credential = await createUserWithEmailAndPassword(
      this.auth,
      userData.email,
      password
    );

    if (credential.user) {

      await sendEmailVerification(
        credential.user,
        {
          url: 'https://cloud-notes-55cf8.web.app/verify-email',
          handleCodeInApp: false
        }
      );

      const userRef = doc(
        this.firestore,
        `users/${credential.user.uid}`
      );

      await setDoc(userRef, {
        ...userData,
        uid: credential.user.uid,
        emailVerified: credential.user.emailVerified
      });
    }

    return credential.user;
  }

  async login(
    email: string,
    password: string
  ): Promise<User> {

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

  async resetPassword(
    email: string
  ): Promise<void> {

    await sendPasswordResetEmail(
      this.auth,
      email
    );
  }

  getCurrentUser(): Promise<User | null> {

    return new Promise((resolve) => {

      const unsubscribe = onAuthStateChanged(
        this.auth,
        (user) => {
          unsubscribe();
          resolve(user);
        }
      );

    });
  }

  async getUserProfile(
    uid: string
  ): Promise<UserModel | null> {

    const userRef = doc(
      this.firestore,
      `users/${uid}`
    );

    const userSnapshot = await getDoc(
      userRef
    );

    if (!userSnapshot.exists()) {
      return null;
    }

    return userSnapshot.data() as UserModel;
  }

  async verifyEmailCode(
    code: string
  ): Promise<void> {

    await applyActionCode(
      this.auth,
      code
    );
  }

  async resendVerificationEmail(): Promise<void> {

    const user = await this.getCurrentUser();

    if (!user) {
      throw new Error(
        'No hay un usuario autenticado.'
      );
    }

    await sendEmailVerification(
      user,
      {
        url: 'https://cloud-notes-55cf8.web.app/verify-email',
        handleCodeInApp: false
      }
    );
  }
  async updateUserProfile(
  uid: string,
  data: Partial<UserModel>
): Promise<void> {

  const userRef = doc(
    this.firestore,
    `users/${uid}`
  );

  await updateDoc(
    userRef,
    data
  );}}