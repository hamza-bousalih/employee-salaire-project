import {Echelle} from "./echelle.model";

export class Echelon {
  id!: number;
  code!: string;
  libelle!: string;
  echelle!: Echelle;
  prime!: number;
  delai!: number;
  nextEchelon!: Echelon;
  prevEchelon!: Echelon;
}
