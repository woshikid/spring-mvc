package com.github.woshikid.mvc.utils;

import java.util.Collection;
import java.util.Set;

import org.apache.shiro.cache.CacheException;
import org.springframework.cache.Cache;
import org.springframework.cache.support.SimpleValueWrapper;

@SuppressWarnings("rawtypes")
public class ShiroCache implements org.apache.shiro.cache.Cache {
	
	private Cache cache;
	
	public ShiroCache(Cache cache) {
		this.cache = cache;
	}

	public Object get(Object key) throws CacheException {
		Object value = cache.get(key);
		if (value instanceof SimpleValueWrapper) {
			return ((SimpleValueWrapper)value).get();
		} else {
			return value;
		}
	}

	public Object put(Object key, Object value) throws CacheException {
		cache.put(key, value);
		return null;
	}

	public Object remove(Object key) throws CacheException {
		cache.evict(key);
		return null;
	}

	public void clear() throws CacheException {
		cache.clear();
	}

	public int size() {
		throw new UnsupportedOperationException();
	}

	public Set keys() {
		throw new UnsupportedOperationException();
	}

	public Collection values() {
		throw new UnsupportedOperationException();
	}

}
