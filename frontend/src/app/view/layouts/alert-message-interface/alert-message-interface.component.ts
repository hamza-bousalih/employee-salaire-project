import {Component, ComponentFactoryResolver, Injectable, ViewChild, ViewContainerRef} from '@angular/core';
import {AlertMessage, AlertMessageComponent} from "src/app/view/layouts/AlertMessage/alert-message.component";

@Component({
  selector: 'app-alert-message-interface',
  templateUrl: './alert-message-interface.component.html',
  styleUrls: ['./alert-message-interface.component.scss']
})
@Injectable({providedIn: "root"})
export class AlertMessageInterfaceComponent {
  @ViewChild('alertMessageContainer', {read: ViewContainerRef}) alertMessageContainer!: ViewContainerRef;
  alertMessageRef: any;

  public getAlertMessageDate() {
    if (history.state != null) {
      let alert = new AlertMessage(
          history.state.doAlert,
          history.state.status,
          history.state.message
        );

      alert.doAlert && this.createAlertMessage(alert)

      if (history.state.prevUrl == null)
        history.replaceState(null, '');
    }
  }

  constructor(private resolver: ComponentFactoryResolver) {}

  public createAlertMessage(alertMessage: AlertMessage) {
    if (this.alertMessageContainer) {
      this.alertMessageContainer.clear();

      const componentFactory = this.resolver.resolveComponentFactory(AlertMessageComponent);
      this.alertMessageRef = this.alertMessageContainer.createComponent(componentFactory);

      this.alertMessageRef.instance.status = alertMessage.status;
      this.alertMessageRef.instance.message = alertMessage.message;
      this.alertMessageRef.instance.parentComponent = parent;
    }
  }

  public hideAlertMessage() {
    if (this.alertMessageRef) {
      this.alertMessageRef.destroy();
      this.alertMessageRef = null;
    }
  }
}

