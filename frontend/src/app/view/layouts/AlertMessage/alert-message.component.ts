import {Component, Input} from '@angular/core';
import {AppComponent} from "src/app/app.component";

@Component({
  selector: 'alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent {
  statusArray = {
    's': 'success',
    'e': 'error',
    'w': 'warning'
  }
  @Input() status!: string;
  @Input() message!: string;
  @Input() parentComponent!: string;

  constructor(private appComponent: AppComponent) {
  }

  public destroy() {
    this.appComponent.hideAlertMessage()
  }

  get class(): string {
    // @ts-ignore
    return this.statusArray[this.status];
  }
}

export class AlertMessage {
  status!: string;
  doAlert!: boolean;
  message!: string;

  constructor(doAlert: boolean, alertStatus: string, alertMessage: string) {
    this.status = alertStatus;
    this.doAlert = doAlert;
    this.message = alertMessage;
  }
}
