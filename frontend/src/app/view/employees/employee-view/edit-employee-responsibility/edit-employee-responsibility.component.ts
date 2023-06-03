import {Component, OnInit} from '@angular/core';
import {Responsibility} from "src/app/controler/model/responsibility.model";
import {Employee} from "src/app/controler/model/employee.model";
import {MandatService} from "src/app/controler/service/mandat.service";
import {ResponsibilityService} from "src/app/controler/service/responsibility.service";
import {AppComponent} from "src/app/app.component";
import {ActivatedRoute, Router} from "@angular/router";
import {employeesLink} from "src/app/app-routing.module";
import {AlertMessage} from "src/app/view/layouts/AlertMessage/alert-message.component";
import {Mandat} from "src/app/controler/model/mandat.model";

@Component({
  selector: 'app-edit-backend-responsibility',
  templateUrl: './edit-employee-responsibility.component.html',
  styleUrls: ['./edit-employee-responsibility.component.scss']
})
export class EditEmployeeResponsibilityComponent implements OnInit{
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
    private router: Router, private route: ActivatedRoute){}

  ngOnInit() {
    this.prevUrl = history.state != null ? history.state.prevUrl: '/' + employeesLink;

    this.route.paramMap.subscribe(
      params => {
        let code = params.get('code') as string;
        this.findByCode(code);
      }
    )

    this.findResponsibilities();
  }

  public update(): void {
    this.hideAlertMessage();

    this.mandat.responsibility = this.responsibility;
    this.mandat.employee = this.employee;

    console.log(this.mandat)

    this.mandatService.update().subscribe(
      data => {
        // @ts-ignore
        let alertDate = this.mandatService.updateResponses[data];
        if (data == 1) {
          let alert = new AlertMessage(true, 's', alertDate.message)
          this.redirect(null,alert);
          return
        } else {
          let alert = new AlertMessage(true, 'e', alertDate.message)
          // @ts-ignore
          this[ alertDate.failed + 'NotValid'] = true;
          this.showAlertMessage(alert);
        }
      })
  }

  public findByCode(code: string) {
    this.mandatService.findByCode(code).subscribe(
      data => {
        this.mandat = data;

        if (this.mandat == null) {
          let alert = new AlertMessage(true,'w','targeted responsibility does not exist')
          this.redirect(null,alert)
        } else {
          this.employee = this.mandat.employee;
          this.responsibility = this.mandat.responsibility;
        }
      }
    )
  }

  public findResponsibilities() {
    this.responsibilityService.findAll().subscribe(data => {
      this.responsibilities = data;
      this.responsibility.code = data[0].code;
    })
  }

  redirect(path: string | null,data: {} | null): void {
    if (path == null) path = this.prevUrl;
    if (data == null)
      this.router.navigate([path]).then();
    else
      this.router.navigate([path], {state: {...data}}).then();
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
