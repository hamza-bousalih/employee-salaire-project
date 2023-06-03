import {Component, OnInit} from '@angular/core';
import {ZeroFound} from "src/app/view/layouts/zero-found";
import {EchelonService} from "src/app/controler/service/echelon.service";
import {Echelon} from "src/app/controler/model/echelon.model";
import {EchelonsPageComponent} from "src/app/view/pages/echelons/echelons-page/echelons-page.component";
import {AppComponent} from "src/app/app.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-echelons-list',
  templateUrl: './echelons-list.component.html',
  styleUrls: ['./echelons-list.component.scss']
})
export class EchelonsListComponent extends ZeroFound implements OnInit{

  constructor(
    private echelonService: EchelonService,
    private echelonsPage: EchelonsPageComponent,
    private appComponent: AppComponent,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.findAll();
  }

  public findAll() {
    this.echelonService.findAll().subscribe(data => this.echelons = data)
  }


  public showDeleteBox(code: string, libelle: string, index: number) {
    this.echelonsPage.showDeleteBox(code,libelle,index)
  }

  public destroyDeleteBox() {
    this.echelonsPage.destroyDeleteBox();
  }

  public redirectTo(path: string,cin: string) {
    this.appComponent.hideAlertMessage();
    this.router.navigate([path, cin],
      {
        state: {prevUrl: this.router.url},
        relativeTo: this.route
      }).then()
  }




  get echelon(): Echelon {
    return this.echelonService.echelon;
  }

  set echelon(value: Echelon) {
    this.echelonService.echelon = value;
  }

  get echelons(): Echelon[] {
    return this.echelonService.echelons;
  }

  set echelons(value: Echelon[]) {
    this.echelonService.echelons = value;
  }

}
