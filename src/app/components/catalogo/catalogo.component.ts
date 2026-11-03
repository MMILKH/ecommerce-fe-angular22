import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProdottoService } from '../../services/prodotto/prodotto.service';
import { ProdottoDto } from '../../models/prodotto.model';
import { ProdottoCardComponent } from '../prodotto-card/prodotto-card.component';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProdottoCardComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.css'
})
export class CatalogoComponent implements OnInit {
  private prodottoService = inject(ProdottoService);
  private cdr = inject(ChangeDetectorRef);
  
  prodotti: ProdottoDto[] = [];

  ngOnInit(): void {
    this.prodottoService.getProdotti().subscribe({
      next: (data) => {
        console.log('Dati ricevuti nel componente:', data);
        this.prodotti = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Errore durante il recupero dei prodotti:', err)
    });
  }
}
