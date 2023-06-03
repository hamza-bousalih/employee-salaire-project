import {Component, OnInit} from '@angular/core';
import {ZeroFound} from "src/app/view/layouts/zero-found";
import {AppComponent} from "src/app/app.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Responsibility} from "src/app/controler/model/responsibility.model";
import {ResponsibilityService} from "src/app/controler/service/responsibility.service";
import {add, edit} from "src/app/app-routing.module";
import {
  ResponsibilitiesPageComponent
} from "src/app/view/pages/responsibilities/responsibilities-page/responsibilities-page.component";

@Component({
  selector: 'app-responsibilities-list',
  templateUrl: "./responsibilities-list.component.html",
  styleUrls: ['./responsibilities-list.component.scss']
})
export class ResponsibilitiesListComponent extends ZeroFound implements OnInit{

  addPage = add;
  editPage = edit;

  constructor(
    private responsibilityService: ResponsibilityService,
    private respPage: ResponsibilitiesPageComponent,
    private appComponent: AppComponent,
    private router: Router,
    private route: ActivatedRoute) {super();}

  ngOnInit(): void {
    this.findAll();
    this.notFoundEmoji();
  }

  public findAll(): void {
    this.responsibilityService.findAll().subscribe(
      data => this.responsibilities = data)
  }


  public redirectTo(path: string,code: string) {
    this.appComponent.hideAlertMessage();
    this.router.navigate([path, code],
      {
        state: {prevUrl: this.router.url},
        relativeTo: this.route
      }).then()
  }

  public showDeleteBox(code:string, libelle:string, index: number) {
    this.respPage.appendDeleteBoxComponent(code, libelle, index)
  }

  get responsibility(): Responsibility {
    return this.responsibilityService.responsibility;
  }

  set responsibility(value: Responsibility) {
    this.responsibilityService.responsibility = value;
  }

  get responsibilities(): Responsibility[] {
    return this.responsibilityService.responsibilities;
  }

  set responsibilities(value: Responsibility[]) {
    this.responsibilityService.responsibilities = value;
  }
}
