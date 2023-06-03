import {Component, OnInit} from '@angular/core';
import {ZeroFound} from "src/app/view/layouts/zero-found";
import {GradeService} from "src/app/controler/service/grade.service";
import {GradesPageComponent} from "src/app/view/pages/echelons/grades/grades-page/grades-page.component";
import {AppComponent} from "src/app/app.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Grade} from "src/app/controler/model/grade.model";

@Component({
  selector: 'app-grades-list',
  templateUrl: './grades-list.component.html',
  styleUrls: ['./grades-list.component.scss']
})
export class GradesListComponent extends ZeroFound implements OnInit{

  constructor(
    private gradeService: GradeService,
    private gradesPage: GradesPageComponent,
    private appComponent: AppComponent,
    private router: Router,
    private route: ActivatedRoute) {super();}

  ngOnInit(): void {
    this.findAll();
    this.notFoundEmoji();
  }

  public findAll(): void {
    this.gradeService.findAll().subscribe(
      data => this.grades = data)
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
    this.gradesPage.showDeleteBox(code,libelle,index)
  }

  get grades(): Grade[] {
    return this.gradeService.grades;
  }

  set grades(value: Grade[]) {
    this.gradeService.grades = value;
  }
}
