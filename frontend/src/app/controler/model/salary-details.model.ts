import {Employee} from "./employee.model";
import {Responsibility} from "./responsibility.model";

export class SalaryDetails {
  id!: number;
  code!: string;
  employee!: Employee;
  month!: Date;
  salaireBase!: number;
  responsibility!: Responsibility;
  responsibilityPrime!: number;
  primeGeneral!: number;
}
