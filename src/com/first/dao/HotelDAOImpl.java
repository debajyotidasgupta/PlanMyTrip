package com.first.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.first.Util.DBConnectionUtil;
import com.first.entity.Hotel;

public class HotelDAOImpl implements HotelDAO {
	@Override
	public List<Hotel> get() {
		//Create referance variables
		List<Hotel>list = null;
		Hotel Hotel = null;
		try {
			list = new ArrayList<Hotel>();
			
			//Create sql query
			String sql = "SELECT * FROM tbl_hotel group by rtype";
			
			//Get Database Connection
			Connection connection = DBConnectionUtil.openConnection();
			
			//Create a statement
			Statement statement = connection.createStatement();
			
			//Execute the sql query
			ResultSet resultSet = statement.executeQuery(sql);
			
			//process the result set
			while(resultSet.next()) {
				Hotel = new Hotel();
				Hotel.setId(resultSet.getInt("id"));
				Hotel.setRavail(resultSet.getInt("ravail"));
				Hotel.setRbed(resultSet.getString("rbed"));
				Hotel.setRdesc(resultSet.getString("rdesc"));
				Hotel.setRmax(resultSet.getString("rmax"));
				Hotel.setRsize(resultSet.getString("rsize"));
				Hotel.setRtype(resultSet.getString("rtype"));
				Hotel.setRvid(resultSet.getString("rvid"));
				Hotel.setRview(resultSet.getString("rview"));
				//Add employee to the list
				list.add(Hotel);
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
	public List<Hotel> get(String title) {
		//Create referance variables
		List<Hotel>list = null;
		Hotel Hotel = null;
		try {
			list = new ArrayList<Hotel>();
					
			//Create sql query
			String sql = "SELECT * FROM tbl_hotel where rtype='"+title+"'";
					
			//Get Database Connection
			Connection connection = DBConnectionUtil.openConnection();
					
			//Create a statement
			Statement statement = connection.createStatement();
					
			//Execute the sql query
			ResultSet resultSet = statement.executeQuery(sql);
					
			//process the result set
			while(resultSet.next()) {
				Hotel = new Hotel();
				Hotel.setId(resultSet.getInt("id"));
				Hotel.setRavail(resultSet.getInt("ravail"));
				Hotel.setRbed(resultSet.getString("rbed"));
				Hotel.setRdesc(resultSet.getString("rdesc"));
				Hotel.setRmax(resultSet.getString("rmax"));
				Hotel.setRsize(resultSet.getString("rsize"));
				Hotel.setRtype(resultSet.getString("rtype"));
				Hotel.setRvid(resultSet.getString("rvid"));
				Hotel.setRview(resultSet.getString("rview"));
				Hotel.setTag(resultSet.getString("rtag"));
				Hotel.setRpic(resultSet.getString("rpic"));
				//Add employee to the list
				list.add(Hotel);
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
	public boolean save(Hotel b) {
		boolean flag = false;
		try {
			String sql = "INSERT INTO tbl_hotel(rtype,rmax,rview,rsize,rbed,rdesc,ravail,rvid,rtag,rpic) VALUES('"+b.getRtype()+"','"+b.getRmax()+"','"+b.getRview()+"','"+b.getRsize()+"','"+b.getRbed()+"','"+b.getRdesc()+"','"+b.getRavail()+"','"+b.getRvid()+"','"+b.getTag()+"','"+b.getRpic()+"')";
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
			String sql = "DELETE FROM tbl_hotel WHERE id="+id;
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
