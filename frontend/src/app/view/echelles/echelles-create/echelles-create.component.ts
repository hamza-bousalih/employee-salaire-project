import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Grade} from "src/app/controler/model/grade.model";
import {EchelleService} from "src/app/controler/service/echelle.service";
import {GradeService} from "src/app/controler/service/grade.service";
import {AppComponent} from "src/app/app.component";
import {Echelle} from "src/app/controler/model/echelle.model";
import {AlertMessage} from "src/app/view/layouts/AlertMessage/alert-message.component";
import {RequireElement, RequireElementsComponent} from "src/app/view/layouts/require-elements/require-elements.component";

@Component({
  selector: 'app-echelles-create',
  templateUrl: './echelles-create.component.html',
  styleUrls: ['./echelles-create.component.scss']
})
export class EchellesCreateComponent extends RequireElementsComponent implements OnInit{
  respGrade= {} as Grade;
  grades = [] as Grade[];

  prevUrl!: string;

  // attrs for notValid failed
  libelleNotValid!: boolean;
  gradeNotValid!: boolean;

  constructor(
    private echelleService: EchelleService,
    private gradeService: GradeService,
    private appComponent: AppComponent,
    private router: Router){super()}

  ngOnInit(): void {
    this.echelle = new Echelle();
    this.findAllGrades();
  }

  public save(): void {
    this.echelle.grade = this.respGrade;

    this.echelleService.save().subscribe(data => {
      // @ts-ignore
      let alertMessageData = this.echelleService.saveResponse[data];

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

  public findAllGrades(): void {
    this.gradeService.findAll().subscribe(data => {
      if (data.length > 0) {
        this.grades = data;
        this.respGrade = data[0];
      } else {
        this.requireElements.push(new RequireElement('/echelons/grades/add','add new grade'))
      }
    })
  }

  redirect(data: {}): void {
    this.router.navigate(['/echelons/echelles'], {state: {...data}}).then();
  }

  noValidToggle(failed: string): void {
    let failedValidate = failed + 'NotValid';
    // @ts-ignore
    this[failedValidate] = this.echelle[failed as keyof Employee] == '';
  }

  get echelle (): Echelle {
    return this.echelleService.echelle;
  }

  set echelle (val: Echelle) {
    this.echelleService.echelle = val;
  }

  public showAlertMessage(alert: AlertMessage) {
    this.appComponent.showAlertMessage(alert);
  }

  public hideAlertMessage() {
    this.appComponent.hideAlertMessage();
  }
}
