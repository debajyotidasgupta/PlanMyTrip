package com.first.dao;

import java.util.List;

import com.first.entity.Blog;

public interface BlogDAO {
	public List<Blog> get();
	public List<Blog> get(String content_s);
	public boolean save(Blog blog);
	public boolean delete(int id);
}
