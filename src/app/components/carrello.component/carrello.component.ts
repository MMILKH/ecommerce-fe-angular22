import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { CarrelloService } from '../../services/carrello/carrello.service';
import { AuthService } from '../../services/user/login.service';
import { RigaCarrelloDto } from '../../models/rigaCarrello.model';
import { CarrelloDto } from '../../models/carrello.model';
import { OrdineDto } from '../../models/ordine.model';
import { OrdineService } from '../../services/ordini/ordini.service';

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
  private ordineService = inject(OrdineService);

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
      this.carrelloService.getCart(this.authService.currentUser()!.id).subscribe({
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
  this.carrelloService.updateRowQuantity(riga.id!, riga).subscribe({
    next: () => {
      console.log(`Riga ${riga.id!} modificata.`)
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Errore aggiornamento quantità:', err);
    }
  });
}

onRimuoviRiga(rigaId: number): void {
  this.carrelloService.deleteRow(rigaId).subscribe({
    next: () => {
      
      this.righe = this.righe.filter(r => r.id !== rigaId);
      console.log(`Riga ${rigaId} eliminata con successo dal carrello.`)
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Errore rimozione riga:', err);
    }
  });
}

  onCheckout(): void {
  const currentUser = this.authService.currentUser();
  if (!currentUser) {
    this.router.navigate(['/user/login']);
    return;
  }

  const payload: OrdineDto = {
    indirizzoSpedizione: this.checkoutData.indirizzoSpedizione,
    indirizzoFatturazione: this.checkoutData.indirizzoFatturazione || this.checkoutData.indirizzoSpedizione,
    importo:this.calcolaTotale()
  
  };

  this.ordineService.checkout(currentUser.id, payload).subscribe({
    next: (ordineConfermato: OrdineDto) => {
      console.log('Ordine creato con successo :', ordineConfermato);
      this.router.navigate(['/checkout/conferma', ordineConfermato.codice]);
    },
    error: (err) => {
      console.error('Errore durante il checkout:', err);
    }
  });
}}