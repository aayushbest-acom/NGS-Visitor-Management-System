import { Injectable } from '@angular/core';
import { Actors } from '../models/actors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public static readonly AUTH_KEY: string = "AUTH_STATUS";
  public static readonly AUTH_KEY_LOGGED_IN: string = "AUTH_LOGGED_IN";
  public static readonly AUTH_KEY_LOGGED_OUT: string = "AUTH_LOGGED_OUT";
  private static readonly AUTH_CREDENTIAL: string = "AUTH_WHO_LOGGED_IN";
  public doLogIn(actor: Actors, credential: { username: string, password: string }): boolean {
    localStorage.setItem(AuthService.AUTH_KEY, AuthService.AUTH_KEY_LOGGED_IN);
    localStorage.setItem(AuthService.AUTH_CREDENTIAL, actor.toString());
    return localStorage.getItem(AuthService.AUTH_KEY) === AuthService.AUTH_KEY_LOGGED_IN
      && localStorage.getItem(AuthService.AUTH_CREDENTIAL) !== null;
  }
  public doLogOut(): boolean {
    localStorage.setItem(AuthService.AUTH_KEY, AuthService.AUTH_KEY_LOGGED_OUT);
    localStorage.removeItem(AuthService.AUTH_CREDENTIAL);
    return localStorage.getItem(AuthService.AUTH_KEY) === AuthService.AUTH_KEY_LOGGED_OUT &&
      localStorage.getItem(AuthService.AUTH_CREDENTIAL) === null;
  }
  public whoLoggedIn(): Actors | null {
    return Number(localStorage.getItem(AuthService.AUTH_CREDENTIAL)) as Actors;
  }
  public isLoggedIn(): boolean {
    return localStorage.getItem(AuthService.AUTH_KEY) !== null && localStorage.getItem(AuthService.AUTH_CREDENTIAL) !== null;
  }
}
