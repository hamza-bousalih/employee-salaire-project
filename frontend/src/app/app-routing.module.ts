import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeesPageComponent} from "src/app/view/pages/employees/employees-page/employees-page.component";
import {AddEmployeePageComponent} from "src/app/view/pages/employees/add-employee-page/add-employee-page.component";
import {EmployeesListPageComponent} from "src/app/view/pages/employees/employees-list-page/employees-list-page.component";
import {EditEmployeePageComponent} from "src/app/view/pages/employees/edit-employee-page/edit-employee-page.component";
import {SalariesPageComponent} from "src/app/view/pages/salaries/salaries-page.component";
import {AboutEmployeePageComponent} from "src/app/view/pages/employees/about-employee-page-/about-employee-page/about-employee-page.component";
import {
  AboutEmployeeComponent
} from "src/app/view/pages/employees/about-employee-page-/about-employee/about-employee.component";
import {
  EmployeeArchivesPageComponent
} from "src/app/view/pages/employeeArchives/employee-archives-page/employee-archives-page.component";
import {EntitesPageComponent} from "src/app/view/pages/entites-administartifs/entites-page/entites-page.component";
import {
  EntitesListPageComponent
} from "src/app/view/pages/entites-administartifs/entites-list-page/entites-list-page.component";
import {AddEntitesPageComponent} from "src/app/view/pages/entites-administartifs/add-entites-page/add-entites-page.component";
import {
  EditEntitesPageComponent
} from "src/app/view/pages/entites-administartifs/edit-entites-page/edit-entites-page.component";
import {
  ResponsibilitiesPageComponent
} from "src/app/view/pages/responsibilities/responsibilities-page/responsibilities-page.component";
import {
  ResponsibilitiesListPageComponent
} from "src/app/view/pages/responsibilities/responsibilities-list-page/responsibilities-list-page.component";
import {
  AddResponsibilityPageComponent
} from "src/app/view/pages/responsibilities/add-responsibilitiy-page/add-responsibility-page.component";
import {
  EditResponsibilitiyPageComponent
} from "src/app/view/pages/responsibilities/edit-responsibilitiy-page/edit-responsibilitiy-page.component";
import {
  EmployeeSetResponsibilityPageComponent
} from "./view/pages/employees/about-employee-page-/employee-set-responsibility-page/employee-set-responsibility-page.component";
import {
  EditEmployeeResponsibilityPageComponent
} from "./view/pages/employees/about-employee-page-/edit-employee-responsibility-page/edit-employee-responsibility-page.component";
import {EchelonsPageComponent} from "./view/pages/echelons/echelons-page/echelons-page.component";
import {EchelonListPageComponent} from "./view/pages/echelons/echelon-list-page/echelon-list-page.component";
import {AddEchelonPageComponent} from "./view/pages/echelons/add-echelon-page/add-echelon-page.component";
import {EditEchelonPageComponent} from "./view/pages/echelons/edit-echelon-page/edit-echelon-page.component";
import {EchellePageComponent} from "./view/pages/echelons/echelles/echelle-page/echelle-page.component";
import {
  EchellesListPageComponent
} from "./view/pages/echelons/echelles/echelles-list-page/echelles-list-page.component";
import {AddEchellePageComponent} from "./view/pages/echelons/echelles/add-echelle-page/add-echelle-page.component";
import {EditEchellePageComponent} from "./view/pages/echelons/echelles/edit-echelle-page/edit-echelle-page.component";
import {GradesPageComponent} from "./view/pages/echelons/grades/grades-page/grades-page.component";
import {GradeListPageComponent} from "./view/pages/echelons/grades/grade-list-page/grade-list-page.component";
import {AddGradePageComponent} from "./view/pages/echelons/grades/add-grade-page/add-grade-page.component";
import {EditGradePageComponent} from "./view/pages/echelons/grades/edit-grade-page/edit-grade-page.component";

export let employeesLink = "employees";
export let add = "add";
export let edit = "edit";
export let about = "about";
export let setResponsibility = "set-responsibility";
export let editResponsibility = "edit-responsibility";
export let salaryLink = "salary";
export let archiveLink = "archive";

export let entitesLink = "entites-administartifs";

export let echelonsLink = "echelons";

export let responsibilitiesLink = "responsibilities";


const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: "employees"
  },
  {
    path: employeesLink,
    component: EmployeesPageComponent,
    title: 'Employee Manager',
    children: [
      {
        path: '',
        component: EmployeesListPageComponent
      },
      {
        path: add,
        component: AddEmployeePageComponent,
        title: 'Add Employee'
      },
      {
        path: edit + '/:cin',
        component: EditEmployeePageComponent,
        title: 'Edit Employee'
      },
      {
        path: about + '/:cin',
        component: AboutEmployeePageComponent,
        title: 'About Employee',
        children: [
          {
            path: '',
            component: AboutEmployeeComponent,
            title: 'About Employee'
          },
          {
            path: edit,
            component: EditEmployeePageComponent,
            title: 'Edit Employee'
          },
          {
            path: setResponsibility,
            component: EmployeeSetResponsibilityPageComponent,
            title: 'Add Employee Responsibility'
          },
          {
            path: editResponsibility + '/:code',
            component: EditEmployeeResponsibilityPageComponent,
            title: 'Edit Employee Responsibility'
          }
        ]
      },
      {
        path: salaryLink,
        component: SalariesPageComponent,
        title: 'Salaries'
      },
      {
        path: archiveLink,
        component: EmployeeArchivesPageComponent,
        title: 'Archives'
      },
    ]
  },
  {
    path: entitesLink,
    component: EntitesPageComponent,
    title: 'Entites Administartifs',
    children: [
      {
        path: '',
        component: EntitesListPageComponent
      },
      {
        path: add,
        component: AddEntitesPageComponent,
        title: 'Add Entite Administartif',
      },
      {
        path: edit + '/:code',
        component: EditEntitesPageComponent,
        title: 'Edit Entite Administartif',
      },
    ]
  },
  {
    path: responsibilitiesLink,
    component: ResponsibilitiesPageComponent,
    title: 'Responsibilities',
    children: [
      {
        path: '',
        component: ResponsibilitiesListPageComponent,
      },
      {
        path: add,
        component: AddResponsibilityPageComponent,
        title: 'Add Responsibility'
      },
      {
        path: edit + '/:code',
        component: EditResponsibilitiyPageComponent,
        title: 'Edit Responsibility'
      }
    ]
  },
  {
    path: echelonsLink,
    component: EchelonsPageComponent,
    title: 'Echelons',
    children: [
      {
        path: '',
        component: EchelonListPageComponent,
      },
      {
        path: 'add',
        component: AddEchelonPageComponent,
        title: 'Add Echelon'
      },
      {
        path: 'edit/:code',
        component: EditEchelonPageComponent,
        title: 'Edit Echelon'
      },
      {
        path: 'echelles',
        component: EchellePageComponent,
        title: 'Echelles',
        children: [
          {
            path: '',
            component: EchellesListPageComponent,
          },
          {
            path: 'add',
            component: AddEchellePageComponent,
            title: 'Add Echelon'
          },
          {
            path: 'edit/:code',
            component: EditEchellePageComponent,
            title: 'Edit Echelon'
          }
        ]
      },
      {
        path: 'grades',
        component: GradesPageComponent,
        title: 'Grades',
        children: [
          {
            path: '',
            component: GradeListPageComponent,
          },
          {
            path: 'add',
            component: AddGradePageComponent,
            title: 'Add Echelon'
          },
          {
            path: 'edit/:code',
            component: EditGradePageComponent,
            title: 'Edit Echelon'
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
