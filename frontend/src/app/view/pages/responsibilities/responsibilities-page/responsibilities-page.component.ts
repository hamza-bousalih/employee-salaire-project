import {Component, ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
import {
  ResponsibilitiesDeleteComponent
} from "src/app/view/responsibilities/responsibilities-delete/responsibilities-delete.component";

@Component({
  selector: 'app-responsibilities-page',
  templateUrl: './responsibilities-page.component.html',
  styleUrls: ['./responsibilities-page.component.scss']
})
export class ResponsibilitiesPageComponent {
  @ViewChild('deleteContainer', {read: ViewContainerRef}) deleteContainer!: ViewContainerRef;
  deleteComponentRef: any;

  constructor(private resolver: ComponentFactoryResolver) {
  }

  public appendDeleteBoxComponent(code: string, libelle: string, index: number) {
    this.deleteContainer.clear()

    const componentFactory = this.resolver.resolveComponentFactory(ResponsibilitiesDeleteComponent);
    this.deleteComponentRef = this.deleteContainer.createComponent(componentFactory);

    this.deleteComponentRef.instance.wantToDelete = true;
    this.deleteComponentRef.instance.respCode = code;
    this.deleteComponentRef.instance.respLibelle = libelle;
    this.deleteComponentRef.instance.respIndex = index;
  }

  public destroyDeleteBox() {
    if (this.deleteComponentRef) {
      this.deleteComponentRef.destroy();
      this.deleteComponentRef = null;
    }
  }
}
