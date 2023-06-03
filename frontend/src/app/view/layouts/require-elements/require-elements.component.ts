import {Component, Injectable} from '@angular/core';

@Component({
  selector: 'app-require-elements',
  templateUrl: './require-elements.component.html',
  styleUrls: ['./require-elements.component.scss']
})

@Injectable({
  providedIn: 'root'
})
export class RequireElementsComponent {
  requireElements = [] as RequireElement[];
}

export class RequireElement {
  link!: string;
  libelle!: string;


  constructor(link: string, libelle: string) {
    this.link = link;
    this.libelle = libelle;
  }
}
