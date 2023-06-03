import { Component } from '@angular/core';
import {AppComponent} from "src/app/app.component";
import {AlertMessage} from "src/app/view/layouts/AlertMessage/alert-message.component";
import {
  ResponsibilitiesPageComponent
} from "src/app/view/pages/responsibilities/responsibilities-page/responsibilities-page.component";
import {ResponsibilityService} from "src/app/controler/service/responsibility.service";

@Component({
  selector: 'app-responsibilities-delete',
  templateUrl: './responsibilities-delete.component.html',
  styleUrls: ['./responsibilities-delete.component.scss']
})
export class ResponsibilitiesDeleteComponent {
  respCode!: string;
  respLibelle!: string;
  respIndex!: number;

  constructor(
    private appComponent: AppComponent,
    private respPage: ResponsibilitiesPageComponent,
    private respService: ResponsibilityService ) {}

  public delete(cin: string,index: number): void {
    this.hideAlertMessage();

    this.respService.delete(cin).subscribe(
      data => {
        if (data > 0) {
          let alert =
            new AlertMessage(true,'s',
              'the responsibility deleted successfully!')
          this.respService.responsibilities.splice(index,1);
          this.showAlertMessage(alert)
          this.destroy();
        } else {
          let alert =
            new AlertMessage(true, 'w', 'no responsibility deleted!');
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
    this.respPage.destroyDeleteBox();
  }
}
