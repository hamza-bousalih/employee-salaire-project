import { Component } from '@angular/core';
import {AppComponent} from "src/app/app.component";
import {AlertMessage} from "src/app/view/layouts/AlertMessage/alert-message.component";
import {GradesPageComponent} from "src/app/view/pages/echelons/grades/grades-page/grades-page.component";
import {GradeService} from "src/app/controler/service/grade.service";

@Component({
  selector: 'app-grade-delete',
  templateUrl: './grade-delete.component.html',
  styleUrls: ['./grade-delete.component.scss']
})
export class GradeDeleteComponent {
  code!: string;
  libelle!: string;
  index!: number;

  constructor(
    private appComponent: AppComponent,
    private gradesPage: GradesPageComponent,
    private gradeService: GradeService ) {}

  public delete(code: string,index: number): void {
    this.hideAlertMessage();

    this.gradeService.delete(code).subscribe(
      data => {
        if (data > 0) {
          let alert =
            new AlertMessage(true,'s',
              'the echelle deleted successfully!')
          this.gradeService.grades.splice(index,1);
          this.showAlertMessage(alert)
          this.destroy();
        } else {
          let alert =
            new AlertMessage(true, 'w', 'no grade deleted!');
          this.showAlertMessage(alert)
          this.destroy();
        }
      }
    )
  }

  public showAlertMessage(alert: AlertMessage) {
    this.appComponent.showAlertMessage(alert)
  }

  public hideAlertMessage(){
    this.appComponent.hideAlertMessage()
  }

  public destroy() {
    this.gradesPage.destroyDeleteBox();
  }
}
