import {Component} from '@angular/core';
import {AppComponent} from "src/app/app.component";
import {AlertMessage} from "src/app/view/layouts/AlertMessage/alert-message.component";
import {EntiteAdministratifService} from "src/app/controler/service/entite-administratif.service";
import {EntitesPageComponent} from "src/app/view/pages/entites-administartifs/entites-page/entites-page.component";

@Component({
  selector: 'app-entites-delete',
  templateUrl: './entites-delete.component.html',
  styleUrls: ['./entites-delete.component.scss']
})
export class EntitesDeleteComponent {
  entiteCode!: string;
  entiteLibelle!: string;
  entiteIndex!: number;

  force = false;

  constructor(
    private appComponent: AppComponent,
    private entitesPage: EntitesPageComponent,
    private entiteService: EntiteAdministratifService ) {}

  public delete(cin: string,force: boolean,index: number): void {
    this.hideAlertMessage();

    this.entiteService.delete(cin,force).subscribe(
      data => {
        if (data > 0) {
          let alert =
            new AlertMessage(true,'s',
              'the entite deleted successfully!')
          this.entiteService.entites.splice(index,1);
          this.showAlertMessage(alert)
          this.destroy();
        } else {
          // @ts-ignore
          let alertMessageData = this.entiteService.deleteResponses[data];
          let alert =
            new AlertMessage(true, 'w', alertMessageData.message);
          this.showAlertMessage(alert)
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
    this.entitesPage.destroyDeleteBox();
  }
}
