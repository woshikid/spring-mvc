package com.github.woshikid.mvc.controller;

import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.woshikid.mvc.model.User;
import com.github.woshikid.mvc.service.CacheService;
import com.github.woshikid.utils.EhCacheUtils;

import net.sf.ehcache.Cache;

@Controller
@RequestMapping("/cache")
public class CacheController {
	
	@Autowired
	private StringRedisTemplate redis;
	
	@Autowired
	@Qualifier("testCache")
	private Cache ehcache;
	
	@Autowired
	private CacheService cacheService;

	@ResponseBody
	@RequestMapping("/redisSet")
	public void redisSet(String key, String value) {
		redis.opsForValue().set(key, value);
		redis.expire(key, 10, TimeUnit.SECONDS);
	}
	
	@ResponseBody
	@RequestMapping("/redisGet")
	public String redisGet(String key) throws Exception {
		String value = redis.opsForValue().get(key);
		return value;
	}
	
	@ResponseBody
	@RequestMapping("/ehSet")
	public void ehSet(String key, String value) {
		EhCacheUtils.set(ehcache, key, value);
	}
	
	@ResponseBody
	@RequestMapping("/ehGet")
	public String ehGet(String key) throws Exception {
		Object value = EhCacheUtils.get(ehcache, key);
		return value.toString();
	}
	
	@ResponseBody
	@RequestMapping("/cacheValue")
	public String cacheValue(String key) throws Exception {
		String value = cacheService.getValue(key);
		return value;
	}
	
	@ResponseBody
	@RequestMapping("/cacheUser")
	public String cacheUser(String name) throws Exception {
		User user = cacheService.getUser(name);
		return user.getName();
	}
	
	@ResponseBody
	@RequestMapping("/refreshUser")
	public void refreshUser() {
		cacheService.refreshUser();
	}
	
	@ResponseBody
	@RequestMapping("/setSession")
	public void setSession(HttpServletRequest request) {
		request.getSession().setAttribute("time", System.currentTimeMillis());
	}
	
}
