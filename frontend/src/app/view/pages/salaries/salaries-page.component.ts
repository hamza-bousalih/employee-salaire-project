import {Component, ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
import {NavigationBarComponent} from "src/app/view/layouts/navigation-bar/navigation-bar.component";
import {SalaryCalcComponent} from "src/app/view/salaries/salary-calc/salary-calc.component";
import {SalarySearchComponent} from "src/app/view/salaries/salary-search/salary-search.component";


@Component({
  selector: 'app-salaries',
  templateUrl: './salaries-page.component.html',
  styleUrls: ['./salaries-page.component.scss']
})
export class SalariesPageComponent extends NavigationBarComponent{
  private _salaryMonth!: Date;

  @ViewChild('calcSalaryBox', {read: ViewContainerRef}) calcSalaryBox!: ViewContainerRef;
  calcSalaryBoxRef: any;

  @ViewChild('searchSalaryBox', {read: ViewContainerRef}) searchSalaryBox!: ViewContainerRef;
  searchSalaryBoxRef: any;

  constructor(private resolver: ComponentFactoryResolver) {super()}

  public showCalcSalaryBox(month: Date) {
    if (this.calcSalaryBox) {
      this.calcSalaryBox.clear();

      const componentFactory = this.resolver.resolveComponentFactory(SalaryCalcComponent);
      this.calcSalaryBoxRef = this.calcSalaryBox.createComponent(componentFactory);

      this.calcSalaryBoxRef.instance.salaryMonth = month;
    }
  }

  public showSearchSalaryBox(month: Date) {
    if (this.searchSalaryBox) {
      this.searchSalaryBox.clear();

      const componentFactory = this.resolver.resolveComponentFactory(SalarySearchComponent);
      this.searchSalaryBoxRef = this.searchSalaryBox.createComponent(componentFactory);

      this.searchSalaryBoxRef.instance.salaryMonth = month;
    }
  }


  public hideCalcSalaryBox() {
    if (this.calcSalaryBoxRef) {
      this.calcSalaryBoxRef.destroy();
      this.calcSalaryBoxRef = null;
    }
  }
  public hideSearchSalaryBox() {
    if (this.searchSalaryBoxRef) {
      this.searchSalaryBoxRef.destroy();
      this.searchSalaryBoxRef = null;
    }
  }

  get salaryMonth(): Date {
    if (this._salaryMonth == null)
      this._salaryMonth = new Date()
    return this._salaryMonth;
  }

  set salaryMonth(value: Date) {
    this._salaryMonth = value;
  }
}
