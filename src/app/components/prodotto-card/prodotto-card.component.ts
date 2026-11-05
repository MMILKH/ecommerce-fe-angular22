import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Fondamentale per [(ngModel)]
import { ProdottoDto } from '../../models/prodotto.model';

@Component({
  selector: 'app-prodotto-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prodotto-card.component.html',
  styleUrl: './prodotto-card.component.css'
})
export class ProdottoCardComponent {
  @Input() prodotto!: ProdottoDto;

  @Input() mostraAggiungi: boolean = true; 

  @Output() aggiungi = new EventEmitter<{ prodotto: ProdottoDto; quantita: number;}>();

  @Input() quantita: number = 1;

  onAggiungi(): void {
    if (this.quantita > 0) {
      this.aggiungi.emit({
        prodotto: this.prodotto,
        quantita: this.quantita  
      });
    }
  }
}