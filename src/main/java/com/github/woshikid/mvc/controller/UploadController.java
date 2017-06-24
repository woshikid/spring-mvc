package com.github.woshikid.mvc.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class UploadController {

	@ResponseBody
	@RequestMapping(value="/upload", produces="text/html;charset=UTF-8")
	public String upload(MultipartFile file) throws Exception {
		String content = new String(file.getBytes(), "GBK");
		return content;
	}
	
	@RequestMapping("/download")
	public ResponseEntity<byte[]> download() throws Exception {
		String fileName = "中文.txt";
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		headers.setContentDispositionFormData("attachment", new String(fileName.getBytes("GBK"), "iso8859-1"));
//		FileUtils.readFileToByteArray(file);
		byte[] data = "文件内容".getBytes();
		return new ResponseEntity<byte[]>(data, headers, HttpStatus.OK);
	}
	
	@ResponseBody
	@ExceptionHandler
	public String exceptionHandler(Exception e) {
		if (e instanceof MaxUploadSizeExceededException) {
			return "size too big";
		} else if (e instanceof MultipartException) {
			return "no file";
		} else {
			e.printStackTrace();
			return e.getMessage();
		}
	}
}
