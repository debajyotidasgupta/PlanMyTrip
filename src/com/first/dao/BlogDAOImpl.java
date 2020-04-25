package com.first.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.first.Util.DBConnectionUtil;
import com.first.entity.Blog;

public class BlogDAOImpl implements BlogDAO {

	@Override
	public List<Blog> get() {
		//Create referance variables
		List<Blog>list = null;
		Blog blog = null;
		try {
			list = new ArrayList<Blog>();
			
			//Create sql query
			String sql = "SELECT * FROM tbl_blog group by content_s";
			
			//Get Database Connection
			Connection connection = DBConnectionUtil.openConnection();
			
			//Create a statement
			Statement statement = connection.createStatement();
			
			//Execute the sql query
			ResultSet resultSet = statement.executeQuery(sql);
			
			//process the result set
			while(resultSet.next()) {
				blog = new Blog();
				blog.setId(resultSet.getInt("id"));
				blog.setTitle(resultSet.getString("title"));
				blog.setDated(resultSet.getString("dated"));
				blog.setPaths(resultSet.getString("paths"));
				blog.setContent_s(resultSet.getString("content_s"));
				blog.setContent_l(resultSet.getString("content_l"));
				blog.setComment(resultSet.getString("comm"));		
				blog.setAuthor(resultSet.getString("author"));
				//Add employee to the list
				list.add(blog);
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
	public List<Blog> get(String title) {
		//Create referance variables
		List<Blog>list = null;
		Blog blog = null;
		try {
			list = new ArrayList<Blog>();
					
			//Create sql query
			String sql = "SELECT * FROM tbl_blog where title='"+title+"'";
					
			//Get Database Connection
			Connection connection = DBConnectionUtil.openConnection();
					
			//Create a statement
			Statement statement = connection.createStatement();
					
			//Execute the sql query
			ResultSet resultSet = statement.executeQuery(sql);
					
			//process the result set
			while(resultSet.next()) {
				blog = new Blog();
				blog.setId(resultSet.getInt("id"));
				blog.setTitle(resultSet.getString("title"));
				blog.setDated(resultSet.getString("dated"));
				blog.setPaths(resultSet.getString("paths"));
				blog.setContent_s(resultSet.getString("content_s"));
				blog.setContent_l(resultSet.getString("content_l"));
				blog.setComment(resultSet.getString("comm"));		
				blog.setAuthor(resultSet.getString("author"));
				//Add employee to the list
				list.add(blog);
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
	public boolean save(Blog b) {
		boolean flag = false;
		try {
			String sql = "INSERT INTO tbl_blog(title,dated,paths,content_s,content_l,comm,author) VALUES('"+b.getTitle()+"', '"+b.getDated()+"', '"+b.getPaths()+"', '"+b.getContent_s()+"', '"+b.getContent_l()+"', '"+b.getComment()+"', '"+b.getAuthor()+"')";
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
			String sql = "DELETE FROM tbl_blog WHERE id="+id;
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
