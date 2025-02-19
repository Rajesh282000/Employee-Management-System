import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  dataSource: Employee[] = [];

  displayedColumns: string[] = [
    'id',
    'name',
    'address',
    'phone',
    'department',
    'gender',
    'skills',
    'edit',
    'delete',
  ];

  right: string = 'right';

  constructor(private employeeService: EmployeeService, private router: Router) {
    this.getEmployees();
  }
  ngOnInit(): void {}

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (response) => {
        console.log(response);
        this.dataSource = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (response) => {
        this.getEmployees();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  updateEmployee(id: number): void {
    this.router.navigate(['/employee', {id: id}]);
  } 
}
