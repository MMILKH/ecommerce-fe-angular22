import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdottoDto } from '../models/prodotto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdottoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/products';

  getProdotti(): Observable<ProdottoDto[]> {
    return this.http.get<ProdottoDto[]>(this.apiUrl);
  }

  getProdottoById(id: number): Observable<ProdottoDto> {
    return this.http.get<ProdottoDto>(`${this.apiUrl}/${id}`);
  }
}