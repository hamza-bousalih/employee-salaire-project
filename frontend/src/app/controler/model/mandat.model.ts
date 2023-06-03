import {Employee} from "./employee.model";
import {Responsibility} from "./responsibility.model";

export class Mandat {
  id!: number;
  code!: string;
  employee!: Employee;
  responsibility!: Responsibility;
  prime!: number;
  startDate!: Date;
  endDate!: Date;
}
