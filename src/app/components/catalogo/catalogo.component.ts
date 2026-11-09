import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router} from '@angular/router';
import { ProdottoService } from '../../services/prodotto/prodotto.service';
import { ProdottoDto } from '../../models/prodotto.model';
import { ProdottoCardComponent } from '../prodotto-card/prodotto-card.component';
import { AuthService } from '../../services/user/login.service';
import { CarrelloService } from '../../services/carrello/carrello.service';
import { RigaCarrelloDto } from '../../models/rigaCarrello.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProdottoCardComponent,RouterLink,FormsModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.css'
})
export class CatalogoComponent implements OnInit {
  private prodottoService = inject(ProdottoService);
  private carrelloService = inject(CarrelloService);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private authService = inject(AuthService);
  private router = inject(Router);
  prodotti: ProdottoDto[] = [];
 
  errorMessage : string = "";
  categoria : string = "";

  ngOnInit(): void {
  
    this.route.queryParamMap.subscribe(params => {
       this.categoria = params.get('categoria') || ''; 

      this.prodottoService.getProdotti(this.categoria).subscribe({
        next: (data) => {
          this.prodotti = data;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Errore recupero prodotti:', err)
      });
    });
  }

  onSetFilter(): void {
  this.router.navigate([], {
    relativeTo: this.route,
    queryParams: { categoria: this.categoria || null },
    queryParamsHandling: 'merge'
  });
  
}

  

  
  onAggiungiAlCarrello(data: { prodotto: ProdottoDto; quantita: number }): void {
  const currentUser = this.authService.currentUser();
  
  if (!currentUser) {
    this.router.navigate(['/user/login']);
    return;
  }

  const rigaNew: RigaCarrelloDto = {
    prodotto: data.prodotto,
    quantita: data.quantita
  };

  this.carrelloService.addFromCatalog(rigaNew, currentUser.id).subscribe({
    next: (rigaSalvata) => {
      console.log('Prodotto aggiunto al carrello con successo:', rigaSalvata);
    },
    error: (err) => {
      console.error('Errore durante l\'aggiunta al carrello:', err);
    }
  });
}
}