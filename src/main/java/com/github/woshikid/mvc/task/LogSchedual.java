package com.github.woshikid.mvc.task;

import org.quartz.DisallowConcurrentExecution;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.SchedulerException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.scheduling.quartz.QuartzJobBean;

@DisallowConcurrentExecution
public class LogSchedual extends QuartzJobBean {

	private final static Logger logger = LoggerFactory.getLogger(LogSchedual.class);
	
	protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
		ApplicationContext app = getApplicationContext(context);
		logger.info("***** log schedual {} *****:{}", app.getApplicationName(), System.currentTimeMillis() / 1000);
	}
	
	private ApplicationContext getApplicationContext(JobExecutionContext context) {
		try {
			return (ApplicationContext)context.getScheduler().getContext().get("applicationContext");
		} catch (SchedulerException e) {
			throw new RuntimeException(e);
		}
	}
}
