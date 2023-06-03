import {Component, Input} from '@angular/core';
import {EmployeeService} from "src/app/controler/service/employee.service";
import {Router} from "@angular/router";
import {AlertMessage} from "src/app/view/layouts/AlertMessage/alert-message.component";
import {about, employeesLink} from "src/app/app-routing.module";
import {EmployeesListComponent} from "src/app/view/employees/employees-list/employees-list.component";
import {AppComponent} from "src/app/app.component";
import {EmployeesPageComponent} from "src/app/view/pages/employees/employees-page/employees-page.component";

@Component({
  selector: 'app-backend-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.scss']
})
export class EmployeeDeleteComponent {
  @Input() employeeCin!: string;
  @Input() employeeIndex!: number | null;
  @Input() wantToDelete!: boolean;
  reason = 'quiet';

  constructor(
    private appComponent: AppComponent,
    private employeesListComponent: EmployeesListComponent,
    private employeesPage: EmployeesPageComponent,
    private employeeService: EmployeeService,
    private router: Router) {}

  public delete(reason: string): void {
    this.hideAlertMessage();

    if (reason != '') {
      this.employeeService.delete(this.employeeCin,reason).subscribe(
        data => {
          if (data > 0) {
            let alertMessage =
              new AlertMessage(true, 's',
                `the employee with CIN: ${this.employeeCin} added successfully to 'employees archive'`);

            this.employeeIndex != null &&
                this.employeeService.employees.splice(this.employeeIndex,1);

            this.showAlertMessage(alertMessage)
            this.destroy();
            this.redirect(alertMessage);
          } else {
            let alertMessage =
              new AlertMessage(true, 'w', 'no Employee deleted');
            this.showAlertMessage(alertMessage)
            this.hideAlertMessage();
            this.destroy();
          }
        }
      )
    }
    else {
      let alertMessage = new AlertMessage(true, 'e', 'the reason is required!');
      this.showAlertMessage(alertMessage)
    }
  }

  public redirect(alert: AlertMessage) {
    if (this.router.url.includes(about)) {
      this.router.navigate(['/' + employeesLink], {state: {...alert}}).then()
    }
  }

  public destroy() {
    this.employeesPage.destroyDeleteBox();
  }

  public showAlertMessage(alert: AlertMessage) {
    this.appComponent.showAlertMessage(alert);
  }

  public hideAlertMessage() {
    this.appComponent.hideAlertMessage();
  }
}
