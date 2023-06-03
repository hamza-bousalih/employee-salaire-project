import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {MandatService} from "src/app/controler/service/mandat.service";
import {Mandat} from "src/app/controler/model/mandat.model";
import {MandatDeleteComponent} from "src/app/view/employees/employee-view/employee-mandats/mandat-delete/mandat-delete.component";
import {editResponsibility} from "src/app/app-routing.module";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-backend-mandats',
  templateUrl: './employee-mandats.component.html',
  styleUrls: ['./employee-mandats.component.scss']
})
export class EmployeeMandatsComponent  implements OnInit{
  @Input() employeeCin!: string;

  edit = editResponsibility;

  @ViewChild('deleteMandatBox', {read: ViewContainerRef}) deleteMandatBox!: ViewContainerRef;
  deleteMandatBoxRef: any;

  constructor(
    private mandatService: MandatService,
    private router: Router,
    private route: ActivatedRoute,
    private resolver: ComponentFactoryResolver) {}

  ngOnInit() {this.findMandats()}

  private findMandats() {
    this.mandatService.findByEmployeeCin(this.employeeCin).subscribe(
      data => this.mandats = data)
  }

  public showDeleteBox(code: string, respLibelle: string, index: number, disabled: boolean) {
    if (!disabled) {
      this.deleteMandatBox.clear()

      const componentFactory = this.resolver.resolveComponentFactory(MandatDeleteComponent);
      this.deleteMandatBoxRef = this.deleteMandatBox.createComponent(componentFactory);

      this.deleteMandatBoxRef.instance.targetedCode = code;
      this.deleteMandatBoxRef.instance.mandatIndex = index;
      this.deleteMandatBoxRef.instance.targetedResp = respLibelle;
    }
  }

  public redirect(path: string, param: string | null) {
      this.router.navigate(
        [path,param],
        {
          relativeTo: this.route,
          state: {prevUrl: this.router.url}
        }
      ).then()
  }

  public hideDeleteBox() {
    if (this.deleteMandatBoxRef) {
      this.deleteMandatBoxRef.destroy();
      this.deleteMandatBoxRef = null;
    }
  }

  getStatus(startDate: Date, endDate: Date): MandatStatus {
    let currentDate = new Date().getTime();
    let startDate1 = Date.parse(startDate.toString());
    let endDate1 = Date.parse(endDate.toString());

    let status = 'n';

    if (currentDate > endDate1) {status = 'f'}
    else if (startDate1 <= currentDate && currentDate <= endDate1) {status = 'c'}

    return new MandatStatus(status);
  }

  get mandats(): Mandat[] {
    return this.mandatService.mandats;
  }

  set mandats(value: Mandat[]) {
    this.mandatService.mandats = value;
  }
}

class MandatStatus {
  status!: string;
  icon!: string;
  color!: string;
  isFinished!: boolean

  constructor(str: string) {
    // @ts-ignore
    let statusData = data[str];
    this.status = statusData.status;
    this.icon = statusData.icon;
    this.color = statusData.color;
    this.isFinished = statusData.isFinished;
  }
}

let data = {
  'f' : {status: 'finished', icon: 'fa fa-circle-check', color: 'green', isFinished: true},
  'c' : {status: 'current', icon: 'fa fa-clock', color: 'blue', isFinished: false},
  'n' : {status: 'notYet', icon: 'fa fa-circle', color: 'gray', isFinished: false}
}
