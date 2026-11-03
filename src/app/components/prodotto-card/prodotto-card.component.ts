import { Component, Input } from '@angular/core';
import { ProdottoDto } from '../../models/prodotto.model';

@Component({
  selector: 'app-prodotto-card',
  standalone: true,
  imports: [],
  templateUrl: './prodotto-card.component.html',
  styleUrl: './prodotto-card.component.css'
})
export class ProdottoCardComponent {
  @Input({ required: true }) prodotto!: ProdottoDto;
  @Input() quantita?: number;
}