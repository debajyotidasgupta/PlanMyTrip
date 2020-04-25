package com.first.entity;

public class Blog {
	private Integer id;
	private String title;
	private String dated;
	private String author;
	private String paths;
	private String content_s;
	private String content_l;
	private String comment;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDated() {
		return dated;
	}
	public void setDated(String dated) {
		this.dated = dated;
	}
	public String getPaths() {
		return paths;
	}
	public void setPaths(String path) {
		this.paths = path;
	}
	public String getContent_s() {
		return content_s;
	}
	public void setContent_s(String content_s) {
		this.content_s = content_s;
	}
	public String getContent_l() {
		return content_l;
	}
	public void setContent_l(String content_l) {
		this.content_l = content_l;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	@Override
	public String toString() {
		return "Blog [id=" + id + ", title=" + title + ", dated=" + dated + ", author=" + author + ", paths=" + paths
				+ ", content_s=" + content_s + ", content_l=" + content_l + ", comment=" + comment + "]";
	}
	
}
