import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../../models/loginRequest.model';
import { User } from '../../models/user.model';
import { environment } from '../../../env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/user`;
  private currentUserSignal = signal<User | null>(this.getUserFromStorage());
  currentUser = this.currentUserSignal.asReadonly();
  login(credentials: LoginRequest): Observable<User> {
  
    return this.http.post <User> (`${this.apiUrl}/login`, credentials).pipe(
      tap((utente) => {
          this.setCurrentUser(utente);
      })
    );
  }

  
  private setCurrentUser(user: User): void {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    //localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSignal.set(user); 
  }


  private getUserFromStorage(): User | null {
    const savedUser = sessionStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  }

  
  logout(): void {
    sessionStorage.removeItem('currentUser');
    this.currentUserSignal.set(null);
  }
}