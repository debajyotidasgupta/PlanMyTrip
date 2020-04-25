package com.first.dao;

import java.util.List;

import com.first.entity.Flight;

public interface FlightDAO {

	List<Flight> get();
	List<Flight> get(String title);
	boolean save(Flight h);
	boolean delete(int h);
}
