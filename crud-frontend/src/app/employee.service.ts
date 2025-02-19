import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  api = 'http://localhost:8081/employee';

  public saveEmployee(employee: Employee): Observable<Employee>{
   return  this.http.post<Employee>(`${this.api}/save`, employee);
  }

  public getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.api}/get-all`);
  }

  public deleteEmployee(id: number): Observable<Employee>{
    return this.http.delete<Employee>(`${this.api}/delete/${id}`);
  }

  public getEmployee(id: number): Observable<Employee>{
    return this.http.get<Employee>(`${this.api}/get/${id}`);
  }

  public updateEmployee(employee: Employee, id: number): Observable<Employee>{
    return this.http.put<Employee>(`${this.api}/update/${id}`, employee);
  }
}
