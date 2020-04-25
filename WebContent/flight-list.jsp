<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Table V04</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
<!--===============================================================================================-->	
	<link rel="icon" type="image/png" href="images/icons/favicon.ico"/>
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="views/vendor/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="views/fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="views/vendor/animate/animate.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="views/vendor/select2/select2.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="views/vendor/perfect-scrollbar/perfect-scrollbar.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="views/css/tbl_util.css">
	<link rel="stylesheet" type="text/css" href="views/css/tbl_main.css">
<!--===============================================================================================-->
</head>
<body>
	<div class="container">
		<div class="jumbotron">
			<h1 style="padding-left:350px;display=inline;">Available Flights <i class="fa fa-plane" aria-hidden="true"></i></h1>
		</div>
	</div>	
	
	
	<div class="limiter">
		<div class="container-table100">
			<div class="wrap-table100">
				<div class="table100 ver1 m-b-110">
					<div class="table100-head">
						<table>
							<thead>
								<tr class="row100 head">
									<th class="cell100 column1">Flight</th>
									<th class="cell100 column5">Source</th>
									<th class="cell100 column5">Destination</th>
									<th class="cell100 column5">Departure</th>
									<th class="cell100 column5">Landing</th>
									<th class="cell100 column2">Stops</th>
									<th class="cell100 column1">Duration</th>
									<th class="cell100 column5">Fare</th>
									<th class="cell100 column5">Capacity</th>
										<%
										String user = (String)session.getAttribute("user");
										if(user!=null && (user.equals("admin") || user.equals("flight"))){
										%>
									<th class="cell100 column5">Action</th>
									<%} %>
								</tr>
							</thead>
						</table>
					</div>

					<div class="table100-body js-pscroll">
						<table>
							<tbody>
								<c:forEach items="${flight}" var="f">
									<tr class="row100 body">
										<td class="cell100 column1">${f.fname}</td>
										<td class="cell100 column5">${f.src}</td>
										<td class="cell100 column5">${f.dest}</td>
										<td class="cell100 column5">${f.depart}</td>
										<td class="cell100 column5">${f.land}</td>
										<td class="cell100 column2">${f.stops}</td>
										<td class="cell100 column1">${f.duration}</td>
										<td class="cell100 column5">${f.fare}</td>
										<td class="cell100 column5">${f.cap}</td>
										<%
										if(user!=null && (user.equals("admin") || user.equals("flight"))){
										%>
										<td class="cell100 column5"><a href="FlightController?action=delete">Delete</a></td>
										<%} %>
									</tr>
								</c:forEach>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>


<!--===============================================================================================-->	
	<script src="views/vendor/jquery/jquery-3.2.1.min.js"></script>
<!--===============================================================================================-->
	<script src="views/vendor/bootstrap/js/popper.js"></script>
	<script src="views/vendor/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================-->
	<script src="views/vendor/select2/select2.min.js"></script>
<!--===============================================================================================-->
	<script src="views/vendor/perfect-scrollbar/perfect-scrollbar.min.js"></script>
	<script>
		$('.js-pscroll').each(function(){
			var ps = new PerfectScrollbar(this);

			$(window).on('resize', function(){
				ps.update();
			})
		});
			
		
	</script>
<!--===============================================================================================-->
	<script src="views/js/tbl_main.js"></script>

</body>
</html>