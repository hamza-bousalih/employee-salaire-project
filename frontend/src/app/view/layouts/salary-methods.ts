import {SalaryDetails} from "src/app/controler/model/salary-details.model";
import {SalaryDetailsService} from "src/app/controler/service/salary-details.service";
import {ZeroFound} from "src/app/view/layouts/zero-found";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class SalaryMethods extends ZeroFound{

  constructor(protected salaryService: SalaryDetailsService) {super()}

  public findByMonth(month: Date) {
    this.salaryService.findAllByMonth(month).subscribe(
      data => {
        this.salaries = data
      })
  }

  public calcSalary(month: Date) {
    this.salaryService.calcSalary(month).subscribe(
      () => this.findByMonth(month))
  }

  public findByCin(cin: string) {
    this.salaryService.findByEmployeeCin(cin).subscribe(
      data => this.salaries = data)
  }

  public calcSalaryForEmployee(month: Date,cin: string) {
    this.salaryService.calcSalary(month).subscribe(
      () => this.findByCin(cin))
  }


  get salary(): SalaryDetails {
    return this.salaryService.salary;
  }

  set salary(value: SalaryDetails) {
    this.salaryService.salary = value;
  }

  get salaries(): SalaryDetails[] {
    return this.salaryService.salaries;
  }

  set salaries(value: SalaryDetails[]) {
    this.salaryService.salaries = value;
  }
}
