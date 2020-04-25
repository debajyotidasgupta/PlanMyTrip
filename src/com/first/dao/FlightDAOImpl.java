package com.first.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.first.Util.DBConnectionUtil;
import com.first.entity.Flight;
import com.first.entity.Flight;


public class FlightDAOImpl implements FlightDAO {

	@Override
	public List<Flight> get() {
		//Create referance variables
		List<Flight>list = null;
		Flight flight = null;
		try {
			list = new ArrayList<Flight>();
			
			//Create sql query
			String sql = "SELECT * FROM tbl_flight group by fname";
			
			//Get Database Connection
			Connection connection = DBConnectionUtil.openConnection();
			
			//Create a statement
			Statement statement = connection.createStatement();
			
			//Execute the sql query
			ResultSet resultSet = statement.executeQuery(sql);
			
			//process the result set
			while(resultSet.next()) {
				flight = new Flight();
				flight.setId(resultSet.getInt("id"));
				flight.setDepart(resultSet.getString("depart"));
				flight.setDest(resultSet.getString("dest"));
				flight.setDuration(resultSet.getString("duration"));
				flight.setFare(resultSet.getInt("fare"));
				flight.setFname(resultSet.getString("fname"));
				flight.setLand(resultSet.getString("land"));
				flight.setSrc(resultSet.getString("src"));
				flight.setStops(resultSet.getInt("stops"));
				flight.setCap(resultSet.getString("cap"));
				//Add employee to the list
				list.add(flight);
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
	public List<Flight> get(String title) {
		//Create referance variables
		List<Flight>list = null;
		Flight flight = null;
		try {
			list = new ArrayList<Flight>();
					
			//Create sql query
			String sql = "SELECT * FROM tbl_flight where fname='"+title+"'";
					
			//Get Database Connection
			Connection connection = DBConnectionUtil.openConnection();
					
			//Create a statement
			Statement statement = connection.createStatement();
					
			//Execute the sql query
			ResultSet resultSet = statement.executeQuery(sql);
					
			//process the result set
			while(resultSet.next()) {
				flight = new Flight();
				flight.setId(resultSet.getInt("id"));
				flight.setDepart(resultSet.getString("depart"));
				flight.setDest(resultSet.getString("dest"));
				flight.setDuration(resultSet.getString("duration"));
				flight.setFare(resultSet.getInt("fare"));
				flight.setFname(resultSet.getString("fname"));
				flight.setLand(resultSet.getString("land"));
				flight.setSrc(resultSet.getString("src"));
				flight.setStops(resultSet.getInt("stops"));
				flight.setCap(resultSet.getString("cap"));
				//Add employee to the list
				list.add(flight);
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
	public boolean save(Flight b) {
		boolean flag = false;
		try {
			String sql = "INSERT INTO tbl_flight(depart,dest,duration,fare,fname,land,src,stops,cap) VALUES('"+b.getDepart()+"','"+b.getDest()+"','"+b.getDuration()+"','"+b.getFare()+"','"+b.getFname()+"','"+b.getLand()+"','"+b.getSrc()+"','"+b.getStops()+"','"+b.getCap()+"')";
			Connection connection = DBConnectionUtil.openConnection();
			PreparedStatement preparedStatement = connection.prepareStatement(sql);
			preparedStatement.executeUpdate();
			flag = true;
		}catch (SQLException ex) {
			ex.printStackTrace();
		}
		return flag;
	}

	@Override
	public boolean delete(int id) {
		boolean flag = false;
		try {
			String sql = "DELETE FROM tbl_flight WHERE id="+id;
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
