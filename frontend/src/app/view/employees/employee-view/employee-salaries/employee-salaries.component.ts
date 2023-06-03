import {Component, Input, OnInit} from '@angular/core';
import {EmployeeService} from "src/app/controler/service/employee.service";
import {SalaryDetailsService} from "src/app/controler/service/salary-details.service";
import {SalaryDetails} from "src/app/controler/model/salary-details.model";

@Component({
  selector: 'app-backend-salaries',
  templateUrl: './employee-salaries.component.html',
  styleUrls: ['./employee-salaries.component.scss']
})
export class EmployeeSalariesComponent implements OnInit{
  @Input() employeeCin!: string;
  constructor(
    private employeeService: EmployeeService,
    private salaryService: SalaryDetailsService) {}

  ngOnInit() {
    this.findSalaries();
  }

  private findSalaries() {
    this.salaryService.findByEmployeeCin(this.employeeCin).subscribe(
      data => this.salaries = data)
  }

  get salaries(): SalaryDetails[] {
    return this.salaryService.salaries;
  }

  set salaries(value: SalaryDetails[]) {
    this.salaryService.salaries = value;
  }
}
