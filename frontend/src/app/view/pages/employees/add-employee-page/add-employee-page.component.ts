import {Component, OnInit} from '@angular/core';
import {AppComponent} from "src/app/app.component";

@Component({
  selector: 'app-add-backend-page',
  templateUrl: './add-employee-page.component.html',
  styleUrls: ['./add-employee-page.component.scss']
})
export class AddEmployeePageComponent implements OnInit {
  constructor(private appComponent: AppComponent) {
  }
  ngOnInit(): void {
    this.appComponent.getAlertMessageDate();
  }
}
