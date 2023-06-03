import {Component, OnInit} from '@angular/core';
import {Employee} from "src/app/controler/model/employee.model";
import {Echelon} from "src/app/controler/model/echelon.model";
import {ResponsibilityService} from "src/app/controler/service/responsibility.service";
import {EchelonService} from "src/app/controler/service/echelon.service";
import {AppComponent} from "src/app/app.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Responsibility} from "src/app/controler/model/responsibility.model";
import {AlertMessage} from "src/app/view/layouts/AlertMessage/alert-message.component";
import {responsibilitiesLink} from "src/app/app-routing.module";

@Component({
  selector: 'app-responsibilities-edit',
  templateUrl: './responsibilities-edit.component.html',
  styleUrls: ['./responsibilities-edit.component.scss']
})
export class ResponsibilitiesEditComponent implements OnInit {
  respEchelon = {} as Echelon;
  echelons = [] as Echelon[];

  respCode!: string;

  // attrs for notValid failed
  libelleNotValid!: boolean;
  echelonNotValid!: boolean;
  primeNotValid!: boolean;

  constructor(
    private responsibilityService: ResponsibilityService,
    private echelonService: EchelonService,
    private appComponent: AppComponent,
    private router: Router,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
    params => {
        this.respCode = params.get('code') as string;
        this.findByCode(this.respCode);
      }
    )

    this.findAllEchelons();
  }

  public update(): void {
    this.responsibility.echelon = this.respEchelon;

    this.responsibilityService.update().subscribe(data => {
      // @ts-ignore
      let alertMessageData = this.responsibilityService.updateResponse[data];

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
      this.echelons = data;
      this.respEchelon = data[0];
    })
  }

  private findByCode(code: string) {
    this.responsibilityService.findByCode(code).subscribe(
      data => this.responsibility = data)
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
