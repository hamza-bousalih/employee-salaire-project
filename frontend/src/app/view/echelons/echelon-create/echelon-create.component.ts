import {Component, OnInit} from '@angular/core';
import {Echelon} from "src/app/controler/model/echelon.model";
import {EchelonService} from "src/app/controler/service/echelon.service";
import {AppComponent} from "src/app/app.component";
import {Router} from "@angular/router";
import {AlertMessage} from "src/app/view/layouts/AlertMessage/alert-message.component";
import {Employee} from "src/app/controler/model/employee.model";
import {Echelle} from "src/app/controler/model/echelle.model";
import {EchelleService} from "src/app/controler/service/echelle.service";
import {RequireElement, RequireElementsComponent} from "src/app/view/layouts/require-elements/require-elements.component";

@Component({
  selector: 'app-echelon-create',
  templateUrl: './echelon-create.component.html',
  styleUrls: ['./echelon-create.component.scss']
})
export class EchelonCreateComponent extends RequireElementsComponent implements OnInit {
  echelles = [] as Echelle[];
  echelle = {} as Echelle;
  echelons = [] as Echelon[];

  prevEchelon = {} as Echelon;
  nextEchelon = {} as Echelon;

  // attrs for notValid failed
  libelleNotValid!: boolean;
  echelleNotValid!: boolean;
  primeNotValid!: boolean;
  delaiNotValid!: boolean;
  nextEchelonNotValid!: boolean;
  prevEchelonNotValid!: boolean;

  constructor(
    private echelonService: EchelonService,
    private echelleService: EchelleService,
    private appComponent: AppComponent,
    private router: Router){super()}

  ngOnInit(): void {
    this.echelon = new Echelon();
    this.findAllEchelles();
    this.findAllEchelons();
  }

  public save(): void {
    this.echelon.echelle = this.echelle;
    this.echelon.prevEchelon = this.prevEchelon;
    this.echelon.nextEchelon = this.nextEchelon;

    this.echelonService.save().subscribe(data => {
      // @ts-ignore
      let alertMessageData = this.echelonService.saveResponse[data];

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

  public findAllEchelles(): void {
    this.echelleService.findAll().subscribe(data => {
      if (data.length > 0) {
        this.echelles = data;
        this.echelle = data[0];
      } else {
        this.requireElements.push(new RequireElement('/echelons/echelles/add','add new echelle'))
      }
    })
  }

  public findAllEchelons(): void {
    this.echelonService.findAll().subscribe(data => {
      this.echelons = data;
    })
  }

  redirect(data: {}): void {
    this.router.navigate(['/echelons'], {state: {...data}}).then();
  }

  noValidToggle(failed: string): void {
    let failedValidate = failed + 'NotValid';
    // @ts-ignore
    this[failedValidate] = this.echelon[failed as keyof Employee] == '';
  }


  get echelon(): Echelon {
    return this.echelonService.echelon;
  }

  set echelon(value: Echelon) {
    this.echelonService.echelon = value;
  }

  public showAlertMessage(alert: AlertMessage) {
    this.appComponent.showAlertMessage(alert);
  }

  public hideAlertMessage() {
    this.appComponent.hideAlertMessage();
  }
}
