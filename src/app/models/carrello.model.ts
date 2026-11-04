import { RigaCarrelloDto } from './rigaCarrello.model';

export interface CarrelloDto {
  id: number;
  stato: string;
  dataCreazione: string;
  righe: RigaCarrelloDto[];
}