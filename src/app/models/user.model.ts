import { RuoloDto } from "./ruoloDto.model";

export interface User {
  id: string;
  email: string;
  nome: string;
  cognome: string;
  numero: string;
  indirizzo?: string;
  ruolo: RuoloDto;

}