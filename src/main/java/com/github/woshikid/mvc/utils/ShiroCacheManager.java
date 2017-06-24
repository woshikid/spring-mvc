package com.github.woshikid.mvc.utils;

import org.apache.shiro.cache.CacheException;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;

public class ShiroCacheManager implements org.apache.shiro.cache.CacheManager {

	private CacheManager cacheManager;
	
	public CacheManager getCacheManager() {
		return cacheManager;
	}

	public void setCacheManager(CacheManager cacheManager) {
		this.cacheManager = cacheManager;
	}

	@SuppressWarnings("unchecked")
	public <K, V> org.apache.shiro.cache.Cache<K, V> getCache(String name) throws CacheException {
		Cache cache = cacheManager.getCache(name);
		if (cache == null) return null;
		return new ShiroCache(cache);
	}

}
