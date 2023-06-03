import {Component, OnInit} from '@angular/core';
import {NavigationBarComponent, NavigationItem} from "src/app/view/layouts/navigation-bar/navigation-bar.component";
import {AppComponent} from "src/app/app.component";

@Component({
  selector: 'app-grade-list-page',
  templateUrl: './grade-list-page.component.html',
  styleUrls: ['./grade-list-page.component.scss']
})
export class GradeListPageComponent extends NavigationBarComponent implements OnInit {
  navItem1 = new NavigationItem('add grade', '', 'green', 'add');
  override navigationEls = [this.navItem1];

  constructor(private appComponent: AppComponent) {super();}

  ngOnInit(): void {
    this.appComponent.getAlertMessageDate();
  }
}
