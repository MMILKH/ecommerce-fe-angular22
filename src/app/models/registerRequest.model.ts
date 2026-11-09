export interface RegisterRequestDto {
  email: string;
  password: string;
  passwordConf :string;
  nome: string;
  cognome: string;
  numero: string;
  indirizzo? : string;
}