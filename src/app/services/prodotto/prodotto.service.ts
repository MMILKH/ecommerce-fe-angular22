import { Injectable, inject } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdottoDto } from '../../models/prodotto.model';
import { environment } from '../../../env';

@Injectable({
  providedIn: 'root'
})
export class ProdottoService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/products/catalog`;

 getProdotti(categoria?: string): Observable<ProdottoDto[]> {

  if (!categoria || categoria.trim() === '') {
    return this.http.get<ProdottoDto[]>(this.url);
  }

  const params = new HttpParams().set('categoria', categoria.trim());
  return this.http.get<ProdottoDto[]>(this.url, { params });
}

  
}