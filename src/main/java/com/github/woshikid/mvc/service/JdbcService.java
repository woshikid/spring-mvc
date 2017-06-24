package com.github.woshikid.mvc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.woshikid.mvc.dao.UserMapper;
import com.github.woshikid.mvc.model.User;

@Service
public class JdbcService {

	@Autowired
	private UserMapper userDao;
	
	@Transactional
	public String test() throws Exception {
		int i = userDao.selectCount(new User());
		return String.valueOf(i);
	}
}
