import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { EmployeeService } from "./employee.service";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { Employee } from "./employee.model";

export const EmployeeResolver: ResolveFn<any> = 
(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot,
    employeeService: EmployeeService = inject(EmployeeService)):Observable<Employee> => {
        const id = route.paramMap.get('id');
        
        if(id){
            // make api call and get data for given employee id
            return employeeService.getEmployee(Number(id));

        }else{
            // create and return employee details
            const employee: Employee = {
                name: '',
                address: '',
                phone: '',
                department: '',
                gender: '',
                skills: ''
            }
            return new Observable((observer) => observer.next(employee));
        }
    }