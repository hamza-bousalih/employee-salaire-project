import {Component, OnInit} from '@angular/core';
import {NavigationBarComponent, NavigationItem} from "src/app/view/layouts/navigation-bar/navigation-bar.component";
import {add} from "src/app/app-routing.module";
import {AppComponent} from "src/app/app.component";

@Component({
  selector: 'app-responsibilities-list-page',
  templateUrl: './responsibilities-list-page.component.html',
  styleUrls: ['./responsibilities-list-page.component.scss']
})
export class ResponsibilitiesListPageComponent extends NavigationBarComponent implements OnInit {
  navItem1 = new NavigationItem('add responsibility', 'fa fa-file-alt', 'green', add);
  override navigationEls = [this.navItem1];

  constructor(private appComponent: AppComponent) {super();}

  ngOnInit(): void {
    this.appComponent.getAlertMessageDate();
  }
}
