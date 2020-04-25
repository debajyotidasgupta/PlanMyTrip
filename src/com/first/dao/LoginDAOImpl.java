package com.first.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.first.Util.DBConnectionUtil;
import com.first.entity.Login;


public class LoginDAOImpl implements LoginDAO {

	@Override
	public Login authenticate(Login login) {
		String sql = "select * from tbl_login where email=? and password=?";
		try { 
			Connection connection = DBConnectionUtil.openConnection();
			PreparedStatement ps = connection.prepareStatement(sql);
			ps.setString(1, login.getEmail());
			ps.setString(2, login.getPassword());
			ResultSet rs = ps.executeQuery();
			
			if(rs.next()) {
				login.setFirstname(rs.getString("firstname"));
				login.setUsr_type(rs.getString("usr_type"));
				login.setLastname("true");
			}else {
				login.setLastname("false");
			}
			return login;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		login.setLastname("error");
		return login;
//		return "error";
	}

	@Override
	public List<Login> get() {
		List<Login>list = null;
		try {
			list = new ArrayList<Login>();
			
			//Create sql query
			String sql = "SELECT * FROM tbl_login";
			
			//Get Database Connection
			Connection connection = DBConnectionUtil.openConnection();
			
			//Create a statement
			Statement statement = connection.createStatement();
			
			//Execute the sql query
			ResultSet resultSet = statement.executeQuery(sql);
			
			//process the result set
			while(resultSet.next()) {
				Login login = new Login();
				login.setEmail(resultSet.getString("email"));
				login.setFirstname(resultSet.getString("firstname"));
				login.setLastname(resultSet.getString("lastname"));
				login.setPassword(resultSet.getString("password"));
				login.setUsr_type(resultSet.getString("usr_type"));
				login.setId(resultSet.getInt("id"));
				//Add employee to the list
				list.add(login);
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
	public boolean delete(int id) {
		boolean flag = false;
		try {
			String sql = "DELETE FROM tbl_login WHERE id="+id;
			Connection connection = DBConnectionUtil.openConnection();
			PreparedStatement preparedStatement = connection.prepareStatement(sql);
			preparedStatement.executeUpdate();
			flag=true;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return flag;
	}
}
