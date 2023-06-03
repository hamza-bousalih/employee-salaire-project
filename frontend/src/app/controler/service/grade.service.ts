import { Injectable } from '@angular/core';
import {Grade} from "src/app/controler/model/grade.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "src/environments/environment";
import {gradeSaveResponses, gradeUpdateResponses} from "./responcesExplain/gradeResponces";

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private _grade!: Grade;
  private _grades!: Grade[];
  private url = environment.baseUrl + 'grade/';

  saveResponses = gradeSaveResponses;
  updateResponses = gradeUpdateResponses;

  constructor(private http: HttpClient) { }

  public save(): Observable<number> {
    return this.http.post<number>(this.url, this.grade);
  }

  public update(): Observable<number> {
    return this.http.put<number>(this.url, this.grade);
  }

  public findAll(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.url);
  }

  findByCode(code: string): Observable<Grade> {
    return this.http.get<Grade>(this.url + `code/${code}`);
  }

  public delete(code: string): Observable<number> {
    return this.http.delete<number>(this.url + `code/${code}`)
  }

  get grade(): Grade {
    if (this._grade == null)
      this._grade = new Grade();
    return this._grade;
  }

  set grade(value: Grade) {
    this._grade = value;
  }

  get grades(): Grade[] {
    if (this._grades == null)
      this._grades = new Array<Grade>();
    return this._grades;
  }

  set grades(value: Grade[]) {
    this._grades = value;
  }
}
