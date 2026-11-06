import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { CarrelloService } from '../../services/carrello/carrello.service';
import { AuthService } from '../../services/user/login.service';
import { RigaCarrelloDto } from '../../models/rigaCarrello.model';
import { CarrelloDto } from '../../models/carrello.model';

@Component({
  selector: 'app-carrello',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.css'
})
export class CarrelloComponent implements OnInit {
  private carrelloService = inject(CarrelloService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private location=inject(Location);
  private route = inject(ActivatedRoute);

  righe: RigaCarrelloDto[] = [];
  
  checkoutData = {
    indirizzoSpedizione: '',
    indirizzoFatturazione: ''
  };
  

  ngOnInit(): void {

    if (Object.keys(this.route.snapshot.queryParams).length > 0) {
      this.location.replaceState('/cart');
    }
    if (this.authService.currentUser()) {
      this.carrelloService.getcart(this.authService.currentUser()!.id).subscribe({
        next: (data) => {
          this.righe = data.righe;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Errore recupero carrello:', err)
      });
    } else {
      this.router.navigate(['/user/login']);
    }
  }

  calcolaTotale(): number {
    return this.righe.reduce((tot, riga) => tot + (riga.prodotto.prezzo * riga.quantita), 0);
  }

  onAggiornaQuantita(riga: RigaCarrelloDto): void {
    console.log(`Aggiorna riga ${riga.id} a quantità ${riga.quantita}`);
  }

  onRimuoviRiga(rigaId: number): void {
    console.log(`Rimuovi riga con ID ${rigaId}`);
  }

  onCheckout(): void {
    const userId = this.authService.currentUser()!.id;

    this.carrelloService.getcart(userId).subscribe({
      next: (carrello) => {

        const idOrdine = crypto.randomUUID();
        
        const riepilogoOrdine = {
          id : idOrdine, 
          carrello: carrello,
          totale: this.calcolaTotale(),
          indirizzoSpedizione: this.checkoutData.indirizzoSpedizione,
          indirizzoFatturazione: this.checkoutData.indirizzoFatturazione || this.checkoutData.indirizzoSpedizione
        };

        console.log('Checkout effettuato con successo:', riepilogoOrdine);
      },
      error: (err) => console.error('Errore durante il recupero del carrello:', err)
    });
  }}