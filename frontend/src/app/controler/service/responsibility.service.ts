import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Responsibility} from "src/app/controler/model/responsibility.model";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {respSaveResponses, respUpdateResponses} from "./responcesExplain/responsibilityResponces";

@Injectable({
  providedIn: 'root'
})
export class ResponsibilityService {
  private _responsibility = {} as Responsibility;
  private _responsibilities = [] as Responsibility[];
  private url = environment.baseUrl + 'responsibility/'

  // responses
  saveResponse = respSaveResponses;
  updateResponse = respUpdateResponses;

  constructor(private http: HttpClient) { }

  public save(): Observable<number> {
    return this.http.post<number>(this.url, this.responsibility);
  }

  public update(): Observable<number> {
    return this.http.put<number>(this.url, this.responsibility);
  }

  public findAll(): Observable<Responsibility[]> {
    return this.http.get<Responsibility[]>(this.url)
  }

  findByCode(code: string): Observable<Responsibility> {
    return this.http.get<Responsibility>(this.url + `code/${code}`)
  }

  delete(code: string): Observable<number> {
    return this.http.delete<number>(this.url + `code/${code}`)
  }


  get responsibility(): Responsibility {
    if (this._responsibility == null)
      this._responsibility = new Responsibility();
    return this._responsibility;
  }

  set responsibility(value: Responsibility) {
    this._responsibility = value;
  }

  get responsibilities(): Responsibility[] {
    if (this._responsibilities == null)
      this._responsibilities = new Array<Responsibility>()
    return this._responsibilities;
  }

  set responsibilities(value: Responsibility[]) {
    this._responsibilities = value;
  }
}
