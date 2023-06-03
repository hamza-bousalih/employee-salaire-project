import { Component } from '@angular/core';
import {AppComponent} from "src/app/app.component";
import {AlertMessage} from "src/app/view/layouts/AlertMessage/alert-message.component";
import {EchelonsPageComponent} from "src/app/view/pages/echelons/echelons-page/echelons-page.component";
import {EchelonService} from "src/app/controler/service/echelon.service";

@Component({
  selector: 'app-echelon-delete',
  templateUrl: './echelon-delete.component.html',
  styleUrls: ['./echelon-delete.component.scss']
})
export class EchelonDeleteComponent {
  echelonCode!: string;
  echelonLibelle!: string;
  echelonIndex!: number;

  constructor(
    private appComponent: AppComponent,
    private echelonsPage: EchelonsPageComponent,
    private echelonService: EchelonService ) {}

  public delete(): void {
    this.hideAlertMessage();

    this.echelonService.delete(this.echelonCode).subscribe(
      data => {
        if (data > 0) {
          let alert =
            new AlertMessage(true,'s',
              'the Echelon deleted successfully!')
          this.echelonService.echelons.splice(this.echelonIndex,1);
          this.showAlertMessage(alert)
          this.destroy();
        } else {
          let alert =
            new AlertMessage(true, 'w', 'no Echelon deleted!');
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
    this.echelonsPage.destroyDeleteBox();
  }
}
