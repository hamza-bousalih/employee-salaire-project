import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  @Input() navigationEls!: NavigationItem[]; // array contains the navigation elements
  @Input() title!: string; // title of the page
  @Input() addActions!: boolean; // add actions Buttons to the navigation or not
  @Input() toNavigate = true; // add pages links to the navigation
  showNavigation = false;

  constructor() {
  }

  navigationToggle = () => this.showNavigation = !this.showNavigation;
}

export class NavigationItem {
  link!: string;
  color!: string;
  libelle!: string;
  icon!: string;

  constructor(libelle: string, icon: string, color: string, link: string) {
    this.libelle = libelle;
    this.icon = icon;
    this.color = color;
    this.link = link;
  }
}
