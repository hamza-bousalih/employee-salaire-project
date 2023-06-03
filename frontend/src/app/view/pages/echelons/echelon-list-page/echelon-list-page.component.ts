import {Component, OnInit} from '@angular/core';
import {NavigationBarComponent, NavigationItem} from "src/app/view/layouts/navigation-bar/navigation-bar.component";
import {add} from "src/app/app-routing.module";
import {AppComponent} from "src/app/app.component";

@Component({
  selector: 'app-echelon-list-page',
  templateUrl: './echelon-list-page.component.html',
  styleUrls: ['./echelon-list-page.component.scss']
})
export class EchelonListPageComponent extends NavigationBarComponent implements OnInit {
  navItem1 = new NavigationItem('add Echelon', '', 'green', add);
  navItem2 = new NavigationItem('Echelles', '', 'gray', 'echelles');
  navItem3 = new NavigationItem('Grades', '', 'gray', 'grades');
  override navigationEls = [this.navItem1,this.navItem2,this.navItem3];

  constructor(private appComponent: AppComponent) {super();}

  ngOnInit(): void {
    this.appComponent.getAlertMessageDate();
  }
}
