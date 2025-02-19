package com.crud;

import com.crud.entity.Employee;
import com.crud.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class CrudApplication {

	@Autowired
	private EmployeeService employeeService;

	public static void main(String[] args) {
		SpringApplication.run(CrudApplication.class, args);
	}




}
