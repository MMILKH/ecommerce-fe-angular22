import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { AuthService } from '../user/login.service';
import { ProdottoDto } from '../../models/prodotto.model';
import { FiltroUtente } from '../../models/filtroUtente.model';
import { FiltroProdotto } from '../../models/filtroProdotto.model';
import { environment } from '../../../env';

@Injectable({
  providedIn: 'root'
})




export class AdminServices {
    private http = inject(HttpClient);
    private urlUser = `${environment.apiUrl}/user/admin`;
    private urlProducts = 'http://localhost:3000/products';
    


  getUser(filtri: FiltroUtente): Observable<User[]> {
  let params: any = {};

    if (filtri.nome?.trim()){ 
      params['nome'] = filtri.nome.trim();
    }
    if (filtri.cognome?.trim()){
      params['cognome'] = filtri.cognome.trim();
    } 
    if (filtri.email?.trim()) {
    params['email'] = filtri.email.trim();}
    if (filtri.ruolo?.trim()){
       params['ruolo'] = filtri.ruolo.trim();}
  

  return this.http.get<User[]>(`${this.urlUser}`, { params });
}


    getProducts(filtri: FiltroProdotto): Observable<ProdottoDto[]>{
        let params: any = {};

    if (filtri.nome?.trim()){ 
      params['nome'] = filtri.nome.trim();
    }
    if (filtri.descrizioneBreve?.trim()){
      params['descrizioneBreve'] = filtri.descrizioneBreve.trim();
    } 
    if (filtri.id?.trim()) {
    params['id'] = filtri.id.trim();
  }

    if (filtri.categoria?.trim()){
       params['categoria'] = filtri.categoria.trim();}
  

    return this.http.get<ProdottoDto[]>(`${this.urlProducts}`, { params });
    }
}
