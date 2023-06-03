import {Component, OnInit} from '@angular/core';
import {SalaryMethods} from "src/app/view/layouts/salary-methods";
import {
  AboutEmployeePageComponent
} from "src/app/view/pages/employees/about-employee-page-/about-employee-page/about-employee-page.component";

@Component({
  selector: 'app-backend-salary-calc',
  templateUrl: './employee-salary-calc.component.html',
  styleUrls: ['./employee-salary-calc.component.scss']
})
export class EmployeeSalaryCalcComponent implements OnInit{
  salaryMonth!: Date;
  employeeCin!: string;
  months = [
    'january', 'february', 'march',
    'april', 'may', 'june',
    'july', 'august', 'september',
    'october', 'november', 'december'
  ]
  years: Array<number> = [];
  year!: number;
  month!: number;

  constructor(
    private salaryMethods: SalaryMethods,
    private aboutEmployeePage: AboutEmployeePageComponent) {
  }

  ngOnInit() {
    this.getCurrentDate();
    for (let year = this.year; year <= new Date().getFullYear() + 5; year++) {
      this.years.push(year);
    }
  }

  calcSalary() {
    this.salaryMonth = new Date(this.year, this.month);
    this.salaryMethods.calcSalaryForEmployee(this.salaryMonth,this.employeeCin);
    this.hideBox();
  }

  getCurrentDate() {
    this.year = 2023;
    this.month = this.salaryMonth.getMonth()
  }

  public hideBox() {
    this.aboutEmployeePage.hideCalcSalaryBox();
  }
}
