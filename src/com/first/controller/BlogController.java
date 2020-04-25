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
import com.first.entity.Blog;

public class BlogController extends HttpServlet {
	
	BlogDAO blogDAO = null;
	RequestDispatcher dispatcher = null;

	public BlogController() {
		blogDAO = new BlogDAOImpl();
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String action = req.getParameter("action");
		String title = req.getParameter("title");
		if(title!=null && !title.isEmpty()) {
			List<Blog> posts = blogDAO.get(title);
			req.setAttribute("post", posts);
			dispatcher = req.getRequestDispatcher("/post.jsp");
			dispatcher.forward(req, resp);
		}else {
			if(action==null)action="view";
			if(action.equals("view")) {
				List<Blog> posts = blogDAO.get();
				req.setAttribute("post", posts);
				dispatcher = req.getRequestDispatcher("/blogs.jsp?fetch=true");
				dispatcher.forward(req, resp);
			}
		}
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Blog b = new Blog();
		b.setAuthor(req.getParameter("author"));
		b.setDated(req.getParameter("date"));
		b.setPaths(req.getParameter("web"));
		b.setTitle(req.getParameter("title"));
		b.setContent_l(req.getParameter("message"));
		b.setContent_s(req.getParameter("message").substring(0, 500));
		b.setComment("beautiful blog");
		if(blogDAO.save(b))System.out.println("OK");
		else System.out.println("Not Done");
		req.setAttribute("action", "view");
		doGet(req, resp);
	}
	
}
