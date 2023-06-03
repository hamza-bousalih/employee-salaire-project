import {Component, OnInit} from '@angular/core';
import {SalaryMethods} from "src/app/view/layouts/salary-methods";
import {SalariesPageComponent} from "src/app/view/pages/salaries/salaries-page.component";

@Component({
  selector: 'app-salary-calc',
  templateUrl: './salary-calc.component.html',
  styleUrls: ['./salary-calc.component.scss']
})
export class SalaryCalcComponent implements OnInit{
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
    private salariesPage: SalariesPageComponent) {
  }

  ngOnInit() {
    this.getCurrentDate();
    for (let year = this.year; year <= new Date().getFullYear() + 5; year++) {
      this.years.push(year);
    }
  }

  calcSalary() {
    this.salaryMonth = new Date(this.year, this.month);
    this.salaryMethods.calcSalary(this.salaryMonth);
    this.hideBox();
  }

  getCurrentDate() {
    this.year = this.salaryMonth.getFullYear();
    this.month = this.salaryMonth.getMonth()
  }

  get salaryMonth(): Date {
    return this.salariesPage.salaryMonth;
  }

  set salaryMonth(value: Date) {
    this.salariesPage.salaryMonth = value;
  }

  public hideBox() {
    this.salariesPage.hideCalcSalaryBox();
  }
}
