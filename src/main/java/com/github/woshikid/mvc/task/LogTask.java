package com.github.woshikid.mvc.task;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class LogTask {

	private final static Logger logger = LoggerFactory.getLogger(LogTask.class);
	
	@Scheduled(fixedRate=600000, initialDelay=10000)
	public void log() {
		logger.info("***** log *****:" + System.currentTimeMillis() / 1000);
	}
}
