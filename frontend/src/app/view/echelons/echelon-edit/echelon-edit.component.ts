import {Component, OnInit} from '@angular/core';
import {Echelle} from "src/app/controler/model/echelle.model";
import {Echelon} from "src/app/controler/model/echelon.model";
import {EchelonService} from "src/app/controler/service/echelon.service";
import {EchelleService} from "src/app/controler/service/echelle.service";
import {AppComponent} from "src/app/app.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertMessage} from "src/app/view/layouts/AlertMessage/alert-message.component";
import {Employee} from "src/app/controler/model/employee.model";

@Component({
  selector: 'app-echelon-edit',
  templateUrl: './echelon-edit.component.html',
  styleUrls: ['./echelon-edit.component.scss']
})
export class EchelonEditComponent implements OnInit {
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
    private router: Router,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    this.echelon = new Echelon();
    this.route.paramMap.subscribe(
      params => {
        let code = params.get('code') as string;
        console.log(code)
        this.findByCode(code);
      }
    )
  }

  public update(): void {
    this.echelon.echelle = this.echelle;
    this.echelon.prevEchelon = this.prevEchelon;
    this.echelon.nextEchelon = this.nextEchelon;

    this.echelonService.update().subscribe(data => {
      // @ts-ignore
      let alertMessageData = this.echelonService.updateResponse[data];

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

  public findByCode(code: string) {
    this.echelonService.findByCode(code).subscribe(
      data => {
        if (data != null) {
          this.echelon = data;
          this.echelle = this.echelon.echelle;

          if (this.echelon.nextEchelon != null)
            this.nextEchelon = this.echelon.nextEchelon;

          if (this.echelon.prevEchelon != null)
            this.prevEchelon = this.echelon.prevEchelon;

          this.findAllEchelles();
          this.findAllEchelons();

        } else {
          let alert = new AlertMessage(true,'w', 'No Echelon Found!');
          this.redirect(alert)
        }
      }
    )
  }

  public findAllEchelles(): void {
    this.echelleService.findAll().subscribe(data => {
      this.echelles = data
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
