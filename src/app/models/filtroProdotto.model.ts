export interface FiltroProdotto {
   id?: string;
  nome?: string;
  descrizioneBreve?: string;
  prezzo?: number;
  categoria?: string;
  page: number;
  elements: number;
  sort: string;
}