import {Component, OnInit} from '@angular/core';
import {NavigationBarComponent, NavigationItem} from "src/app/view/layouts/navigation-bar/navigation-bar.component";
import {add} from "src/app/app-routing.module";
import {AppComponent} from "src/app/app.component";

@Component({
  selector: 'app-entites-list-page',
  templateUrl: './entites-list-page.component.html',
  styleUrls: ['./entites-list-page.component.scss']
})
export class EntitesListPageComponent extends NavigationBarComponent implements OnInit {
  navItem1 = new NavigationItem('add Entite Administratif', 'fa fa-users', 'green', add);
  override navigationEls = [this.navItem1];

  constructor(private appComponent: AppComponent) {
    super();
  }

  ngOnInit(): void {
    this.appComponent.getAlertMessageDate();
  }
}
