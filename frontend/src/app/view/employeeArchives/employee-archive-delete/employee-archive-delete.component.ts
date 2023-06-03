import {Component, Input} from '@angular/core';
import {EmployeeArchiveService} from "src/app/controler/service/employee-archive.service";
import {EmployeeArchivesListComponent} from "src/app/view/employeeArchives/employee-archives-list/employee-archives-list.component";
import {EmployeeArchive} from "src/app/controler/model/employee-archive.model";
import {EmployeeArchivesPageComponent}
  from "src/app/view/pages/employeeArchives/employee-archives-page/employee-archives-page.component";
import {AlertMessage} from "src/app/view/layouts/AlertMessage/alert-message.component";
import {AppComponent} from "src/app/app.component";

@Component({
  selector: 'app-backend-archive-delete',
  templateUrl: './employee-archive-delete.component.html',
  styleUrls: ['./employee-archive-delete.component.scss']
})
export class EmployeeArchiveDeleteComponent {
  @Input() archiveCode!: string;
  @Input() archiveIndex!: number;
  @Input() wantToDelete!: boolean;
  @Input() employeeName!: string;

  constructor(
    private archiveService: EmployeeArchiveService,
    private archivesList: EmployeeArchivesListComponent,
    private archivesPage: EmployeeArchivesPageComponent,
    private appComponent: AppComponent) {}


  public delete() {
    this.archiveService.delete(this.archiveCode).subscribe(
      data => {
        if (data > 0) {
          let alert = new AlertMessage(true, 's', 'archive has been deleted successfully')
          this.archives.splice(this.archiveIndex, 1);
          this.showAlertMessage(alert)
          this.destroy();
        } else {
          let alert = new AlertMessage(true, 'w', 'no archive deleted!')
          this.showAlertMessage(alert)
          this.destroy();
        }
      }
    )
  }

  public destroy() {
    this.archivesList.hideDeleteBox();
  }

  public showAlertMessage(alert: AlertMessage) {
    this.appComponent.showAlertMessage(alert)
  }

  get archives(): EmployeeArchive[] {
    return this.archiveService.archives;
  }

  set archives(value: EmployeeArchive[]) {
    this.archiveService.archives = value;
  }
}
