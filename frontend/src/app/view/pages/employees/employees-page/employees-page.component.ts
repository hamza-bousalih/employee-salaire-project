import {Component, ComponentFactoryResolver, Injectable, ViewChild, ViewContainerRef} from '@angular/core';
import {EmployeeDeleteComponent} from "src/app/view/employees/employee-delete/employee-delete.component";

@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss']
})
@Injectable({providedIn: "root"})
export class EmployeesPageComponent {

  @ViewChild('deleteContainer', {read: ViewContainerRef}) deleteContainer!: ViewContainerRef;
  deleteComponentRef: any;

  constructor(private resolver: ComponentFactoryResolver) {}

public showDeleteBox(cin: string, index: number | null) {
  this.deleteContainer.clear()

  const componentFactory = this.resolver.resolveComponentFactory(EmployeeDeleteComponent);
  this.deleteComponentRef = this.deleteContainer.createComponent(componentFactory);

  this.deleteComponentRef.instance.wantToDelete = true;
  this.deleteComponentRef.instance.employeeCin = cin;
  this.deleteComponentRef.instance.employeeIndex = index;
}

public destroyDeleteBox() {
  if (this.deleteComponentRef) {
    this.deleteComponentRef.destroy();
    this.deleteComponentRef = null;
  }
}
}
