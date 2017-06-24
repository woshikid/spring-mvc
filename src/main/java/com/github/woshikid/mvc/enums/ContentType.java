package com.github.woshikid.mvc.enums;

public enum ContentType {
	
	HTML("html", "text/html;charset=UTF-8", "text/html"),
	JSON("json", "application/json;charset=UTF-8", "application/json");
	
	private final String code;
	private final String msg;
	private final String tips;
	
	private ContentType(String code, String msg, String tips) {
		this.code = code;
		this.msg = msg;
		this.tips = tips;
	}
	
	public String getCode() {
		return code;
	}
	
	public String getMsg() {
		return msg;
	}
	
	public String getTips() {
		return tips;
	}
	
	public boolean equals(String code) {
		return this.code.equals(code);
	}
	
	public static ContentType getEnumByCode(String code) {
		for (ContentType e : values()) {
			if (e.equals(code)) return e;
		}
		return null;
	}
	
	public static String getMsgByCode(String code) {
		for (ContentType e : values()) {
			if (e.equals(code)) return e.getMsg();
		}
		return "";
	}
	
	public static String getTipsByCode(String code) {
		for (ContentType e : values()) {
			if (e.equals(code)) return e.getTips();
		}
		return "";
	}
}
