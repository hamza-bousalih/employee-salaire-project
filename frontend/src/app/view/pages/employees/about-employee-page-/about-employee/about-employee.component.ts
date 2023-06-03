import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {NavigationBarComponent} from "src/app/view/layouts/navigation-bar/navigation-bar.component";
import {edit, employeesLink, setResponsibility} from "src/app/app-routing.module";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeesPageComponent} from "src/app/view/pages/employees/employees-page/employees-page.component";
import {AboutEmployeePageComponent} from "src/app/view/pages/employees/about-employee-page-/about-employee-page/about-employee-page.component";

@Component({
  selector: 'app-about-backend',
  templateUrl: './about-employee.component.html',
  styleUrls: ['./about-employee.component.scss']
})
export class AboutEmployeeComponent extends NavigationBarComponent implements OnInit{
  employeeCin!: string;
  editEmployeePage = '/' + employeesLink + '/' + edit;
  setResponsibilityPage = setResponsibility;

  constructor(
    private employeesPage: EmployeesPageComponent,
    private aboutEmployeePage: AboutEmployeePageComponent,
    private route: ActivatedRoute,
    private router: Router) {super();}

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.employeeCin = params.get('cin') as string;
      }
    )
  }

  @ViewChild('deleteContainer', {read: ViewContainerRef}) deleteContainer!: ViewContainerRef;
  deleteComponentRef: any;

  public showDeleteEmployeeBox() {
    this.employeesPage.showDeleteBox(this.employeeCin,null)
  }

  public destroyDeleteBox() {
    if (this.deleteComponentRef) {
      this.deleteComponentRef.destroy();
      this.deleteComponentRef = null;
    }
  }

  public redirect(path: string, param: string | null) {
    if (param != null){
      this.router.navigate(
        [path,param],
        {state: {prevUrl: this.router.url}}
      ).then()
    } else {
      this.router.navigate(
        [path],
        {relativeTo: this.route,
          state: {prevUrl: this.router.url, cin: this.employeeCin}}
      ).then()
    }
  }

  public showCalcSalaryBox() {
    this.aboutEmployeePage.showCalcSalaryBox(new Date(),this.employeeCin);
  }

  public hideCalcSalaryBox() {
    this.aboutEmployeePage.hideCalcSalaryBox();
  }
}
