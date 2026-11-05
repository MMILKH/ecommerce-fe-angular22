import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProdottoService } from '../../services/prodotto/prodotto.service';
import { ProdottoDto } from '../../models/prodotto.model';
import { ProdottoCardComponent } from '../prodotto-card/prodotto-card.component';
import { AuthService } from '../../services/user/login.service';
import { CarrelloService } from '../../services/carrello/carrello.service';
import { RigaCarrelloDto } from '../../models/rigaCarrello.model';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProdottoCardComponent,RouterLink],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.css'
})
export class CatalogoComponent implements OnInit {
  private prodottoService = inject(ProdottoService);
  private carrelloService = inject(CarrelloService);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private authService = inject(AuthService);
  prodotti: ProdottoDto[] = [];
 
  errorMessage : string = "";

  ngOnInit(): void {
  
    this.route.queryParamMap.subscribe(params => {
      const categoria = params.get('categoria') || ''; 

      this.prodottoService.getProdotti(categoria).subscribe({
        next: (data) => {
          this.prodotti = data;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Errore recupero prodotti:', err)
      });
    });
  }
  onAggiungiAlCarrello(data:{prodotto: ProdottoDto; quantita:number}): void {

    const rigaNew : RigaCarrelloDto = {
      prodotto: data.prodotto,
      quantita: data.quantita
    }

    this.carrelloService.addFromcatalog(rigaNew ,this.authService.currentUser()!.id).subscribe({
      next: (rigaCarrello) => {
      console.log('Aggiunta la riga con successo :', rigaCarrello);
    },
    error: (err) => {
      console.error('Errore durante la registrazione:', err);
      this.errorMessage = "Errore non è stato possibile registrare l'utente";
    }

    
})
}}