import { Component } from '@angular/core';
import {echelonsLink, employeesLink, entitesLink, responsibilitiesLink}
  from "src/app/app-routing.module";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

navItems = [
  {libelle: 'Employees', link: employeesLink},
  {libelle: 'Echelons', link: echelonsLink},
  {libelle: 'Responsibilities', link: responsibilitiesLink},
  {libelle: 'Entite Administartifs', link: entitesLink}
]

showNavbar = false;
constructor() {}

navbarToggle = ()  => this.showNavbar = !this.showNavbar;
}
