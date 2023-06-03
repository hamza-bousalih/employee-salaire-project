import {Component, OnInit} from '@angular/core';
import {NavigationBarComponent, NavigationItem}
  from "src/app/view/layouts/navigation-bar/navigation-bar.component";
import {add, archiveLink, salaryLink}
  from "src/app/app-routing.module";
import {AppComponent} from "src/app/app.component";

@Component({
  selector: 'app-employees-list-page',
  templateUrl: './employees-list-page.component.html',
  styleUrls: ['./employees-list-page.component.scss']
})
export class EmployeesListPageComponent extends NavigationBarComponent implements OnInit{
  // attrs for store navigation items
  navItem1  = new NavigationItem('add backend','fa fa-user-plus','green',add);
  navItem2  = new NavigationItem('Salary','fa fa-money-check-dollar ','purple',salaryLink);
  navItem3  = new NavigationItem('archive','fa fa-box-archive','gray',archiveLink);
  override navigationEls= [this.navItem1, this.navItem2, this.navItem3];

  constructor(private appComponent: AppComponent) {
    super();
  }

  ngOnInit(): void {
    this.appComponent.getAlertMessageDate();
  }
}
