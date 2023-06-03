import {Component, OnInit} from '@angular/core';
import {EntiteAdministratif} from "src/app/controler/model/entite-administratif.model";
import {EmployeeService} from "src/app/controler/service/employee.service";
import {EntiteAdministratifService} from "src/app/controler/service/entite-administratif.service";
import {Router} from "@angular/router";
import {Employee} from "src/app/controler/model/employee.model";
import {AlertMessage} from "src/app/view/layouts/AlertMessage/alert-message.component";
import {AppComponent} from "src/app/app.component";
import {entitesLink} from "src/app/app-routing.module";

@Component({
  selector: 'app-entites-create',
  templateUrl: './entites-create.component.html',
  styleUrls: ['./entites-create.component.scss']
})
export class EntitesCreateComponent implements OnInit{
  entiteChef = {} as Employee;
  employees = [] as Employee[];

  // attrs for notValid failed
  libelleNotValid!: boolean;
  chefNotValid!: boolean;

  constructor(
    private entiteService: EntiteAdministratifService,
    private employeeService: EmployeeService,
    private appComponent: AppComponent,
    private router: Router){}

  ngOnInit(): void {
    this.entite = new EntiteAdministratif();
    this.findAllEmployees();
  }

  public save(): void {
    this.entite.chef = this.entiteChef;

    this.entiteService.save().subscribe(data => {
      // @ts-ignore
      let alertMessageData = this.entiteService.saveResponses[data];

      if (data == 1) {
        let alert = new AlertMessage(true, 's', alertMessageData.message);
        this.redirect(alert)
      } else {
        let alert = new AlertMessage(true,'e', alertMessageData.message);
        this.showAlertMessage(alert);
        // @ts-ignore
        this[alertMessageData.failed + 'NotValid'] = true;
      }
    })
  }

  public findAllEmployees(): void {
    this.employeeService.findAll().subscribe(data => this.employees = data)
  }

  redirect(data: {}): void {
    this.router.navigate(['/' + entitesLink], {state: {...data}}).then();
  }

  noValidToggle(failed: string): void {
    let failedValidate = failed + 'NotValid';
    // @ts-ignore
    this[failedValidate] = this.entite[failed as keyof Employee] == '';
  }

  get entite (): EntiteAdministratif {
    return this.entiteService.entite;
  }

  set entite (val: EntiteAdministratif) {
    this.entiteService.entite = val;
  }

  public showAlertMessage(alert: AlertMessage) {
    this.appComponent.showAlertMessage(alert);
  }

  public hideAlertMessage() {
    this.appComponent.hideAlertMessage();
  }
}
