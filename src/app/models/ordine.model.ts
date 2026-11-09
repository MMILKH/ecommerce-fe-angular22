export interface OrdineDto {
  dataCreazione?: string | Date;
  indirizzoSpedizione: string;
  indirizzoFatturazione: string;
  importo?: number;
  codice?: string;
  stato?: string;
}