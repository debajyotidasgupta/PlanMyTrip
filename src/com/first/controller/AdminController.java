package com.first.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.first.dao.BlogDAO;
import com.first.dao.BlogDAOImpl;
import com.first.dao.FlightDAO;
import com.first.dao.FlightDAOImpl;
import com.first.dao.HotelDAO;
import com.first.dao.HotelDAOImpl;
import com.first.dao.LoginDAO;
import com.first.dao.LoginDAOImpl;
import com.first.entity.Blog;
import com.first.entity.Flight;
import com.first.entity.Hotel;
import com.first.entity.Login;

public class AdminController extends HttpServlet{

	FlightDAO flightDAO = null;
	HotelDAO hotelDAO = null;
	BlogDAO blogDAO = null;
	LoginDAO loginDAO = null;
	RequestDispatcher dispatcher = null;
	
	public AdminController() {
		flightDAO = new FlightDAOImpl();
		hotelDAO = new HotelDAOImpl();
		blogDAO = new BlogDAOImpl();
		loginDAO = new LoginDAOImpl();
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String action = (String)req.getParameter("action");
		if(action!=null && action.equals("delete")){
			String type = (String)req.getParameter("type");
			int id = Integer.parseInt(req.getParameter("id"));
			if(type.equals("login")) {
				loginDAO.delete(id);
			}
			else if(type.equals("blog")) {
				blogDAO.delete(id);
			}
			else if(type.equals("hotel")) {
				hotelDAO.delete(id);
			}
			else {
				flightDAO.delete(id);
			}
		}
		doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		List<Flight> flight = flightDAO.get();
		req.setAttribute("flight", flight);
		List<Hotel> hotel = hotelDAO.get();
		req.setAttribute("hotel", hotel);
		List<Blog> blog = blogDAO.get();
		req.setAttribute("blog", blog);
		List<Login> login = loginDAO.get();
		req.setAttribute("login", login);
		dispatcher = req.getRequestDispatcher("/listall.jsp?fetch=true");
		dispatcher.forward(req, resp);
	}

}
