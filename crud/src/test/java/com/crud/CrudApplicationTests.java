package com.crud;

import com.crud.entity.Employee;
import com.crud.service.EmployeeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class CrudApplicationTests {

	@Autowired
	private EmployeeService employeeService;

	@Test
	void contextLoads() {
	}

	@Test
	public void help(){
		List<Employee> list = employeeService.getEmployees();
		list.forEach(System.out::println);
	}

}
