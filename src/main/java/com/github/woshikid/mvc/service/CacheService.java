package com.github.woshikid.mvc.service;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.github.woshikid.mvc.model.User;

@Service
public class CacheService {

	@Cacheable("keyValues")
	public String getValue(String key) {
		System.err.println("getting value of " + key);
		return key + "_"+ key;
	}
	
	@Cacheable("users")
	public User getUser(String name) {
		System.err.println("getting user of " + name);
		User user = new User();
		user.setName(name);
		return user;
	}
	
	@CacheEvict(value = {"users"}, allEntries = true)
	public void refreshUser() {
		System.err.println("refreshing user");
	}
	
}
