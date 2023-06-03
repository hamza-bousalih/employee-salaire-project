import {Echelon} from "./echelon.model";
import {EntiteAdministratif} from "./entite-administratif.model";

export class Employee {
  id!: number;
  cin!: string;
  nom!: string;
  prenom!: string;
  phone!: string;
  email!: string;
  echelon!: Echelon;
  baseSalary!: number;
  numMonths!: number;
  entiteAdministratif!: EntiteAdministratif;
}
