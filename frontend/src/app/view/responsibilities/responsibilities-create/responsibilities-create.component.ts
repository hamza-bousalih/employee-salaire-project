import {Component, OnInit} from '@angular/core';
import {Employee} from "src/app/controler/model/employee.model";
import {AppComponent} from "src/app/app.component";
import {Router} from "@angular/router";
import {AlertMessage} from "src/app/view/layouts/AlertMessage/alert-message.component";
import {responsibilitiesLink} from "src/app/app-routing.module";
import {Echelon} from "src/app/controler/model/echelon.model";
import {Responsibility} from "src/app/controler/model/responsibility.model";
import {ResponsibilityService} from "src/app/controler/service/responsibility.service";
import {EchelonService} from "src/app/controler/service/echelon.service";
import {RequireElement, RequireElementsComponent} from "src/app/view/layouts/require-elements/require-elements.component";

@Component({
  selector: 'app-responsibilities-create',
  templateUrl: './responsibilities-create.component.html',
  styleUrls: ['./responsibilities-create.component.scss']
})
export class ResponsibilitiesCreateComponent extends RequireElementsComponent implements OnInit {
  respEchelon = {} as Echelon;
  echelons = [] as Echelon[];

  // attrs for notValid failed
  libelleNotValid!: boolean;
  echelonNotValid!: boolean;
  primeNotValid!: boolean;

  constructor(
    private responsibilityService: ResponsibilityService,
    private echelonService: EchelonService,
    private appComponent: AppComponent,
    private router: Router){super()}

  ngOnInit(): void {
    this.responsibility = new Responsibility();
    this.findAllEchelons();
  }

  public save(): void {
    this.responsibility.echelon = this.respEchelon;

    this.responsibilityService.save().subscribe(data => {
      // @ts-ignore
      let alertMessageData = this.responsibilityService.saveResponse[data];

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

  public findAllEchelons(): void {
    this.echelonService.findAll().subscribe(data => {
      if (data.length > 0){
        this.echelons = data;
        this.respEchelon = data[0];
      } else {
        this.requireElements
          .push(new RequireElement('/echelons/add','add new echelon'))
      }
    })
  }

  redirect(data: {}): void {
    this.router.navigate(['/' + responsibilitiesLink], {state: {...data}}).then();
  }

  noValidToggle(failed: string): void {
    let failedValidate = failed + 'NotValid';
    // @ts-ignore
    this[failedValidate] = this.responsibility[failed as keyof Employee] == '';
  }

  get responsibility (): Responsibility {
    return this.responsibilityService.responsibility;
  }

  set responsibility (val: Responsibility) {
    this.responsibilityService.responsibility = val;
  }

  public showAlertMessage(alert: AlertMessage) {
    this.appComponent.showAlertMessage(alert);
  }

  public hideAlertMessage() {
    this.appComponent.hideAlertMessage();
  }
}
