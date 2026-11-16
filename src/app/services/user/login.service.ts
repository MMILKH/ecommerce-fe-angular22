import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../../models/loginRequest.model';
import { User } from '../../models/user.model';
import { environment } from '../../../env';
import { JwtResponse } from '../../models/jwtResponse.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/user`;
  private currentUserSignal = signal<User | null>(this.getUserFromStorage());
  currentUser = this.currentUserSignal.asReadonly();
  login(credentials: LoginRequest): Observable<JwtResponse> {
  
    return this.http.post <JwtResponse> (`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
          this.setSession(response.token, response.utente);
      })
    );
  }

  
  private setSession(token:string, user:User): void {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('currentUser',JSON.stringify(user))
    this.currentUserSignal.set(user); 
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }


  private getUserFromStorage(): User | null {
    const savedUser = sessionStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  }

  
  logout(): void {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('token');
    this.currentUserSignal.set(null);
  }
}