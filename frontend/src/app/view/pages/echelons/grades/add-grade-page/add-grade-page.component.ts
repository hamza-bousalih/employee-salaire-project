import {Component, OnInit} from '@angular/core';
import {AppComponent} from "src/app/app.component";

@Component({
  selector: 'app-add-grade-page',
  templateUrl: './add-grade-page.component.html',
  styleUrls: ['./add-grade-page.component.scss']
})
export class AddGradePageComponent implements OnInit {
  constructor(private appComponent: AppComponent) {
  }
  ngOnInit(): void {
    this.appComponent.getAlertMessageDate();
  }
}
