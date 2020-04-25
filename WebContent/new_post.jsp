<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix = "c" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Contact V11</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
<!--===============================================================================================-->
	<link rel="icon" type="image/png" href="views/images/icons/favicon.ico"/>
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="views/vendor/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="views/fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="views/fonts/Linearicons-Free-v1.0.0/icon-font.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="views/vendor/animate/animate.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="views/vendor/css-hamburgers/hamburgers.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="views/vendor/select2/select2.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="views/css/util.css">
	<link rel="stylesheet" type="text/css" href="views/css/main_new_post.css">
<!--===============================================================================================-->
</head>
<body>

	<div class="container-contact100" style="background-image: url('views/images/about.jpg');">
		<div class="wrap-contact100">
			<form class="contact100-form validate-form" method="POST" action="BlogController">
				<span class="contact100-form-title">
					Make Your New Post
				</span>

				<div class="wrap-input100 rs1-wrap-input100 validate-input" data-validate="Name is required">
					<span class="label-input100">First Name *</span>
					<input class="input100" type="text" name="author" placeholder="Enter your firstname" required>
				</div>

				<div class="wrap-input100 rs1-wrap-input100 " data-validate = "Valid date is required: Month(words) date, year">
					<span class="label-input100">Date *</span>
					<input class="input100" type="text" name="date" placeholder="January 31, 2020" required>
				</div>
				
				<div class="wrap-input100">
					<span class="label-input100">Title of your Blog Post*</span>
					<input class="input100" type="text" name="title" placeholder="Travel to Paris" required>
				</div>

				<div class="wrap-input100">
					<span class="label-input100">Link to Images(If any)</span>
					<input class="input100" type="text" name="web" placeholder="http://">
				</div>

				<div class="wrap-input100 validate-input" data-validate = "Message is required">
					<span class="label-input100">Your Post Content(In not more than 10000 chars)*</span>
					<textarea class="input100" name="message" placeholder="Your message here..." required></textarea>
				</div>

				<div class="container-contact100-form-btn">
					<div class="wrap-contact100-form-btn">
						<div class="contact100-form-bgbtn"></div>
						<button type="submit" class="contact100-form-btn">
							Submit
						</button>
					</div>
				</div>
			</form>
		</div>

		<span class="contact100-more">
				Call us on +001 345 6178
		</span>
	</div>



	<div id="dropDownSelect1"></div>

<!--===============================================================================================-->
	<script src="views/vendor/jquery/jquery-3.2.1.min.js"></script>
<!--===============================================================================================-->
	<script src="views/vendor/bootstrap/js/popper.js"></script>
	<script src="views/vendor/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================-->
	<script src="views/vendor/select2/select2.min.js"></script>
<!--===============================================================================================-->
	<script src="views/js/main_new_post.js"></script>

</body>
</html>
