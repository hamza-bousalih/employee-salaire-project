import {Component, ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
import {EchelonDeleteComponent} from "src/app/view/echelons/echelon-delete/echelon-delete.component";

@Component({
  selector: 'app-echelons-page',
  templateUrl: './echelons-page.component.html',
  styleUrls: ['./echelons-page.component.scss']
})
export class EchelonsPageComponent {
  @ViewChild('deleteContainer', {read: ViewContainerRef}) deleteContainer!: ViewContainerRef;
  deleteComponentRef: any;

  constructor(private resolver: ComponentFactoryResolver) {
  }

  public showDeleteBox(code: string, libelle: string, index: number) {
    this.deleteContainer.clear()

    const componentFactory = this.resolver.resolveComponentFactory(EchelonDeleteComponent);
    this.deleteComponentRef = this.deleteContainer.createComponent(componentFactory);

    this.deleteComponentRef.instance.wantToDelete = true;
    this.deleteComponentRef.instance.echelonCode = code;
    this.deleteComponentRef.instance.echelonLibelle = libelle;
    this.deleteComponentRef.instance.echelonIndex = index;
  }

  public destroyDeleteBox() {
    if (this.deleteComponentRef) {
      this.deleteComponentRef.destroy();
      this.deleteComponentRef = null;
    }
  }
}
