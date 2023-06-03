import {Component, OnInit} from '@angular/core';
import {AppComponent} from "src/app/app.component";
import {Router} from "@angular/router";
import {Employee} from "src/app/controler/model/employee.model";
import {AlertMessage} from "src/app/view/layouts/AlertMessage/alert-message.component";
import {MandatService} from "src/app/controler/service/mandat.service";
import {Responsibility} from "src/app/controler/model/responsibility.model";
import {Mandat} from "src/app/controler/model/mandat.model";
import {employeesLink} from "src/app/app-routing.module";
import {ResponsibilityService} from "src/app/controler/service/responsibility.service";

@Component({
  selector: 'app-backend-set-responsibility',
  templateUrl: './employee-set-responsibility.component.html',
  styleUrls: ['./employee-set-responsibility.component.scss'],
})
export class EmployeeSetResponsibilityComponent implements OnInit{
  responsibility = {} as Responsibility;
  employee = {} as Employee;

  prevUrl!: string;

  // attrs for notValid failed
  employeeNotValid!: boolean;
  responsibilityNotValid!: boolean;
  dateNotValid!: boolean

  constructor(
    private mandatService: MandatService,
    private responsibilityService: ResponsibilityService,
    private appComponent: AppComponent,
    private router: Router){}

  ngOnInit() {
    this.mandat = new Mandat();

    this.employee.cin = history.state?.cin;
    this.prevUrl = history.state != null ? history.state.prevUrl: '/' + employeesLink;

    if (this.employee.cin == null){
      this.redirect(null)
      return;
    }

    this.findResponsibilities();
  }

  public save(): void {
    this.hideAlertMessage();

    this.mandat.responsibility = this.responsibility;
    this.mandat.employee = this.employee;

    this.mandatService.save().subscribe(
      data => {
        // @ts-ignore
        let alertDate = this.mandatService.saveResponses[data];
        if (data == 1) {
          let alert = new AlertMessage(true, 's', alertDate.message)
          this.redirect(alert);
          return
        } else {
          let alert = new AlertMessage(true, 'e', alertDate.message)
          // @ts-ignore
          this[ alertDate.failed + 'NotValid'] = true;
          this.showAlertMessage(alert);
        }
    })
  }

  public findResponsibilities() {
    this.responsibilityService.findAll().subscribe(data => {
      this.responsibilities = data;
      this.responsibility.code = data[0].code;
    })
  }


  redirect(data: {} | null): void {
    if (data == null)
      this.router.navigate([this.prevUrl]).then();
    else
      this.router.navigate([this.prevUrl], {state: {...data}}).then();
  }

  noValidToggle(failed: string): void {
    let failedValidate = failed + 'NotValid';
    // @ts-ignore
    this[failedValidate] = this.employee[failed as keyof Employee] == '';
  }

  public showAlertMessage(alert: AlertMessage) {
    this.appComponent.showAlertMessage(alert);
  }

  public hideAlertMessage() {
    this.appComponent.hideAlertMessage();
  }

  get mandat(): Mandat {
    return this.mandatService.mandat;
  }

  set mandat(value: Mandat) {
    this.mandatService.mandat = value;
  }

  get responsibilities(): Responsibility[] {
    return this.responsibilityService.responsibilities;
  }

  set responsibilities(value: Responsibility[]) {
    this.responsibilityService.responsibilities = value;
  }
}
