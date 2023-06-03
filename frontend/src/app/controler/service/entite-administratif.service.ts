import { Injectable } from '@angular/core';
import {EntiteAdministratif} from "src/app/controler/model/entite-administratif.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "src/environments/environment";
import {entiteDeleteResponses, entiteSaveResponses, entiteUpdateResponses}
  from "./responcesExplain/entiteAdministratifResponces";

@Injectable({
  providedIn: 'root'
})
export class EntiteAdministratifService {
  private _entite!: EntiteAdministratif;
  private _entites!: EntiteAdministratif[];
  private url = environment.baseUrl + 'entiteAdministratif/';

  // responses
  saveResponses = entiteSaveResponses;
  updateResponses = entiteUpdateResponses;
  deleteResponses = entiteDeleteResponses;

  constructor(private http: HttpClient) {}

  public save(): Observable<number> {
    return this.http.post<number>(this.url, this.entite)
  }

  public update(): Observable<number> {
    return this.http.put<number>(this.url, this.entite)
  }

  public findAll(): Observable<EntiteAdministratif[]> {
    return this.http.get<EntiteAdministratif[]>(this.url)
  }

  public findByCode(code: string): Observable<EntiteAdministratif> {
    return this.http.get<EntiteAdministratif>(this.url + `code/${code}`)
  }

  public delete(code: string, force: boolean): Observable<number> {
    return this.http.delete<number>(this.url + `code/${code}/force/${force}`)
  }


  get entite(): EntiteAdministratif {
    if (this._entite == null)
      this._entite = new EntiteAdministratif();
    return this._entite;
  }

  set entite(value: EntiteAdministratif) {
    this._entite = value;
  }

  get entites(): EntiteAdministratif[] {
    if (this._entites == null)
      this._entites = new Array<EntiteAdministratif>();
    return this._entites;
  }

  set entites(value: EntiteAdministratif[]) {
    this._entites = value;
  }
}
