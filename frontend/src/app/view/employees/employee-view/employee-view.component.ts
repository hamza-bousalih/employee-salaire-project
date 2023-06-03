import {Component, Input, OnInit} from '@angular/core';
import {Employee} from "src/app/controler/model/employee.model";
import {EmployeeService} from "src/app/controler/service/employee.service";
import {employeesLink} from "src/app/app-routing.module";
import {Router} from "@angular/router";
import {AlertMessage} from "src/app/view/layouts/AlertMessage/alert-message.component";
import {AppComponent} from "src/app/app.component";

@Component({
  selector: 'app-backend-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.scss']
})
export class EmployeeViewComponent implements OnInit {
  @Input() employeeCin!: string;

  constructor(
    private employeeService: EmployeeService,
    private appComponent: AppComponent,
    private router: Router) {}
  ngOnInit() {
    this.getAlertMessageData();
    this.findByCin()
  }

  private findByCin() {
    this.employeeService.findByCin(this.employeeCin).subscribe(
      data => {
        if (data != null) this.employee = data
        else {
          let alert = new AlertMessage(true, 'w',
            'there is no backend with CIN: ' + this.employeeCin )
          this.router.navigate([employeesLink], {state: {...alert}}).then()
        }
      })
  }

  public getAlertMessageData() {
    this.appComponent.getAlertMessageDate()
  }

  get employee(): Employee {
    return this.employeeService.employee;
  }

  set employee(value: Employee) {
    this.employeeService.employee = value;
  }
}
