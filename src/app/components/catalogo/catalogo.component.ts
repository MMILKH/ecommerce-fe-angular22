import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

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
}