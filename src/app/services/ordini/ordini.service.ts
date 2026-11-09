import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../env';
import { OrdineDto } from '../../models/ordine.model';

@Injectable({
  providedIn: 'root'
})
export class OrdineService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/order`;

  checkout(userId: number | string, ordine: OrdineDto): Observable<OrdineDto> {
    return this.http.post<OrdineDto>(`${this.url}/${userId}/checkout`, ordine);
  }
}
