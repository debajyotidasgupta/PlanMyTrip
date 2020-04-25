package com.first.Util;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnectionUtil {
	//Define the database properties
	public static final String URL = "jdbc:mysql://localhost:3306/planmytrip";
	public static final String DRIVER = "com.mysql.jdbc.Driver";
	public static final String USERNAME = "root";
	public static final String PASSWORD = "password";
	public static Connection connection = null;
	//Define the static method
	public static Connection openConnection() {
		// Check the connection
		if(connection!=null) {
			return connection;
		}
		else {
			try {
				// Load the driver
				Class.forName(DRIVER);
				// get the connection
				connection = DriverManager.getConnection(URL,USERNAME,PASSWORD);
			}catch(Exception e) {
				e.printStackTrace();
			}
			//return connection
			return connection;
		}
	}
}
