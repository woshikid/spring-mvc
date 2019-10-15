package com.github.woshikid.mvc.listener;

import org.apache.zookeeper.WatchedEvent;
import org.apache.zookeeper.ZooKeeper;
import org.springframework.beans.factory.InitializingBean;

import com.github.woshikid.utils.ChildrenWatcher;

public class ZooKeeperWatcher extends ChildrenWatcher implements InitializingBean {

	public ZooKeeperWatcher(ZooKeeper zk, String path) {
		super(zk, path);
	}

	protected void doProcess(WatchedEvent event) throws Exception {
		System.err.println(event);
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		register();
	}

}
