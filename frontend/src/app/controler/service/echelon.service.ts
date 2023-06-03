import { Injectable } from '@angular/core';
import {Echelon} from "src/app/controler/model/echelon.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "src/environments/environment";
import {Observable} from "rxjs";
import {echelonSaveResponses, echelonUpdateResponses} from "src/app/controler/service/responcesExplain/echelonResponces";

@Injectable({
  providedIn: 'root'
})
export class EchelonService {
  private _echelon!: Echelon;
  private _echelons!: Echelon[];
  private url = environment.baseUrl + 'echelon/';

  // responses
  saveResponse = echelonSaveResponses;
  updateResponse = echelonUpdateResponses;

  constructor(private http: HttpClient) { }

  public save(): Observable<number> {
    return this.http.post<number>(this.url, this._echelon);
  }

  public update(): Observable<number> {
    return this.http.put<number>(this.url, this._echelon);
  }

  public delete(code: string): Observable<number> {
    return this.http.delete<number>(this.url + `code/${code}`);
  }

  public findByCode(code: string): Observable<Echelon> {
    return this.http.get<Echelon>(this.url + `code/${code}`);
  }

  public findAll(): Observable<Echelon[]> {
    return this.http.get<Echelon[]>(this.url)
  }

  get echelon(): Echelon {
    if (this._echelon == null)
      this._echelon = new Echelon();
    return this._echelon;
  }

  set echelon(value: Echelon) {
    this._echelon = value;
  }

  get echelons(): Echelon[] {
    if (this._echelons == null)
      this._echelons = new Array<Echelon>();
    return this._echelons;
  }

  set echelons(value: Echelon[]) {
    this._echelons = value;
  }
}
