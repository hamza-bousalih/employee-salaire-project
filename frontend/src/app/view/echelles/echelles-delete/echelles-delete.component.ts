import { Component } from '@angular/core';
import {AppComponent} from "src/app/app.component";
import {EchelleService} from "src/app/controler/service/echelle.service";
import {AlertMessage} from "src/app/view/layouts/AlertMessage/alert-message.component";
import {EchellePageComponent} from "src/app/view/pages/echelons/echelles/echelle-page/echelle-page.component";

@Component({
  selector: 'app-echelles-delete',
  templateUrl: './echelles-delete.component.html',
  styleUrls: ['./echelles-delete.component.scss']
})
export class EchellesDeleteComponent {
  code!: string;
  libelle!: string;
  index!: number;

  constructor(
    private appComponent: AppComponent,
    private echellesPage: EchellePageComponent,
    private echelleService: EchelleService ) {}

  public delete(code: string,index: number): void {
    this.hideAlertMessage();

    this.echelleService.delete(code).subscribe(
      data => {
        if (data > 0) {
          let alert =
            new AlertMessage(true,'s',
              'the echelle deleted successfully!')
          this.echelleService.echelles.splice(index,1);
          this.showAlertMessage(alert)
          this.destroy();
        } else {
          let alert =
            new AlertMessage(true, 'w', 'no echelle deleted!');
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
    this.echellesPage.destroyDeleteBox();
  }

}
