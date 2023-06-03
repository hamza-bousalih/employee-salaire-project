import {Component, ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
import {EntitesDeleteComponent} from "src/app/view/entites-administartifs/entites-delete/entites-delete.component";

@Component({
  selector: 'app-entites-page',
  templateUrl: './entites-page.component.html',
  styleUrls: ['./entites-page.component.scss']
})
export class EntitesPageComponent {
  @ViewChild('deleteContainer', {read: ViewContainerRef}) deleteContainer!: ViewContainerRef;
  deleteComponentRef: any;

  constructor(private resolver: ComponentFactoryResolver) {}

  public appendDeleteBoxComponent(code: string, libelle: string, index: number) {
    this.deleteContainer.clear()

    const componentFactory = this.resolver.resolveComponentFactory(EntitesDeleteComponent);
    this.deleteComponentRef = this.deleteContainer.createComponent(componentFactory);

    this.deleteComponentRef.instance.wantToDelete = true;
    this.deleteComponentRef.instance.entiteCode = code;
    this.deleteComponentRef.instance.entiteLibelle = libelle;
    this.deleteComponentRef.instance.entiteIndex = index;
  }

  public destroyDeleteBox() {
    if (this.deleteComponentRef) {
      this.deleteComponentRef.destroy();
      this.deleteComponentRef = null;
    }
  }

}
