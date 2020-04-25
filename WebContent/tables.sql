create database planmytrip;
use planmytrip;

create table tbl_hotel(
	id int primary key not null auto_increment,
    rtype varchar(255) not null,
    rmax varchar(255) not null,
    rview varchar(255) not null,
    rsize varchar(255) not null,
    rbed varchar(255) not null,
    rdesc varchar(1000) not null,
    ravail int not null,
    rvid varchar(1000) not null,
    rtag varchar(255) not null,
    rpic varchar(255) not null
);

create table tbl_login(
	id int primary key not null auto_increment,
    firstname varchar(255) not null,
    lastname varchar(255) not null,
    usr_type varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null
);
create table tbl_blog(
	id int primary key not null auto_increment,
    title varchar(255) not null,
    dated varchar(255) not null,
    paths varchar(500) not null,
    content_s varchar(500) not null,
    content_l varchar(10000) not null,
    comm varchar(1000) not null,
    author varchar(255) not null
);

create table tbl_flight(
	id int primary key not null auto_increment,
    fname varchar(255) not null,
    src varchar(255) not null,
    dest varchar(255) not null,
    depart varchar(255) not null,
    land varchar(255) not null,
    stops int not null,
    duration varchar(255) not null,
    fare int not null,
    cap varchar(255) not null
);