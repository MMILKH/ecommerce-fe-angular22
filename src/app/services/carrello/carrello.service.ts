import { Injectable, inject } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarrelloDto } from '../../models/carrello.model';

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/cart';
 getcart(): Observable<CarrelloDto> {
  return this.http.get<CarrelloDto>(this.url);
}

}
