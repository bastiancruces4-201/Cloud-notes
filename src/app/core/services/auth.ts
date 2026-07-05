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

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {}

  async register(email: string, password: string): Promise<User> {
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    if (credential.user) {
      await sendEmailVerification(credential.user);
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