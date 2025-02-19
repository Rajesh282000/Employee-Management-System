package com.crud.controller;

import com.crud.dto.EmployeeDto;
import com.crud.entity.Employee;
import com.crud.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/save")
    public ResponseEntity<Employee> saveEmployee(@RequestBody Employee employee) {
            Employee savedEmployee = employeeService.saveEmployee(employee);
            return ResponseEntity.ok(savedEmployee);
    }
    @GetMapping("/get-all")
    public List<Employee> getEmployees() {
       return employeeService.getEmployees();
    }

    @GetMapping("/get/{id}")
    public Employee getEmployee(@PathVariable Integer id) {
        return employeeService.getEmployee(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteEmployee(@PathVariable Integer id) {
         employeeService.deleteEmployee(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Integer id, @RequestBody EmployeeDto employeeDto) {
        Optional<Employee> optionalEmployee = employeeService.findById(id);
        Employee newEmployee = new Employee();

        if (optionalEmployee.isPresent()) {

            newEmployee =employeeService.fromDto(employeeDto);
            newEmployee.setId(id);
            employeeService.saveEmployee(newEmployee);

        } else {
            return ResponseEntity.badRequest().build();
        }


        return ResponseEntity.ok(newEmployee);
    }
}
