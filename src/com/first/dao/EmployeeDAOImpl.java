package com.first.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.first.Util.DBConnectionUtil;
import com.first.entity.Employee;


public class EmployeeDAOImpl implements EmployeeDAO {
	Connection connection = null;
	Statement statement = null;
	ResultSet resultSet = null;
	PreparedStatement preparedStatement = null;
	@Override
	public List<Employee> get() {
		//Create referance variables
		List<Employee>list = null;
		Employee employee = null;
		try {
			list = new ArrayList<Employee>();
			
			//Create sql query
			String sql = "SELECT * FROM tbl_employee";
			
			//Get Database Connection
			connection = DBConnectionUtil.openConnection();
			
			//Create a statement
			statement = connection.createStatement();
			
			//Execute the sql query
			resultSet = statement.executeQuery(sql);
			
			//process the result set
			while(resultSet.next()) {
				employee = new Employee();
				employee.setId(resultSet.getInt("id"));
				employee.setName(resultSet.getString("name"));
				employee.setDob(resultSet.getString("dob"));
				employee.setDepartment(resultSet.getString("department"));
				//Add employee to the list
				list.add(employee);
			}
			//Add employee to the list
			//return the list
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return list;
	}
	@Override
	public boolean save(Employee e) {
		boolean flag = false;
		try {
			String sql = "INSERT INTO tbl_employee(name, dob, department)VALUES('"+e.getName()+"', '"+e.getDob()+"', '"+e.getDepartment()+"')";
			connection = DBConnectionUtil.openConnection();
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.executeUpdate();
			flag = true;
		}catch (SQLException ex) {
			ex.printStackTrace();
		}
		return flag;
	}
	@Override
	public Employee get(int id) {
		Employee employee = null;
		try {
			employee = new Employee();
			String sql = "SELECT * FROM tbl_employee WHERE id="+id;
			connection = DBConnectionUtil.openConnection();
			statement = connection.createStatement();
			resultSet = statement.executeQuery(sql);
			while(resultSet.next()) {
				employee.setId(resultSet.getInt("id"));
				employee.setName(resultSet.getString("name"));
				employee.setDepartment(resultSet.getString("department"));
				employee.setDob(resultSet.getString("dob"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
//		System.out.println(employee.getName()+" "+employee.getDepartment()+" "+employee.getDob());
		return employee;
	}
	@Override
	public boolean update(Employee e) {
		boolean flag = false;
		try {
			String sql = "UPDATE tbl_employee SET name='"+e.getName()+"',dob='"+e.getDob()+"',department='"+e.getDepartment()+"' where id="+e.getId();
			connection = DBConnectionUtil.openConnection();
			preparedStatement=connection.prepareStatement(sql);
			preparedStatement.executeUpdate();
			flag = true;
		} catch (SQLException e2) {
			e2.printStackTrace();  
		}
		return flag;
	}
	@Override
	public boolean delete(int id) {
		boolean flag = false;
		try {
			String sql = "DELETE FROM tbl_employee WHERE id="+id;
			connection = DBConnectionUtil.openConnection();
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.executeUpdate();
			flag=true;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return flag;
	}

}
