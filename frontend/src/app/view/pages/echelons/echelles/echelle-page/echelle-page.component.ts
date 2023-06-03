import {Component, ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
import {EchellesDeleteComponent} from "src/app/view/echelles/echelles-delete/echelles-delete.component";

@Component({
  selector: 'app-echelle-page',
  templateUrl: './echelle-page.component.html',
  styleUrls: ['./echelle-page.component.scss']
})
export class EchellePageComponent {
  @ViewChild('deleteContainer', {read: ViewContainerRef}) deleteContainer!: ViewContainerRef;
  deleteComponentRef: any;

  constructor(private resolver: ComponentFactoryResolver) {
  }

  public showDeleteBox(code: string, libelle: string, index: number) {
    this.deleteContainer.clear()

    const componentFactory = this.resolver.resolveComponentFactory(EchellesDeleteComponent);
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
