import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from './auth';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError, tap, catchError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  URL = environment.apiURL;
  private authSbj = new BehaviorSubject<null | Auth>(null);
  user$ = this.authSbj.asObservable();
  utente!: Auth;

  constructor(private http: HttpClient, private router: Router) {
    this.restore();
  }

  login(data: { email: string; password: string }) {
    return this.http.post<Auth>(`${this.URL}/login`, data).pipe(
      tap((loggedIn) => {
        this.authSbj.next(loggedIn);
        this.utente = loggedIn;
        localStorage.setItem('user', JSON.stringify(loggedIn));
        alert('Login effettuato');
        this.router.navigate(['/']);
      }),
      catchError(this.errors)
    );
  }

  restore() {
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    const UserData: Auth = JSON.parse(user);

    if (this.jwtHelper.isTokenExpired(UserData.accessToken)) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/']);
    }
    this.authSbj.next(UserData);
  }

  register(data: {
    email: string;
    password: string;
    name: string;
    lastName: string;
    pfp: string;
  }) {
    return this.http.post(`${this.URL}/register`, data).pipe(
      tap(() => {
        this.router.navigate(['/login']), catchError(this.errors);
      })
    );
  }

  logout() {
    this.authSbj.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getUserId(): number | null {
    const user = localStorage.getItem('user');
    if (user) {
      const userData: Auth = JSON.parse(user);
      return userData.user.id;
    }
    return null;
  }

  private errors(err: any) {
    console.log(err);
    switch (err.error) {
      case 'Email already exists':
        return throwError('Email già in uso');
        break;

      case 'Email format is invalid':
        return throwError('Formato email non valido');
        break;

      case 'Cannot find user':
        return throwError('Utente inesistente');
        break;

      default:
        return throwError('Errore');
        break;
    }
  }
}
