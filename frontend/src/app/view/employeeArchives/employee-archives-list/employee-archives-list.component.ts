import {Component, ComponentFactoryResolver, Injectable, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {EmployeeArchiveService} from "src/app/controler/service/employee-archive.service";
import {EmployeeArchive} from "src/app/controler/model/employee-archive.model";
import {EmployeeArchiveDeleteComponent} from "src/app/view/employeeArchives/employee-archive-delete/employee-archive-delete.component";
import {ZeroFound} from "src/app/view/layouts/zero-found";

@Component({
  selector: 'app-backend-archives-list',
  templateUrl: './employee-archives-list.component.html',
  styleUrls: ['./employee-archives-list.component.scss']
})
@Injectable({providedIn: 'root'})
export class EmployeeArchivesListComponent extends ZeroFound implements OnInit{

  @ViewChild('deleteContainer', {read: ViewContainerRef}) deleteContainer!: ViewContainerRef;
  deleteComponentRef: any;


  constructor(
    private archiveService: EmployeeArchiveService,
    private resolver: ComponentFactoryResolver) {super()}

  ngOnInit(): void {
    this.findAll();
    this.notFoundEmoji();
  }

  public findAll() {
    this.archiveService.findAll().subscribe(
      data => this.archives = data)
  }

  public showDeleteBox(code: string, fullname: string, index: number) {
    this.deleteContainer.clear()

    const componentFactory = this.resolver.resolveComponentFactory(EmployeeArchiveDeleteComponent);
    this.deleteComponentRef = this.deleteContainer.createComponent(componentFactory);

    this.deleteComponentRef.instance.wantToDelete = true;
    this.deleteComponentRef.instance.archiveCode = code;
    this.deleteComponentRef.instance.employeeName = fullname;
    this.deleteComponentRef.instance.archiveIndex = index;
  }

  public hideDeleteBox() {
    if (this.deleteComponentRef) {
      this.deleteComponentRef.destroy();
      this.deleteComponentRef = null;
    }
  }

  get archives(): EmployeeArchive[] {
    return this.archiveService.archives;
  }

  set archives(value: EmployeeArchive[]) {
    this.archiveService.archives = value;
  }
}
