import {Component, ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
import {GradeDeleteComponent} from "src/app/view/grades/grade-delete/grade-delete.component";

@Component({
  selector: 'app-grades-page',
  templateUrl: './grades-page.component.html',
  styleUrls: ['./grades-page.component.scss']
})
export class GradesPageComponent {
  @ViewChild('deleteContainer', {read: ViewContainerRef}) deleteContainer!: ViewContainerRef;
  deleteComponentRef: any;

  constructor(private resolver: ComponentFactoryResolver) {
  }

  public showDeleteBox(code: string, libelle: string, index: number) {
    this.deleteContainer.clear()

    const componentFactory = this.resolver.resolveComponentFactory(GradeDeleteComponent);
    this.deleteComponentRef = this.deleteContainer.createComponent(componentFactory);

    this.deleteComponentRef.instance.wantToDelete = true;
    this.deleteComponentRef.instance.code = code;
    this.deleteComponentRef.instance.libelle = libelle;
    this.deleteComponentRef.instance.index = index;
  }

  public destroyDeleteBox() {
    if (this.deleteComponentRef) {
      this.deleteComponentRef.destroy();
      this.deleteComponentRef = null;
    }
  }
}
