package com.first.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.first.dao.RegisterDAO;
import com.first.dao.RegisterDAOImpl;
import com.first.entity.Login;

public class RegisterController extends HttpServlet {
	
	RegisterDAO registerDAO = null;
	
	public RegisterController() {
		registerDAO = new RegisterDAOImpl();
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Login login = new Login();
		login.setEmail(req.getParameter("email"));
		login.setPassword(req.getParameter("pass"));
		login.setFirstname(req.getParameter("first_name"));
		login.setFirstname(req.getParameter("last_name"));
		login.setUsr_type(req.getParameter("usr_type"));
		boolean status = registerDAO.saveDetails(login);
		
		if(status) {
			req.setAttribute("user", login);
			RequestDispatcher dispatcher = req.getRequestDispatcher("/index.jsp");
			dispatcher.forward(req, resp);
		}else{
			resp.sendRedirect("register.jsp?status=failed");
		}
	}
	
}
