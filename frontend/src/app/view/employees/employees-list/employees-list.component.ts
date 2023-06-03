import {Component, Injectable, OnInit} from '@angular/core';
import {EmployeeService} from "src/app/controler/service/employee.service";
import {ZeroFound} from "src/app/view/layouts/zero-found";
import {Employee} from "src/app/controler/model/employee.model";
import {about, add, edit} from "src/app/app-routing.module";
import {ActivatedRoute, Router} from "@angular/router";
import {AppComponent} from "src/app/app.component";
import {EmployeesPageComponent} from "src/app/view/pages/employees/employees-page/employees-page.component";

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
@Injectable({providedIn: 'root'})
export class EmployeesListComponent extends ZeroFound implements OnInit{

  addEmployeePage = add;
  editEmployeePage = edit;
  aboutEmployeePage = about;

  constructor(
    private employeeService: EmployeeService,
    private appComponent: AppComponent,
    private employeesPage: EmployeesPageComponent,
    private router: Router,
    private route: ActivatedRoute) {super();}

  ngOnInit(): void {
    this.findAll();
    this.notFoundEmoji();
  }

  public findAll(): void {
    this.employeeService.findAll().subscribe(
      data => this.employees = data)
  }

  public showDeleteBox(cin: string, index: number) {
    this.employeesPage.showDeleteBox(cin,index)
  }

  public destroyDeleteBox() {
    this.employeesPage.destroyDeleteBox();
  }

  public redirectTo(path: string,cin: string) {
    this.appComponent.hideAlertMessage();
    this.router.navigate([path, cin],
      {
        state: {prevUrl: this.router.url},
        relativeTo: this.route
      }).then()
  }

  get employee(): Employee {
    return this.employeeService.employee;
  }

  set employee(value: Employee) {
    this.employeeService.employee = value;
  }

  get employees(): Employee[] {
    return this.employeeService.employees;
  }

  set employees(value: Employee[]) {
    this.employeeService.employees = value;
  }
}
