 package com.first.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.first.dao.LoginDAO;
import com.first.dao.LoginDAOImpl;
import com.first.entity.Login;

public class LoginController extends HttpServlet {
	
	LoginDAO loginDAO = null;
	
	public LoginController() {
		loginDAO = new LoginDAOImpl();
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		HttpSession session = req.getSession();
		
		Login login = new Login();
		login.setEmail(req.getParameter("email"));
		login.setPassword(req.getParameter("pass"));
		Login status = loginDAO.authenticate(login);
		
		if(status.getLastname().equals("true")) {
			req.setAttribute("user", login);
			session.setAttribute("firstname", login.getFirstname());
			session.setAttribute("user", login.getUsr_type());
			RequestDispatcher dispatcher = req.getRequestDispatcher("/index.jsp");
			dispatcher.forward(req, resp);
		}
		if(status.getLastname().equals("false")) {
			resp.sendRedirect("login.jsp?status=false");
		}
		if(status.getLastname().equals("error")) {
			resp.sendRedirect("login.jsp?status=error");
		}
	}
}
