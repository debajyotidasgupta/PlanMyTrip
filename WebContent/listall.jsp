<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
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
		<h1 style="padding-left:300px">All Data From Database</h1>
	</div>
	</div>
	<div class="limiter">
		<div class="container-table100">
			<div class="wrap-table100">
			<h1 class="display-3">FLIGHTS</h1>
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
									<th class="cell100 column5">Action</th>
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
										<td class="cell100 column5"><a href="AdminController?action=delete&type=flight&id=${f.id}">Delete</a></td>
									</tr>
								</c:forEach>
							</tbody>
						</table>
					</div>
				</div>
				
				
			<h1 class="display-3">USERS</h1>
				
				<div class="table100 ver2 m-b-110">
					<div class="table100-head">
						<table>
							<thead>
								<tr class="row100 head">
									<th class="cell100 column6">ID</th>
									<th class="cell100 column5">First Name</th>
									<th class="cell100 column5">User Type</th>
									<th class="cell100 column1">Email</th>
									<th class="cell100 column5">Action</th>
								</tr>
							</thead>
						</table>
					</div>

					<div class="table100-body js-pscroll">
						<table>
							<tbody>
								<c:forEach items="${login}" var="l" >
									<tr class="row100 body">
										<td class="cell100 column6">${l.id}</td>
										<td class="cell100 column5">${l.firstname}</td>
										<td class="cell100 column5">${l.usr_type}</td>
										<td class="cell100 column1">${l.email}</td>
										<td class="cell100 column5"><a href="AdminController?action=delete&type=login&id=${l.id}">Delete</a></td>
									</tr>
								</c:forEach>
							</tbody>
						</table>
					</div>
				</div>
				
				
			<h1 class="display-3">BLOGS</h1>

				<div class="table100 ver3 m-b-110">
					<div class="table100-head">
						<table>
							<thead>
								<tr class="row100 head">
									<th class="cell100 column6">ID</th>
									<th class="cell100 column1">Title</th>
									<th class="cell100 column5">Dated</th>
									<th class="cell100 column5">Author</th>
									<th class="cell100 column5">Action</th>
								</tr>
							</thead>
						</table>
					</div>

					<div class="table100-body js-pscroll">
						<table>
							<tbody>
								<c:forEach items="${blog}" var="b">
									<tr class="row100 body">
										<td class="cell100 column6">${b.id}</td>
										<td class="cell100 column1">${b.title}</td>
										<td class="cell100 column5">${b.dated}</td>
										<td class="cell100 column5">${b.author}</td>
										<td class="cell100 column5"><a href="AdminController?action=delete&type=blog&id=${b.id}">Delete</a></td>
									</tr>
								</c:forEach>
							</tbody>
						</table>
					</div>
				</div>
				
			
			<h1 class="display-3">HOTEL</h1>

				<div class="table100 ver1 m-b-110">
					<div class="table100-head">
						<table>
							<thead>
								<tr class="row100 head">
									<th class="cell100 column6">ID</th>
									<th class="cell100 column1">Room Type</th>
									<th class="cell100 column5">Capacity</th>
									<th class="cell100 column5">View</th>
									<th class="cell100 column5">Action</th>
								</tr>
							</thead>
						</table>
					</div>

					<div class="table100-body js-pscroll">
						<table>
							<tbody>
								<c:forEach items="${hotel}" var="h">
									<tr class="row100 body">
										<td class="cell100 column6">${h.id}</td>
										<td class="cell100 column1">${h.rtype}</td>
										<td class="cell100 column5">${h.rmax}</td>
										<td class="cell100 column5">${h.rview}</td>
										<td class="cell100 column5"><a href="AdminController?action=delete&type=hotel&id=${b.id}">Delete</a></td>
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