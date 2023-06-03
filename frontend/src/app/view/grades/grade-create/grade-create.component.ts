import {Component, OnInit} from '@angular/core';
import {GradeService} from "src/app/controler/service/grade.service";
import {AppComponent} from "src/app/app.component";
import {Router} from "@angular/router";
import {AlertMessage} from "src/app/view/layouts/AlertMessage/alert-message.component";
import {Grade} from "src/app/controler/model/grade.model";

@Component({
  selector: 'app-grade-create',
  templateUrl: './grade-create.component.html',
  styleUrls: ['./grade-create.component.scss']
})
export class GradeCreateComponent implements OnInit{
  prevUrl!: string;
  // attrs for notValid failed
  libelleNotValid!: boolean;

  constructor(
    private gradeService: GradeService,
    private appComponent: AppComponent,
    private router: Router){}

  ngOnInit(): void {
    if (history.state?.prevUrl != null) this.prevUrl = history.state.prevUrl;
  }

  public save(): void {
    this.gradeService.save().subscribe(data => {
      // @ts-ignore
      let alertMessageData = this.gradeService.saveResponses[data];
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

  redirect(data: {}): void {
    if (this.prevUrl == null) this.prevUrl = '/echelons/grades';
    this.router.navigate([this.prevUrl], {state: {...data}}).then();
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
