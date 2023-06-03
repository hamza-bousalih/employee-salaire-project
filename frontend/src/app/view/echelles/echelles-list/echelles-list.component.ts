import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EchelleService} from "src/app/controler/service/echelle.service";
import {AppComponent} from "src/app/app.component";
import {add, edit} from "src/app/app-routing.module";
import {ZeroFound} from "src/app/view/layouts/zero-found";
import {Echelle} from "src/app/controler/model/echelle.model";
import {EchellePageComponent} from "src/app/view/pages/echelons/echelles/echelle-page/echelle-page.component";

@Component({
  selector: 'app-echelles-list',
  templateUrl: './echelles-list.component.html',
  styleUrls: ['./echelles-list.component.scss']
})
export class EchellesListComponent extends ZeroFound implements OnInit{
  addPage = add;
  editPage = edit;

  constructor(
    private echelleService: EchelleService,
    private echellesPage: EchellePageComponent,
    private appComponent: AppComponent,
    private router: Router,
    private route: ActivatedRoute) {super();}

  ngOnInit(): void {
    this.findAll();
    this.notFoundEmoji();
  }

  public findAll(): void {
    this.echelleService.findAll().subscribe(
      data => this.echelles = data)
  }


  public redirectTo(path: string,code: string) {
    this.appComponent.hideAlertMessage();
    this.router.navigate([path, code],
      {
        state: {prevUrl: this.router.url},
        relativeTo: this.route
      }).then()
  }

  public showDeleteBox(code: string,libelle: string,index: number) {
    this.echellesPage.showDeleteBox(code,libelle,index)
  }

  get echelle(): Echelle {
    return this.echelleService.echelle;
  }

  set echelle(value: Echelle) {
    this.echelleService.echelle = value;
  }

  get echelles(): Echelle[] {
    return this.echelleService.echelles;
  }

  set echelles(value: Echelle[]) {
    this.echelleService.echelles = value;
  }

}
