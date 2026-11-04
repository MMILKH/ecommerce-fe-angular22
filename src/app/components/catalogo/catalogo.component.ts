import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProdottoService } from '../../services/prodotto/prodotto.service';
import { ProdottoDto } from '../../models/prodotto.model';
import { ProdottoCardComponent } from '../prodotto-card/prodotto-card.component';
import { AuthService } from '../../services/user/login.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProdottoCardComponent,RouterLink],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.css'
})
export class CatalogoComponent implements OnInit {
  private prodottoService = inject(ProdottoService);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private authService = inject(AuthService);

  prodotti: ProdottoDto[] = [];

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
  onAggiungiAlCarrello(event: { prodotto: ProdottoDto; quantita: number }): void {
  console.log(`Aggiunti ${event.quantita} pezzi di ${event.prodotto.nome} al carrello`);

}
}