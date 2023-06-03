import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from 'src/app/app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from 'src/app/view/layouts/navbar/navbar.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import { EmployeesPageComponent } from 'src/app/view/pages/employees/employees-page/employees-page.component';
import {AppRoutingModule} from "src/app/app-routing.module";
import { EmployeesListComponent } from 'src/app/view/employees/employees-list/employees-list.component';
import { NavigationBarComponent } from 'src/app/view/layouts/navigation-bar/navigation-bar.component';
import { EmployeesCreateComponent } from 'src/app/view/employees/employees-create/employees-create.component';
import { EmployeesEditComponent } from 'src/app/view/employees/employees-edit/employees-edit.component';
import { AddEmployeePageComponent } from 'src/app/view/pages/employees/add-employee-page/add-employee-page.component';
import {AlertMessageComponent} from "src/app/view/layouts/AlertMessage/alert-message.component";
import {EmployeesListPageComponent} from "src/app/view/pages/employees/employees-list-page/employees-list-page.component";
import { EditEmployeePageComponent } from 'src/app/view/pages/employees/edit-employee-page/edit-employee-page.component';
import { SalariesPageComponent } from 'src/app/view/pages/salaries/salaries-page.component';
import { EmployeeDeleteComponent } from 'src/app/view/employees/employee-delete/employee-delete.component';
import { AlertMessageInterfaceComponent } from 'src/app/view/layouts/alert-message-interface/alert-message-interface.component';
import { SalaryListComponent } from 'src/app/view/salaries/salary-list/salary-list.component';
import { SalaryCalcComponent } from 'src/app/view/salaries/salary-calc/salary-calc.component';
import { SalarySearchComponent } from 'src/app/view/salaries/salary-search/salary-search.component';
import { EmployeeViewComponent } from 'src/app/view/employees/employee-view/employee-view.component';
import { AboutEmployeePageComponent } from 'src/app/view/pages/employees/about-employee-page-/about-employee-page/about-employee-page.component';
import { AboutEmployeeComponent } from 'src/app/view/pages/employees/about-employee-page-/about-employee/about-employee.component';
import { EmployeeMandatsComponent } from 'src/app/view/employees/employee-view/employee-mandats/employee-mandats.component';
import {MandatDeleteComponent} from "src/app/view/employees/employee-view/employee-mandats/mandat-delete/mandat-delete.component";
import { EmployeeSalariesComponent } from 'src/app/view/employees/employee-view/employee-salaries/employee-salaries.component';
import { EmployeeArchivesListComponent } from 'src/app/view/employeeArchives/employee-archives-list/employee-archives-list.component';
import { EmployeeArchiveDeleteComponent } from 'src/app/view/employeeArchives/employee-archive-delete/employee-archive-delete.component';
import { EmployeeArchivesPageComponent } from 'src/app/view/pages/employeeArchives/employee-archives-page/employee-archives-page.component';
import { EntitesListComponent } from 'src/app/view/entites-administartifs/entites-list/entites-list.component';
import { EntitesCreateComponent } from 'src/app/view/entites-administartifs/entites-create/entites-create.component';
import { EntitesEditComponent } from 'src/app/view/entites-administartifs/entites-edit/entites-edit.component';
import { EntitesPageComponent } from 'src/app/view/pages/entites-administartifs/entites-page/entites-page.component';
import { EntitesListPageComponent } from 'src/app/view/pages/entites-administartifs/entites-list-page/entites-list-page.component';
import { EditEntitesPageComponent } from 'src/app/view/pages/entites-administartifs/edit-entites-page/edit-entites-page.component';
import { AddEntitesPageComponent } from 'src/app/view/pages/entites-administartifs/add-entites-page/add-entites-page.component';
import { EntitesDeleteComponent } from 'src/app/view/entites-administartifs/entites-delete/entites-delete.component';
import { EmployeeSalaryCalcComponent } from 'src/app/view/employees/employee-view/employee-salary-calc/employee-salary-calc.component';
import { ResponsibilitiesListComponent } from 'src/app/view/responsibilities/responsibilities-list/responsibilities-list.component';
import { ResponsibilitiesCreateComponent } from 'src/app/view/responsibilities/responsibilities-create/responsibilities-create.component';
import { ResponsibilitiesEditComponent } from 'src/app/view/responsibilities/responsibilities-edit/responsibilities-edit.component';
import { ResponsibilitiesDeleteComponent } from 'src/app/view/responsibilities/responsibilities-delete/responsibilities-delete.component';
import { ResponsibilitiesPageComponent } from 'src/app/view/pages/responsibilities/responsibilities-page/responsibilities-page.component';
import { ResponsibilitiesListPageComponent } from 'src/app/view/pages/responsibilities/responsibilities-list-page/responsibilities-list-page.component';
import { EditResponsibilitiyPageComponent } from 'src/app/view/pages/responsibilities/edit-responsibilitiy-page/edit-responsibilitiy-page.component';
import { AddResponsibilityPageComponent } from 'src/app/view/pages/responsibilities/add-responsibilitiy-page/add-responsibility-page.component';
import { EmployeeSetResponsibilityComponent } from './view/employees/employee-view/employee-set-responsibility/employee-set-responsibility.component';
import {
  EmployeeSetResponsibilityPageComponent
} from "./view/pages/employees/about-employee-page-/employee-set-responsibility-page/employee-set-responsibility-page.component";
import { EditEmployeeResponsibilityComponent } from './view/employees/employee-view/edit-employee-responsibility/edit-employee-responsibility.component';
import {
  EditEmployeeResponsibilityPageComponent
} from "./view/pages/employees/about-employee-page-/edit-employee-responsibility-page/edit-employee-responsibility-page.component";
import { EchellesCreateComponent } from './view/echelles/echelles-create/echelles-create.component';
import { EchellesDeleteComponent } from './view/echelles/echelles-delete/echelles-delete.component';
import { EchellesEditComponent } from './view/echelles/echelles-edit/echelles-edit.component';
import { EchellesListComponent } from './view/echelles/echelles-list/echelles-list.component';
import { EchelonsListComponent } from './view/echelons/echelons-list/echelons-list.component';
import { EchelonCreateComponent } from './view/echelons/echelon-create/echelon-create.component';
import { EchelonDeleteComponent } from './view/echelons/echelon-delete/echelon-delete.component';
import { EchelonEditComponent } from './view/echelons/echelon-edit/echelon-edit.component';
import { EchelonsPageComponent } from './view/pages/echelons/echelons-page/echelons-page.component';
import { AddEchelonPageComponent } from './view/pages/echelons/add-echelon-page/add-echelon-page.component';
import { EditEchelonPageComponent } from './view/pages/echelons/edit-echelon-page/edit-echelon-page.component';
import { EchelonListPageComponent } from './view/pages/echelons/echelon-list-page/echelon-list-page.component';
import { EchellePageComponent } from './view/pages/echelons/echelles/echelle-page/echelle-page.component';
import { AddEchellePageComponent } from './view/pages/echelons/echelles/add-echelle-page/add-echelle-page.component';
import { EditEchellePageComponent } from './view/pages/echelons/echelles/edit-echelle-page/edit-echelle-page.component';
import { EchellesListPageComponent } from './view/pages/echelons/echelles/echelles-list-page/echelles-list-page.component';
import { GradesListComponent } from './view/grades/grades-list/grades-list.component';
import { GradeCreateComponent } from './view/grades/grade-create/grade-create.component';
import { GradeEditComponent } from './view/grades/grade-edit/grade-edit.component';
import { GradeDeleteComponent } from './view/grades/grade-delete/grade-delete.component';
import { GradesPageComponent } from './view/pages/echelons/grades/grades-page/grades-page.component';
import { AddGradePageComponent } from './view/pages/echelons/grades/add-grade-page/add-grade-page.component';
import { EditGradePageComponent } from './view/pages/echelons/grades/edit-grade-page/edit-grade-page.component';
import { GradeListPageComponent } from './view/pages/echelons/grades/grade-list-page/grade-list-page.component';
import { RequireElementsComponent } from './view/layouts/require-elements/require-elements.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EmployeesPageComponent,
    EmployeesListComponent,
    NavigationBarComponent,
    EmployeesListPageComponent,
    EmployeesCreateComponent,
    EmployeesEditComponent,
    AddEmployeePageComponent,
    AlertMessageComponent,
    EditEmployeePageComponent,
    SalariesPageComponent,
    EmployeeDeleteComponent,
    AlertMessageInterfaceComponent,
    SalaryListComponent,
    SalaryCalcComponent,
    SalarySearchComponent,
    EmployeeViewComponent,
    AboutEmployeePageComponent,
    AboutEmployeeComponent,
    EmployeeMandatsComponent,
    EmployeeMandatsComponent,
    MandatDeleteComponent,
    MandatDeleteComponent,
    EmployeeSalariesComponent,
    EmployeeArchivesListComponent,
    EmployeeArchiveDeleteComponent,
    EmployeeArchivesPageComponent,
    EntitesListComponent,
    EntitesCreateComponent,
    EntitesEditComponent,
    EntitesPageComponent,
    EntitesListPageComponent,
    EditEntitesPageComponent,
    AddEntitesPageComponent,
    EntitesDeleteComponent,
    EmployeeSalaryCalcComponent,
    ResponsibilitiesListComponent,
    ResponsibilitiesCreateComponent,
    ResponsibilitiesEditComponent,
    ResponsibilitiesDeleteComponent,
    ResponsibilitiesPageComponent,
    ResponsibilitiesListPageComponent,
    EditResponsibilitiyPageComponent,
    AddResponsibilityPageComponent,
    EmployeeSetResponsibilityComponent,
    EmployeeSetResponsibilityPageComponent,
    EditEmployeeResponsibilityComponent,
    EditEmployeeResponsibilityPageComponent,
    EchellesCreateComponent,
    EchellesDeleteComponent,
    EchellesEditComponent,
    EchellesListComponent,
    EchelonsListComponent,
    EchelonCreateComponent,
    EchelonDeleteComponent,
    EchelonEditComponent,
    EchelonsPageComponent,
    AddEchelonPageComponent,
    EditEchelonPageComponent,
    EchelonListPageComponent,
    EchellePageComponent,
    AddEchellePageComponent,
    EditEchellePageComponent,
    EchellesListPageComponent,
    GradesListComponent,
    GradeCreateComponent,
    GradeEditComponent,
    GradeDeleteComponent,
    GradesPageComponent,
    AddGradePageComponent,
    EditGradePageComponent,
    GradeListPageComponent,
    RequireElementsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterLinkActive,
    RouterLink,
    RouterOutlet
  ],
  providers: [
    AlertMessageInterfaceComponent,
    EmployeesListPageComponent,
    RequireElementsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
