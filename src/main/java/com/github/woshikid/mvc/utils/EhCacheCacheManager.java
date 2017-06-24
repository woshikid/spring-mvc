package com.github.woshikid.mvc.utils;

import org.springframework.cache.Cache;
import org.springframework.cache.ehcache.EhCacheCache;

import net.sf.ehcache.Ehcache;

public class EhCacheCacheManager extends org.springframework.cache.ehcache.EhCacheCacheManager {

	protected Cache getMissingCache(String cacheName) {
		Ehcache ehcache = getCacheManager().addCacheIfAbsent(cacheName);
		if (ehcache == null) return null;
		return new EhCacheCache(ehcache);
	}
	
}
