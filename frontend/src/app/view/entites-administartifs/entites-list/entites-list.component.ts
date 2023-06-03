import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ZeroFound} from "src/app/view/layouts/zero-found";
import {add, edit} from "src/app/app-routing.module";
import {AppComponent} from "src/app/app.component";
import {ActivatedRoute, Router} from "@angular/router";
import {EntiteAdministratifService} from "src/app/controler/service/entite-administratif.service";
import {EntiteAdministratif} from "src/app/controler/model/entite-administratif.model";
import {EntitesPageComponent} from "src/app/view/pages/entites-administartifs/entites-page/entites-page.component";

@Component({
  selector: 'app-entites-list',
  templateUrl: './entites-list.component.html',
  styleUrls: ['./entites-list.component.scss']
})
export class EntitesListComponent extends ZeroFound implements OnInit{
  @ViewChild('deleteContainer', {read: ViewContainerRef}) deleteContainer!: ViewContainerRef;
  deleteComponentRef: any;

  addPage = add;
  editPage = edit;

  constructor(
    private entiteService: EntiteAdministratifService,
    private appComponent: AppComponent,
    private entitesPage: EntitesPageComponent,
    private router: Router,
    private route: ActivatedRoute) {super();}

  ngOnInit(): void {
    this.findAll();
    this.notFoundEmoji();
  }

  public findAll() {
    this.entiteService.findAll().subscribe(
      data => this.entites = data)
  }

  public redirectTo(path: string,cin: string) {
    this.appComponent.hideAlertMessage();
    this.router.navigate([path, cin],
      {
        state: {prevUrl: this.router.url},
        relativeTo: this.route
      }).then()
  }

  public showDeleteBox(code: string, libelle: string,index: number) {
    this.entitesPage.appendDeleteBoxComponent(code, libelle, index)
  }

  get entites(): EntiteAdministratif[] {
    return this.entiteService.entites;
  }

  set entites(value: EntiteAdministratif[]) {
    this.entiteService.entites = value;
  }
}
