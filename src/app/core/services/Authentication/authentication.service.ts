import { HttpClient } from '@angular/common/http';
import {
  afterNextRender,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userToken: WritableSignal<string> = signal('');
  private readonly router = inject(Router);
  constructor(private httpClient: HttpClient) {
    afterNextRender(() => {
      this.checkUserToken();
    });
  }
  signup(userdata: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}auth/signup`, userdata);
  }
  signIn(userdata: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}auth/signin`, userdata);
  }
  forgotPasswords(userEmail: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}auth/forgotPasswords`,
      userEmail
    );
  }

  saveUser() {
    if (localStorage.getItem('userToken')) {
      this.userToken.set(jwtDecode(localStorage.getItem('userToken')!));
      // console.log(this.userToken);
    }
  }
  checkUserToken() {
    if (localStorage.getItem('userToken')) {
      this.userToken.set(jwtDecode(localStorage.getItem('userToken')!));
      // console.log(this.userToken);
    }
  }

  signOut() {
    localStorage.removeItem('userToken');
    this.userToken.set('');
    this.router.navigate(['/home']);
  }
}
