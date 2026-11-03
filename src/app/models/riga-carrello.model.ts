import { ProdottoDto } from './prodotto.model';

export interface RigaCarrelloDto {
  id?: number;
  prodotto: ProdottoDto;
  quantita: number;
}