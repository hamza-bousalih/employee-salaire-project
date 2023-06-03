import {Echelon} from "./echelon.model";

export class Responsibility {
  id!: number;
  code!: string;
  libelle!: string;
  prime!: number;
  echelon!: Echelon;
}
