import {Component, OnInit} from '@angular/core';
import {about} from "src/app/app-routing.module";
import {SalaryDetailsService} from "src/app/controler/service/salary-details.service";
import {SalaryMethods} from "src/app/view/layouts/salary-methods";
import {SalariesPageComponent} from "src/app/view/pages/salaries/salaries-page.component";

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.scss']
})
// @ts-ignore
export class SalaryListComponent extends SalaryMethods implements OnInit{
  aboutEmployeePage = '/' + about;

  constructor(
    private override salaryService: SalaryDetailsService,
    private salariesPage: SalariesPageComponent) {super(salaryService)}

  ngOnInit() {
    this.findByMonth(this.salaryMonth);
    this.notFoundEmoji();
  }

  get salaryMonth(): Date {
    return this.salariesPage.salaryMonth;
  }

  set salaryMonth(value: Date) {
    this.salariesPage.salaryMonth = value;
  }
}
