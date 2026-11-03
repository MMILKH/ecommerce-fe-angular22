import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../models/loginRequest.model';
@Injectable({
  providedIn: 'root'
})
export class Login {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/user';
}
