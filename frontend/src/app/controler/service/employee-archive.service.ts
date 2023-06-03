import {Injectable} from "@angular/core";
import {EmployeeArchive} from "../model/employee-archive.model";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class EmployeeArchiveService {
  private _archive = {} as EmployeeArchive;
  private _archives = [] as EmployeeArchive[];
  private url = environment.baseUrl + 'employeeArchive/'

  constructor(private http: HttpClient) {}

  public findAll(): Observable<EmployeeArchive[]> {
    return this.http.get<EmployeeArchive[]>(this.url)
  }

  public delete(code: string): Observable<number> {
    return this.http.delete<number>(this.url + `code/${code}`);
  }


  get archive(): EmployeeArchive {
    return this._archive;
  }

  set archive(value: EmployeeArchive) {
    this._archive = value;
  }

  get archives(): EmployeeArchive[] {
    return this._archives;
  }

  set archives(value: EmployeeArchive[]) {
    this._archives = value;
  }
}
