import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SalaryDetails} from "src/app/controler/model/salary-details.model";
import {Observable} from "rxjs";
import {environment} from "src/environments/environment";
import {DateConfig} from "src/app/config/date-config";
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class SalaryDetailsService {
  private _salary!: SalaryDetails;
  private _salaries!: SalaryDetails[];
  private url = environment.baseUrl + 'detailSalaire/';

  constructor(private http: HttpClient) { }

  public findAllByMonth(month: Date): Observable<SalaryDetails[]> {
    let monthAsString = DateConfig.tostring(month)
    return this.http
      .get<SalaryDetails[]>(this.url + `month/${monthAsString}`);
  }

  calcSalary(salaryMonth: Date): Observable<number> {
    let month = formatDate(salaryMonth,'yyyy-MM-dd','en-US')
    return this.http
      .post<number>(this.url + `calcSalary/month/${month}`, {})
  }

  findByEmployeeCin(cin: string): Observable<SalaryDetails[]> {
    return this.http
      .get<SalaryDetails[]>(this.url + `employee/cin/${cin}`)
  }


  get salary(): SalaryDetails {
    if (this._salary == null)
      this._salary = new SalaryDetails();
    return this._salary;
  }

  set salary(value: SalaryDetails) {
    this._salary = value;
  }

  get salaries(): SalaryDetails[] {
    if (this._salaries == null)
      this._salaries = new Array<SalaryDetails>();
    return this._salaries;
  }

  set salaries(value: SalaryDetails[]) {
    this._salaries = value;
  }
}
