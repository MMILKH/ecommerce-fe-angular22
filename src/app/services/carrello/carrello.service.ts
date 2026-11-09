import { Injectable, inject } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { map, Observable, pipe, switchMap } from 'rxjs';
import { CarrelloDto } from '../../models/carrello.model';
import { RigaCarrelloDto } from '../../models/rigaCarrello.model';
import { environment } from '../../../env';


@Injectable({
  providedIn: 'root'
})
export class CarrelloService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/cart`;


  
getCart(userId: number | string): Observable<CarrelloDto> {
  return this.http.get<CarrelloDto>(`${this.url}/${userId}`);
}

getRow(cartId: number | string, productId:number| string): Observable<RigaCarrelloDto>{
  return this.http.get<RigaCarrelloDto>(`${this.url}/${cartId}/${productId}`)
}

updateRowQuantity(rowId: number | string, newRow: RigaCarrelloDto): Observable<RigaCarrelloDto>{
  return this.http.patch<RigaCarrelloDto>(`${this.url}/${rowId}`,newRow)

}

deleteRow(rowId: number | string): Observable<void> {
  return this.http.delete<void>(`${this.url}/${rowId}`);
}


  addFromCatalog(data: RigaCarrelloDto, userId: number | string): Observable<RigaCarrelloDto> {
    return this.getCart(userId).pipe(
      switchMap((carrello) => 
        this.http.post<RigaCarrelloDto>(`${this.url}/${carrello.id}/add`, data)
      )
    );
  }

}
