import { Injectable, inject } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { map, Observable, pipe, switchMap } from 'rxjs';
import { CarrelloDto } from '../../models/carrello.model';
import { RigaCarrelloDto } from '../../models/rigaCarrello.model';


@Injectable({
  providedIn: 'root'
})
export class CarrelloService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/cart';


  
 getcart(userId:string): Observable<CarrelloDto> {
  const params = new HttpParams().set('userId',userId);
  return this.http.get<CarrelloDto[]>(this.url,{params}).pipe(
    map((carrello)=>carrello[0])
  );

}
  addFromcatalog(data: RigaCarrelloDto, userId: string): Observable<CarrelloDto> {
  
  return this.getcart(userId).pipe(
    switchMap((carrello) => {
     
      const rigaEsistente = carrello.righe.find(r => String (r.prodotto.id) === String(data.prodotto.id));

      if (rigaEsistente) {
        
        rigaEsistente.quantita += data.quantita;
      } else {
      
        const nuovaRiga: RigaCarrelloDto = {
          id : Date.now(),
          prodotto: data.prodotto,
          quantita: data.quantita
        };
        carrello.righe.push(nuovaRiga);
      }
      return this.http.put<CarrelloDto>(`${this.url}/${carrello.id}`, carrello);
    })
  );
}

}
