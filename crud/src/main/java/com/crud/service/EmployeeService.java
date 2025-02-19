package com.crud.service;

import com.crud.dao.EmployeeDao;
import com.crud.dto.EmployeeDto;
import com.crud.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeDao employeeDao;

    public Employee saveEmployee(Employee employee) {
        return employeeDao.save(employee);
    }

    public List<Employee> getEmployees() {
        List<Employee> employees = new ArrayList<>();
                employeeDao.findAll().forEach(employees::add);
        return employees;
    }

    public Employee getEmployee(Integer id) {
        return employeeDao.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid employee Id:" + id));
    }

    public void deleteEmployee(Integer id) {
         employeeDao.deleteById(id);
    }

    public Optional<Employee> findById(Integer id) { return employeeDao.findById(id); }

    // Method to convert from EmployeeDto to Employee
    public Employee fromDto(EmployeeDto dto) {
        Employee employee = new Employee();
        employee.setName(dto.getName());
        employee.setAddress(dto.getAddress());
        employee.setPhone(dto.getPhone());
        employee.setGender(dto.getGender());
        employee.setDepartment(dto.getDepartment());
        employee.setSkills(dto.getSkills());
        return employee;
    }

    // Method to convert from Employee to EmployeeDto
    public EmployeeDto toDto(Employee employee) {
        EmployeeDto dto = new EmployeeDto();
        dto.setName(employee.getName());
        dto.setAddress(employee.getAddress());
        dto.setPhone(employee.getPhone());
        dto.setGender(employee.getGender());
        dto.setDepartment(employee.getDepartment());
        dto.setSkills(employee.getSkills());
        return dto;
    }
}
