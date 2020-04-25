package com.first.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.first.dao.HotelDAO;
import com.first.dao.HotelDAOImpl;
import com.first.entity.Hotel;

public class HotelController extends HttpServlet {
	
	HotelDAO hotelDAO = null;
	RequestDispatcher dispatcher = null;

	public HotelController() {
		hotelDAO = new HotelDAOImpl();
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String action = req.getParameter("action");
		String title = req.getParameter("title");
		if(title!=null && !title.isEmpty()) {
			List<Hotel> hotel = hotelDAO.get(title);
			req.setAttribute("hotel", hotel);
			dispatcher = req.getRequestDispatcher("/room-single-new.jsp");
			dispatcher.forward(req, resp);
		}else {
			if(action==null)action="view";
			if(action.equals("view")) {
				List<Hotel> hotel = hotelDAO.get();
				req.setAttribute("hotel", hotel);
				dispatcher = req.getRequestDispatcher("/rooms.jsp?fetch=true");
				dispatcher.forward(req, resp);
			}
		}
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Hotel h = new Hotel();
		h.setRavail(Integer.parseInt(req.getParameter("ravail")));
		h.setRbed(req.getParameter("rbed"));
		h.setRdesc(req.getParameter("rdesc"));
		h.setRmax(req.getParameter("rmax"));
		h.setRpic(req.getParameter("rpic"));
		h.setRsize(req.getParameter("rsize"));
		h.setRtype(req.getParameter("rtype"));
		h.setRvid(req.getParameter("rvid"));
		h.setRview(req.getParameter("rview"));
		h.setTag(req.getParameter("rtag"));
		hotelDAO.save(h);
		req.setAttribute("action", "view");
		doGet(req, resp);
	}

}
