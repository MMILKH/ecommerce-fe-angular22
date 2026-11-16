import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {RegisterRequestDto} from '../../models/registerRequest.model'
import { environment } from '../../../env';
import { JwtResponse } from '../../models/jwtResponse.model';
@Injectable({
  providedIn: 'root'
})
export class RegisterService{
private http = inject(HttpClient);
private apiUrl = `${environment.apiUrl}/user`;
register(data: RegisterRequestDto): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/register`, data).pipe(
      tap((response) => {
        
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('user', JSON.stringify(response.utente));
      })
    );
  }


}
