import { Injectable } from '@angular/core';
import {Mandat} from "src/app/controler/model/mandat.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "src/environments/environment";
import {mandatSaveResponses, mandatUpdateResponses} from "src/app/controler/service/responcesExplain/mandatResponses";

@Injectable({
  providedIn: 'root'
})
export class MandatService {
  private _mandat = {} as Mandat;
  private _mandats = [] as Mandat[];
  private url = environment.baseUrl + 'mandat/'

  saveResponses = mandatSaveResponses;
  updateResponses = mandatUpdateResponses;

  constructor(private http: HttpClient) {}

  public save(): Observable<number> {
    return this.http.post<number>(this.url, this.mandat);
  }

  public update(): Observable<number> {
    return this.http.put<number>(this.url, this.mandat);
  }

  public findByCode(code: string): Observable<Mandat> {
    return this.http.get<Mandat>(this.url + `code/${code}`)
  }

  findByEmployeeCin(cin: string): Observable<Mandat[]> {
    return this.http
      .get<Mandat[]>(this.url + `employee/cin/${cin}`);
  }

  delete(code: string): Observable<number> {
    return this.http
      .delete<number>(this.url + `code/${code}`)
  }

  get mandat(): Mandat {
    if (this._mandat == null)
      this._mandat = new Mandat();
    return this._mandat;
  }

  set mandat(value: Mandat) {
    this._mandat = value;
  }

  get mandats(): Mandat[] {
    if (this._mandats == null)
      this._mandats = new Array<Mandat>()
    return this._mandats;
  }

  set mandats(value: Mandat[]) {
    this._mandats = value;
  }
}
