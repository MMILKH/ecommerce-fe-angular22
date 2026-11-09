import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {RegisterRequestDto} from '../../models/registerRequest.model'
import { environment } from '../../../env';
@Injectable({
  providedIn: 'root'
})
export class RegisterService{
private http = inject(HttpClient);
private apiUrl = `${environment.apiUrl}/user`;
register(data: RegisterRequestDto): Observable<string> {
    return this.http.post<any>(`${this.apiUrl}/register`, data, {
      responseType : 'text'
    });
  }


}
