import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { AuthService } from '../user/login.service';
import { ProdottoDto } from '../../models/prodotto.model';

@Injectable({
  providedIn: 'root'
})
export class AdminServices {
    private http = inject(HttpClient);
    private urlUser = 'http://localhost:3000/users';
    private urlProducts = 'http://localhost:3000/products';
    


    getUser(): Observable<User[]>{
        return this.http.get<User[]>(this.urlUser);
    }
    getProducts(): Observable<ProdottoDto[]>{
        return this.http.get<ProdottoDto[]>(this.urlProducts);
    }
}
