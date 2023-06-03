import {Component, OnInit} from '@angular/core';
import {AppComponent} from "src/app/app.component";

@Component({
  selector: 'app-add-echelle-page',
  templateUrl: './add-echelle-page.component.html',
  styleUrls: ['./add-echelle-page.component.scss']
})
export class AddEchellePageComponent implements OnInit {
  constructor(private appComponent: AppComponent) {
  }
  ngOnInit(): void {
    this.appComponent.getAlertMessageDate();
  }
}
