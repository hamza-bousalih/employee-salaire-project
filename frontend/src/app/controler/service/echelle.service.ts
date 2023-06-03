import { Injectable } from '@angular/core';
import {environment} from "src/environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Echelle} from "src/app/controler/model/echelle.model";
import {echelleSaveResponses, echelleUpdateResponses} from "src/app/controler/service/responcesExplain/echelleResponces";

@Injectable({
  providedIn: 'root'
})
export class EchelleService {
  private _echelle = {} as Echelle;
  private _echelles = [] as Echelle[];
  private url = environment.baseUrl + 'echelle/'

  // responses
  saveResponse = echelleSaveResponses;
  updateResponse = echelleUpdateResponses;

  constructor(private http: HttpClient) { }

  public save(): Observable<number> {
    return this.http.post<number>(this.url, this.echelle);
  }

  public update(): Observable<number> {
    return this.http.put<number>(this.url, this.echelle);
  }

  public findAll(): Observable<Echelle[]> {
    return this.http.get<Echelle[]>(this.url)
  }

  findByCode(code: string): Observable<Echelle> {
    return this.http.get<Echelle>(this.url + `code/${code}`)
  }

  delete(code: string): Observable<number> {
    return this.http.delete<number>(this.url + `code/${code}`)
  }


  get echelle(): Echelle {
    if (this._echelle == null)
      this._echelle = new Echelle();
    return this._echelle;
  }

  set echelle(value: Echelle) {
    this._echelle = value;
  }

  get echelles(): Echelle[] {
    if (this._echelles == null)
      this._echelles = new Array<Echelle>()
    return this._echelles;
  }

  set echelles(value: Echelle[]) {
    this._echelles = value;
  }



}
