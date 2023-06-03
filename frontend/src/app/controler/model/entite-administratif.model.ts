import {Employee} from "./employee.model";

export class EntiteAdministratif {
  id!: number;
  code!: string;
  libelle!: string;
  membersNum!: number;
  chef!: Employee;
}
