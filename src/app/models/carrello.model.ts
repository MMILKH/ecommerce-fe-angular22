import { RigaCarrelloDto } from './riga-carrello.model';

export interface CarrelloDto {
  id: number;
  stato: string;
  dataCreazione: string;
  righe: RigaCarrelloDto[];
}