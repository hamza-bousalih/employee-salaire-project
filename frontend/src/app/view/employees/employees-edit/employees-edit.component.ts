import {Component, OnInit} from '@angular/core';
import {Echelon} from "src/app/controler/model/echelon.model";
import {EntiteAdministratif} from "src/app/controler/model/entite-administratif.model";
import {AlertMessage} from "src/app/view/layouts/AlertMessage/alert-message.component";
import {EmployeeService} from "src/app/controler/service/employee.service";
import {EchelonService} from "src/app/controler/service/echelon.service";
import {EntiteAdministratifService} from "src/app/controler/service/entite-administratif.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Employee} from "src/app/controler/model/employee.model";
import {AppComponent} from "src/app/app.component";
import {about, employeesLink} from "src/app/app-routing.module";

@Component({
  selector: 'app-employees-edit',
  templateUrl: './employees-edit.component.html',
  styleUrls: ['./employees-edit.component.scss']
})
export class EmployeesEditComponent implements OnInit{
  private _employeeCin!: string;
  private _employeeEchelon = {} as Echelon;
  private _employeeEntite = {} as EntiteAdministratif;

  // attrs for notValid failed
  cinNotValid!: boolean;
  echelonNotValid!: boolean;
  entiteNotValid!: boolean;

  private prevPage!: string

  constructor(
    private employeeService: EmployeeService,
    private echelonService: EchelonService,
    private entiteService: EntiteAdministratifService,
    private appComponent: AppComponent,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.findEchelons();
    this.findEntites();

    this.route.paramMap.subscribe(
      params => {
        this.employeeCin = params.get('cin') as string;
        this.findByCin(this.employeeCin);
      }
    )

    this.prevPage = history.state.prevUrl;
  }

  public update(cin: string): void {
    // set echelon & entite to backend
    this.employee.echelon = this.employeeEchelon;
    this.employee.entiteAdministratif = this.employeeEntite;

    this.employeeService.update(cin)
      .subscribe(data => {
        // @ts-ignore
        let alertMessageData = this.employeeService.employeeUpdateResponses[data];

        if (data == 1) {
          let alertMessage = new AlertMessage(true,'s', alertMessageData.message);
          this.redirect(alertMessage);
        }
        else {
          let alertMessage = new AlertMessage(true,'e', alertMessageData.message);
          this.showAlertMessage(alertMessage)
          // @ts-ignore
          this[alertMessageData.failed + 'NotValid'] = true;
        }
      })
  }

  public findByCin(cin: string): void {
    this.employeeService.findByCin(cin).subscribe(
      data => {
        if (data == null) {
          let errorMessage = 'there is no backend with CIN: ' + this.employeeCin;
          let alertMessage = new AlertMessage(true, 'w', errorMessage);
          this.router.navigate([employeesLink], {state: {...alertMessage}}).then()
        } else {
          this.employee = data
          this.employeeEchelon = this.employee.echelon;
          this.employeeEntite = this.employee.entiteAdministratif;
        }
      })
  }

  public findEchelons(): void {
    this.echelonService.findAll().subscribe(
      data => {
        this.echelons = data;
      }
    );
  }

  public findEntites(): void {
    this.entiteService.findAll().subscribe(
      data => {
        this.entites = data;
      }
    );
  }

  redirect(data: {}): void {
    if (this.prevPage.includes('about')) {
      this.prevPage = this.prevPage.replace(this.employeeCin,this.employee.cin)
      this.router.navigate(
        [employeesLink  +'/' + about, this.employee.cin],
        {state: {...data}}).then();
    } else {
      this.router.navigate([this.prevPage], {state: {...data}}).then();
    }
  }


  unsetNoValids(failed: string): void {
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

  get employeeCin(): string {
    return this._employeeCin;
  }

  set employeeCin(value: string) {
    this._employeeCin = value;
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
}
