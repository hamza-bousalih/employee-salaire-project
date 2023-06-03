import { Injectable } from '@angular/core';
import {Employee} from "src/app/controler/model/employee.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "src/environments/environment";
import {Observable} from "rxjs";
import {employeeSaveResponses, employeeUpdateResponses} from "src/app/controler/service/responcesExplain/employeeResponces";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _employee = {} as Employee;
  private _employees = [] as Employee[];
  private url = environment.baseUrl + 'backend/';

  // explain the responses that come from the microServer
  employeeSaveResponses = employeeSaveResponses;
  employeeUpdateResponses = employeeUpdateResponses;

  constructor(private http: HttpClient) { }

  public save(): Observable<number> {
    return this.http.post<number>(this.url, this._employee);
  }

  public findAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }

  public delete(cin: string, raison: string): Observable<number> {
    return this.http.delete<number>(this.url + `cin/${cin}/raison/${raison}`)
  }

  public update(cin: string): Observable<number> {
    return this.http.put<number>(
      this.url + `cin/${cin}`,
      this.employee);
  }

  public findByCin(cin: string): Observable<Employee> {
    return this.http.get<Employee>(this.url +  `cin/${cin}`);
  }


  get employee(): Employee {
    if (this._employee === null)
      return new Employee();
    return this._employee;
  }

  set employee(value: Employee) {
    this._employee = value;
  }

  get employees(): Employee[] {
    if (this._employees === null)
      return new Array<Employee>();
    return this._employees;
  }

  set employees(value: Employee[]) {
    this._employees = value;
  }
}
