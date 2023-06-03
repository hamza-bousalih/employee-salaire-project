import {Component} from '@angular/core';
import {MandatService} from "src/app/controler/service/mandat.service";
import {AlertMessage} from "src/app/view/layouts/AlertMessage/alert-message.component";
import {EmployeeMandatsComponent} from "src/app/view/employees/employee-view/employee-mandats/employee-mandats.component";
import {AppComponent} from "src/app/app.component";

@Component({
  selector: 'app-mandat-delete',
  templateUrl: './mandat-delete.component.html',
  styleUrls: ['./mandat-delete.component.scss']
})
export class MandatDeleteComponent {
  targetedCode!: string;
  mandatIndex!: number;
  targetedResp!: string;

  constructor(
    private mandatService: MandatService,
    private employeeMandats: EmployeeMandatsComponent,
    private appComponent: AppComponent) {}

  public delete(code: string, index: number): void {
    this.hideAlertMessage();
    this.mandatService.delete(code).subscribe(
      data => {
        if (data > 0) {
          let alertMessage =
            new AlertMessage(true,'s',
              `the Responsibility has been deleted!` )
          this.mandats.splice(index,1)
          this.showAlertMessage(alertMessage);
          this.hideBox();
        } else {
          let alertMessage = new AlertMessage(true, 'w', 'no Responsibility deleted');
          this.hideBox();
          this.showAlertMessage(alertMessage);
        }
      }
    )
  }

  public hideBox() {
    this.employeeMandats.hideDeleteBox();
  }

  public showAlertMessage(alert: AlertMessage) {
    this.appComponent.showAlertMessage(alert);
  }

  public hideAlertMessage() {
    this.appComponent.hideAlertMessage();
  }

  get mandats() {
    return this.mandatService.mandats;
  }
}
