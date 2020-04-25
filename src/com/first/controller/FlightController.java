package com.first.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.first.dao.FlightDAO;
import com.first.dao.FlightDAOImpl;
import com.first.entity.Flight;

public class FlightController extends HttpServlet{
	
	FlightDAO flightDAO = null;
	RequestDispatcher dispatcher = null;

	public FlightController() {
		flightDAO = new FlightDAOImpl();
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String action = req.getParameter("action");
		String title = req.getParameter("title");
		if(title!=null && !title.isEmpty()) {
			List<Flight> hotel = flightDAO.get(title);
			req.setAttribute("flight", hotel);
			dispatcher = req.getRequestDispatcher("/checkout.jsp");
			dispatcher.forward(req, resp);
		}else {
			if(action==null)action="view";
			if(action.equals("view")) {
				List<Flight> hotel = flightDAO.get();
				req.setAttribute("flight", hotel);
				dispatcher = req.getRequestDispatcher("/flight-list.jsp?fetch=true");
				dispatcher.forward(req, resp);
			}
		}
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Flight flight = new Flight();
		flight.setDepart(req.getParameter("depart"));
		flight.setDest(req.getParameter("dest"));
		flight.setDuration(req.getParameter("dur"));
		flight.setFare(Integer.parseInt(req.getParameter("fare")));
		flight.setFname(req.getParameter("fnames"));
		flight.setLand(req.getParameter("land"));
		flight.setSrc(req.getParameter("src"));
		flight.setCap(req.getParameter("cap"));
		flight.setStops(Integer.parseInt(req.getParameter("stops")));
		flightDAO.save(flight);
		resp.sendRedirect("/flight.jsp");
	}
	
}
