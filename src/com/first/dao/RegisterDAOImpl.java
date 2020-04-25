package com.first.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.first.Util.DBConnectionUtil;
import com.first.entity.Login;

public class RegisterDAOImpl implements RegisterDAO{

	@Override
	public boolean saveDetails(Login l) {
		boolean flag = false;
		try {
			String sql = "insert into tbl_login(firstname,lastname,usr_type,email,password)values('"+l.getFirstname()+"', '"+l.getLastname()+"', '"+l.getUsr_type()+"', '"+l.getEmail()+"', '"+l.getPassword()+"')";
			Connection connection = DBConnectionUtil.openConnection();
			PreparedStatement preparedStatement = connection.prepareStatement(sql);
			preparedStatement.executeUpdate();
			flag = true;
		}catch (SQLException ex) {
			ex.printStackTrace();
		}
		
		return flag;
	}
}
