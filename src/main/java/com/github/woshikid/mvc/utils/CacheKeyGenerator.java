package com.github.woshikid.mvc.utils;

import java.lang.reflect.Method;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.interceptor.KeyGenerator;

import com.github.woshikid.utils.MessageDigestUtils;
import com.github.woshikid.utils.ObjectUtils;

public class CacheKeyGenerator implements KeyGenerator {

	public Object generate(Object paramObject, Method paramMethod, Object... paramArrayOfObject) {
		String cacheName = null;
		
		Cacheable cacheable = paramMethod.getAnnotation(Cacheable.class);
		if (cacheable != null) {
			String[] values = cacheable.cacheNames();
			if (values.length == 0) values = cacheable.value();
			if (values.length >= 1) cacheName = values[0];
		}
		
		CachePut cachePut = paramMethod.getAnnotation(CachePut.class);
		if (cachePut != null) {
			String values[] = cachePut.cacheNames();
			if (values.length == 0) values = cachePut.value();
			if (values.length >= 1) cacheName = values[0];
		}
		
		CacheEvict cacheEvict = paramMethod.getAnnotation(CacheEvict.class);
		if (cacheEvict != null) {
			String values[] = cacheEvict.cacheNames();
			if (values.length == 0) values = cacheEvict.value();
			if (values.length >= 1) cacheName = values[0];
		}
		
		if (cacheName == null) {
			cacheName = paramObject.getClass().getName() + "." + paramMethod.getName();
		}
		
		String key = "";
		for (Object param : paramArrayOfObject) {
			byte[] bytes = ObjectUtils.serialize(param);
			key += MessageDigestUtils.sha1(bytes);
		}
		
		if (key.length() == 0) key = "void";
		if (key.length() > 40) key = MessageDigestUtils.sha1(key);
		
		return cacheName + ":" + key;
	}

}
