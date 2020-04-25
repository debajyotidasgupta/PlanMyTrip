package com.first.dao;

import java.util.List;

import com.first.entity.Login;

public interface LoginDAO {
	Login authenticate(Login login) ;
	boolean delete(int id);
	List<Login> get();
}
