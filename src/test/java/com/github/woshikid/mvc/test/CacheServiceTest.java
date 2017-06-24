package com.github.woshikid.mvc.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.github.woshikid.mvc.service.CacheService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath*:/spring/spring-*.xml"})
//@Transactional
public class CacheServiceTest {//extends AbstractTransactionalJUnit4SpringContextTests {
	
	@Autowired
	private CacheService service;

	@Test
	public void testRefreshUser() {
		service.refreshUser();
	}
}
