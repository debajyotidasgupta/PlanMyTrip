package com.first.dao;

import java.util.List;

import com.first.entity.Hotel;

public interface HotelDAO {
	List<Hotel> get();
	List<Hotel> get(String title);
	boolean save(Hotel h);
	boolean delete(int h);
}
