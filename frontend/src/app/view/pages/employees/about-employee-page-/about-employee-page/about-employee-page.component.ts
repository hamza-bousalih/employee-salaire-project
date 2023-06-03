import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {AppComponent} from "src/app/app.component";
import {
  EmployeeSalaryCalcComponent
} from "src/app/view/employees/employee-view/employee-salary-calc/employee-salary-calc.component";

@Component({
  selector: 'app-about-backend-page',
  templateUrl: './about-employee-page.component.html',
  styleUrls: ['./about-employee-page.component.scss']
})
export class AboutEmployeePageComponent implements OnInit {
  salaryMonth!: Date;
  @ViewChild('calcSalaryBox', {read: ViewContainerRef}) calcSalaryBox!: ViewContainerRef;
  calcSalaryBoxRef: any;

  constructor(
    private appComponent: AppComponent,
    private resolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    this.appComponent.getAlertMessageDate();
  }

  public showCalcSalaryBox(month: Date, cin: string) {
    if (this.calcSalaryBox) {
      this.calcSalaryBox.clear();

      const componentFactory = this.resolver.resolveComponentFactory(EmployeeSalaryCalcComponent);
      this.calcSalaryBoxRef = this.calcSalaryBox.createComponent(componentFactory);

      this.calcSalaryBoxRef.instance.salaryMonth = month;
      this.calcSalaryBoxRef.instance.employeeCin = cin;
    }
  }

  public hideCalcSalaryBox() {
    if (this.calcSalaryBoxRef) {
      this.calcSalaryBoxRef.destroy();
      this.calcSalaryBoxRef = null;
    }
  }
}
