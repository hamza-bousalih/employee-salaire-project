import {Component, OnInit} from '@angular/core';
import {Employee} from "src/app/controler/model/employee.model";
import {EntiteAdministratifService} from "src/app/controler/service/entite-administratif.service";
import {EmployeeService} from "src/app/controler/service/employee.service";
import {AppComponent} from "src/app/app.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertMessage} from "src/app/view/layouts/AlertMessage/alert-message.component";
import {entitesLink} from "src/app/app-routing.module";
import {EntiteAdministratif} from "src/app/controler/model/entite-administratif.model";

@Component({
  selector: 'app-entites-edit',
  templateUrl: './entites-edit.component.html',
  styleUrls: ['./entites-edit.component.scss']
})
export class EntitesEditComponent implements OnInit{
  entiteChef = {} as Employee;
  employees = [] as Employee[];
  entiteCode!: string;

  // attrs for notValid failed
  libelleNotValid!: boolean;
  chefNotValid!: boolean;

  constructor(
    private entiteService: EntiteAdministratifService,
    private employeeService: EmployeeService,
    private appComponent: AppComponent,
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.entiteCode = params.get('code') as string;
        this.findByCode(this.entiteCode);
      }
    )

    this.findAllEmployees();
  }

  public update() {
    this.hideAlertMessage();

    this.entite.chef = this.entiteChef;
    this.entiteService.update().subscribe(
      data => {
        // @ts-ignore
        let alertData = this.entiteService.updateResponses[data];
        if (data == 1) {
          let alert = new AlertMessage(true, 's', alertData.message)
          this.redirect(alert);
        } else {
          let alert = new AlertMessage(true, 'e', alertData.message)
          this.showAlertMessage(alert)
          // @ts-ignore
          this[alertData.failed + 'NotValid'] = true;
        }
      }
    )
  }

  public findByCode(code: string): void {
    this.entiteService.findByCode(code).subscribe(
      data => {
        if (data != null) {
          this.entite = data;
          this.entiteChef = data.chef;
          if (this.entiteChef == null) this.entiteChef = new Employee();
        } else {
          let alert = new AlertMessage(true, 'w', 'Entite Administratif not found');
          this.redirect(alert)
        }
      }
    )
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
