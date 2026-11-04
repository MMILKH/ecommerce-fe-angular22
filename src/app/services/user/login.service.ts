import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../../models/loginRequest.model';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/users';
  private currentUserSignal = signal<User | null>(this.getUserFromStorage());
  currentUser = this.currentUserSignal.asReadonly();
  login(credentials: LoginRequest): Observable<User[]> {
    const emailPulita = credentials.email.trim();
    const passwordPulita = credentials.password.trim();
    return this.http.get<User[]>(
      `${this.apiUrl}?email=${emailPulita}&password=${passwordPulita}`
    ).pipe(
      tap((utenti) => {
        if (utenti.length > 0) {
          this.setCurrentUser(utenti[0]);
        }
      })
    );
  }

  
  private setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSignal.set(user); 
  }


  private getUserFromStorage(): User | null {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  }

  
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSignal.set(null);
  }
}