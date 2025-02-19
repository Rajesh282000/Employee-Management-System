import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employee: any;

  isCreateEmployee: boolean = true;

  employeeSkills: string[] = [];
  right = 'right';
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.employee = this.activatedRoute.snapshot.data['employee'];
    console.log(this.employee);
    if(this.employee && this.employee.id>0){
      this.isCreateEmployee = false;
      if(this.employee.skills != ''){
        this.employeeSkills = [];
        this.employeeSkills = this.employee.skills.split(',');
        
      }      
    }else{
      this.isCreateEmployee = true;
    }
    
  }
  selectGender(gender: string) {
    this.employee.gender = gender;
  }

  onSkillChenge(event: any) {
    if (event.checked) {
      this.employeeSkills.push(event.source.value);
    } else {
      this.employeeSkills.forEach((item, index) => {
        if (item === event.source.value) {
          this.employeeSkills.splice(index, 1);
        }
      });
    }

    this.employee.skills = this.employeeSkills.toString();
  }
  saveEmployee(employeeForm: NgForm): void {

    if (this.isCreateEmployee) {
      this.employeeService.saveEmployee(this.employee).subscribe({
        next: (response) => {
          console.log(response);
          employeeForm.reset();
          this.employeeSkills = [];
          this.employee.gender = ''; // Reset gender field
          this.employee.skills = ''; // Reset skills field
        },
        error: (error) => {
          console.log(error);
        },
      });
    }else{
      this.employeeService.updateEmployee(this.employee, this.employee.id).subscribe({
        next: (response) => {
          console.log(response);
          employeeForm.reset();
          this.employeeSkills = [];
          this.employee.gender = ''; // Reset gender field
          this.employee.skills = ''; // Reset skills field
        },
        error: (error) => {
          console.log(error);
        },
      });
    }

    
  }

  checkSkills(skill: string): boolean {
    return this.employeeSkills != null && this.employeeSkills.includes(skill);
  }
}
