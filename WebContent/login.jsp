<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">
<head>
<title>Login</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!--===============================================================================================-->
<link rel="stylesheet" type="text/css"
	href="views/vendor/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->
<link rel="stylesheet" type="text/css"
	href="views/fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<!--===============================================================================================-->
<link rel="stylesheet" type="text/css"
	href="views/fonts/Linearicons-Free-v1.0.0/icon-font.min.css">
<!--===============================================================================================-->
<link rel="stylesheet" type="text/css"
	href="views/vendor/animate/animate.css">
<!--===============================================================================================-->
<link rel="stylesheet" type="text/css"
	href="views/vendor/css-hamburgers/hamburgers.min.css">
<!--===============================================================================================-->
<link rel="stylesheet" type="text/css"
	href="views/vendor/animsition/css/animsition.min.css">
<!--===============================================================================================-->
<link rel="stylesheet" type="text/css"
	href="views/vendor/select2/select2.min.css">
<!--===============================================================================================-->
<link rel="stylesheet" type="text/css"
	href="views/vendor/daterangepicker/daterangepicker.css">
<!--===============================================================================================-->
<link rel="stylesheet" type="text/css" href="views/css/login_util.css">
<link rel="stylesheet" type="text/css" href="views/css/login_main.css">
<!--===============================================================================================-->
</head>
<body style="background-color: #666666;">
	<%
		String firstname = (String) session.getAttribute("firstname");
		if (firstname != null) {
			response.sendRedirect("index.jsp");
		}
		String status = request.getParameter("status");
		if (status != null) {
			if (status.equals("false")) {
	%>
	<div class="alert alert-danger alert-dismissible fade show"
		role="alert">
		<strong>INCORRECT</strong> email ID and/or password
		<button type="button" class="close" data-dismiss="alert"
			aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
	</div>
	<%
		} else {
	%>
	<div class="alert alert-warning alert-dismissible fade show"
		role="alert">
		<strong>ERROR!</strong>Try again later 
		<button type="button" class="close" data-dismiss="alert"
			aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
	</div>
	<%
		}
	}
	%>
	<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<form class="login100-form validate-form" action="login"
					method="post">

					<span class="login100-form-title p-b-43"> Login to continue
					</span>

					<div class="wrap-input100 validate-input"
						data-validate="Valid email is required: ex@abc.xyz">
						<input class="input100" type="text" name="email"> <span
							class="focus-input100"></span> <span class="label-input100">Email</span>
					</div>


					<div class="wrap-input100 validate-input"
						data-validate="Password is required">
						<input class="input100" type="password" name="pass"> <span
							class="focus-input100"></span> <span class="label-input100">Password</span>
					</div>

					<div class="flex-sb-m w-full p-t-32 p-b-32">
						<div class="contact100-form-checkbox">
							<input class="input-checkbox100" id="ckb1" type="checkbox"
								name="remember-me"> <label class="label-checkbox100"
								for="ckb1"> Remember me </label>
						</div>

						<div>
							<a href="#" class="txt1"> Forgot Password? </a>
						</div>
					</div>


					<div class="container-login100-form-btn">
						<button class="login100-form-btn">Login</button>
					</div>

					<div class="flex-sb-m w-full p-t-32">
						<div class="contact100-form-checkbox">Not Registered Yet?</div>

						<div>
							<a href="register.jsp" class="txt1">
								<div class="btn btn-primary">Register</div>
							</a>
						</div>
					</div>

					<div class="text-center p-t-46 	p-b-20">
						<span class="txt2"> or sign up using </span>
					</div>

					<div class="login100-form-social flex-c-m">
						<span style="color: Red;"> <a href="#"
							class="login100-form-social-item flex-c-m bg2 m-r-5"> <i
								class="fa fa-google" aria-hidden="true"></i>
						</a></span><a href="#" class="login100-form-social-item flex-c-m bg1 m-r-5">
							<i class="fa fa-facebook-f" aria-hidden="true"></i>
						</a> <a href="#" class="login100-form-social-item flex-c-m bg2 m-r-5">
							<i class="fa fa-twitter" aria-hidden="true"></i>
						</a>
					</div>
				</form>

				<div class="login100-more"
					style="background-image: url('views/images/home.jpg');"></div>
			</div>
		</div>
	</div>





	<!--===============================================================================================-->
	<script src="views/vendor/jquery/jquery-3.2.1.min.js"></script>
	<!--===============================================================================================-->
	<script src="views/vendor/animsition/js/animsition.min.js"></script>
	<!--===============================================================================================-->
	<script src="views/vendor/bootstrap/js/popper.js"></script>
	<script src="views/vendor/bootstrap/js/bootstrap.min.js"></script>
	<!--===============================================================================================-->
	<script src="views/vendor/select2/select2.min.js"></script>
	<!--===============================================================================================-->
	<script src="views/vendor/daterangepicker/moment.min.js"></script>
	<script src="views/vendor/daterangepicker/daterangepicker.js"></script>
	<!--===============================================================================================-->
	<script src="views/vendor/countdowntime/countdowntime.js"></script>
	<!--===============================================================================================-->
	<script src="views/js/login_main.js"></script>

</body>
</html>