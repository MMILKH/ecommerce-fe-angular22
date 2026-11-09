export interface ProdottoDto {
  id: string;
  nome: string;
  descrizioneBreve: string;
  descrizioneEstesa: string;
  prezzo: number;
  immagine: string;
  disponibilita: number;
  categoria?: string;
}