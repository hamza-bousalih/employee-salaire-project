import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {AlertMessageInterfaceComponent} from "./view/layouts/alert-message-interface/alert-message-interface.component";
import {AlertMessage} from "./view/layouts/AlertMessage/alert-message.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends AlertMessageInterfaceComponent{
  title = 'Employee Manager';

  @ViewChild('alertMessageContainer', {read: ViewContainerRef}) override alertMessageContainer!: ViewContainerRef;

  public showAlertMessage(alert: AlertMessage) {
    this.createAlertMessage(alert)
  }
}
