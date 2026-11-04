import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {RegisterRequestDto} from '../../models/registerRequest.model'
@Injectable({
  providedIn: 'root'
})
export class RegisterService{
private http = inject(HttpClient);
private apiUrl = 'http://localhost:3000/users';
register(data:RegisterRequestDto): Observable<RegisterRequestDto>{
    const payload = {
    ...data,
    email: data.email.trim().toLowerCase(),
    password: data.password.trim()
  };
    return this.http.post<RegisterRequestDto>(this.apiUrl, payload);

}


}
