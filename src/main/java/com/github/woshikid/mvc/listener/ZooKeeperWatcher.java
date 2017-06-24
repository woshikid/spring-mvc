package com.github.woshikid.mvc.listener;

import org.apache.zookeeper.WatchedEvent;
import org.apache.zookeeper.ZooKeeper;

import com.github.woshikid.utils.ChildrenWatcher;

public class ZooKeeperWatcher extends ChildrenWatcher {

	public ZooKeeperWatcher(ZooKeeper zk, String path) {
		super(zk, path);
	}

	protected void doProcess(WatchedEvent event) throws Exception {
		System.err.println(event);
	}

}
