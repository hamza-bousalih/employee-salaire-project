import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Grade} from "src/app/controler/model/grade.model";
import {EchelleService} from "src/app/controler/service/echelle.service";
import {GradeService} from "src/app/controler/service/grade.service";
import {AppComponent} from "src/app/app.component";
import {Echelle} from "src/app/controler/model/echelle.model";
import {AlertMessage} from "src/app/view/layouts/AlertMessage/alert-message.component";
import {EchellePageComponent} from "src/app/view/pages/echelons/echelles/echelle-page/echelle-page.component";

@Component({
  selector: 'app-echelles-edit',
  templateUrl: './echelles-edit.component.html',
  styleUrls: ['./echelles-edit.component.scss']
})
export class EchellesEditComponent implements OnInit{
  respGrade = {} as Grade;
  grades = [] as Grade[];

  respCode!: string;

  // attrs for notValid failed
  libelleNotValid!: boolean;
  gradeNotValid!: boolean;

  constructor(
    private echelleService: EchelleService,
    private gradeService: GradeService,
    private echellePage: EchellePageComponent,
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

    this.findAllGrades();
  }

  public update(): void {
    this.echelle.grade = this.respGrade;

    this.echelleService.update().subscribe(data => {
      // @ts-ignore
      let alertMessageData = this.echelleService.updateResponse[data];

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
      this.grades = data;
      this.respGrade = data[0];
    })
  }

  private findByCode(code: string) {
    this.echelleService.findByCode(code).subscribe(
      data => {
        if (data != null) {
          this.echelle = data
        } else {
          let alert = new AlertMessage(true, 'w', 'No Echelle Found');
          this.redirect(alert);
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
