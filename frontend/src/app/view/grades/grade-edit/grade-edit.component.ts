import {Component, OnInit} from '@angular/core';
import {GradeService} from "src/app/controler/service/grade.service";
import {AppComponent} from "src/app/app.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertMessage} from "src/app/view/layouts/AlertMessage/alert-message.component";
import {Grade} from "src/app/controler/model/grade.model";

@Component({
  selector: 'app-grade-edit',
  templateUrl: './grade-edit.component.html',
  styleUrls: ['./grade-edit.component.scss']
})
export class GradeEditComponent implements OnInit{
  code!: string;

  // attrs for notValid failed
  libelleNotValid!: boolean;

  constructor(
    private gradeService: GradeService,
    private appComponent: AppComponent,
    private router: Router,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.code = params.get('code') as string;
        this.findByCode(this.code);
      }
    )
  }

  public update(): void {
    this.gradeService.update().subscribe(data => {
      // @ts-ignore
      let alertMessageData = this.gradeService.updateResponses[data];
      if (data == 1) {
        let alert = new AlertMessage(true, 's', alertMessageData.message);
        this.redirect(alert)
      } else {
        let alert = new AlertMessage(true, 'e', alertMessageData.message);
        this.showAlertMessage(alert);
        // @ts-ignore
        this[alertMessageData.failed + 'NotValid'] = true;
      }
    })
  }

  private findByCode(code: string) {
    this.gradeService.findByCode(code).subscribe(
      data => {
        if (data != null) {
          this.grade = data
        } else {
          let alert = new AlertMessage(true, 'w', 'No grade Found!');
          this.redirect(alert);
        }
      })
  }

  redirect(data: {}): void {
    this.router.navigate(['/echelons/grades'], {state: {...data}}).then();
  }

  noValidToggle(failed: string): void {
    let failedValidate = failed + 'NotValid';
    // @ts-ignore
    this[failedValidate] = this.grade[failed as keyof Employee] == '';
  }

  public showAlertMessage(alert: AlertMessage) {
    this.appComponent.showAlertMessage(alert);
  }

  public hideAlertMessage() {
    this.appComponent.hideAlertMessage();
  }


  get grade(): Grade {
    return this.gradeService.grade;
  }

  set grade(value: Grade) {
    this.gradeService.grade = value;
  }
}
