import {Component, OnInit} from '@angular/core';
import {Echelon} from "src/app/controler/model/echelon.model";
import {EntiteAdministratif} from "src/app/controler/model/entite-administratif.model";
import {EmployeeService} from "src/app/controler/service/employee.service";
import {EchelonService} from "src/app/controler/service/echelon.service";
import {EntiteAdministratifService} from "src/app/controler/service/entite-administratif.service";
import {Router} from "@angular/router";
import {Employee} from "src/app/controler/model/employee.model";
import {AlertMessage} from "src/app/view/layouts/AlertMessage/alert-message.component";
import {employeesLink} from "src/app/app-routing.module";
import {AppComponent} from "src/app/app.component";
import {RequireElement, RequireElementsComponent} from "src/app/view/layouts/require-elements/require-elements.component";

@Component({
  selector: 'app-employees-create',
  templateUrl: './employees-create.component.html',
  styleUrls: ['./employees-create.component.scss']
})
export class EmployeesCreateComponent extends RequireElementsComponent implements OnInit{
  private _employeeEchelon = {} as Echelon;
  private _employeeEntite = {} as EntiteAdministratif;

  // attrs for notValid failed
  cinNotValid!: boolean;
  nameNotValid!: boolean;
  lastnameNotValid!: boolean;
  emailNotValid!: boolean;
  phoneNotValid!: boolean;
  echelonNotValid!: boolean;
  entiteNotValid!: boolean;

  constructor(
    private employeeService: EmployeeService,
    private echelonService: EchelonService,
    private entiteService: EntiteAdministratifService,
    private appComponent: AppComponent,
    private router: Router){super()}

  ngOnInit(): void {
    this.employee = new Employee();
    this.findEchelons();
    this.findEntites();
  }

  public save(): void {
    this.hideAlertMessage();

    // set echelon & entite to backend
    this.employee.echelon = this.employeeEchelon;
    this.employee.entiteAdministratif = this.employeeEntite;

    this.employeeService.save().subscribe(
      data => {
        // @ts-ignore
        let alertMessageData = this.employeeService.employeeSaveResponses[data];

        if (data == 1) {
          let alertMessage = new AlertMessage(true,'s', alertMessageData.message);
          this.employeeService.employee = new Employee();
          // redirect to 'employees page' with alertMessage data
          this.redirect(alertMessage);

        } else {
          let alertMessage = new AlertMessage(true,'e', alertMessageData.message);
          this.showAlertMessage(alertMessage);
          // @ts-ignore
          this[alertMessageData.failed + 'NotValid'] = true;
        }
      }
    );
  }

  public findEchelons(): void {
    this.echelonService.findAll().subscribe(
      data => {
        if (data.length > 0) {
          this.echelons = data;
          this.employeeEchelon = this.echelons[0];
        } else {
          this.requireElements
            .push(new RequireElement('/echelons/add','add new echelon'))
        }
      }
    );
  }

  public findEntites(): void {
    this.entiteService.findAll().subscribe(
      data => {
        if (data.length > 0){
          this.entites = data;
          this.employeeEntite = this.entites[0];
        } else {
          this.requireElements
            .push(new RequireElement('/entites-administartifs/add','add new entite administartif'))
        }
      }
    );
  }

  redirect(data: {}): void {
    let prevUrl = employeesLink;
    if (this.router.url.startsWith('/' + employeesLink)){}
    this.router.navigate([prevUrl], {state: {...data}}).then();
  }

  noValidToggle(failed: string): void {
    let failedValidate = failed + 'NotValid';
    // @ts-ignore
    this[failedValidate] = this.employee[failed as keyof Employee] == '';
  }

  get employee(): Employee {
    return this.employeeService.employee;
  }

  set employee(value: Employee) {
    this.employeeService.employee = value;
  }

  get employeeEchelon(): Echelon {
    if (this._employeeEchelon == null)
      this._employeeEchelon = new Echelon();
    return this._employeeEchelon;
  }

  set employeeEchelon(value: Echelon) {
    this._employeeEchelon = value;
  }

  get employeeEntite(): EntiteAdministratif {
    if (this._employeeEntite == null)
      this._employeeEntite = new EntiteAdministratif();
    return this._employeeEntite;
  }

  set employeeEntite(value: EntiteAdministratif) {
    this._employeeEntite = value;
  }

  get echelons(): Echelon[] {
    return this.echelonService.echelons;
  }

  set echelons(value: Echelon[]) {
    this.echelonService.echelons = value;
  }

  get entites(): EntiteAdministratif[] {
    return this.entiteService.entites;
  }

  set entites(value: EntiteAdministratif[]) {
    this.entiteService.entites = value;
  }

  public showAlertMessage(alert: AlertMessage) {
    this.appComponent.showAlertMessage(alert);
  }

  public hideAlertMessage() {
    this.appComponent.hideAlertMessage();
  }
}
