package com.github.woshikid.mvc.controller;

import org.apache.zookeeper.CreateMode;
import org.apache.zookeeper.ZooDefs.Ids;
import org.apache.zookeeper.ZooKeeper;
import org.apache.zookeeper.data.Stat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/zk")
public class ZooKeeperController {

	@Autowired(required=false)
	private ZooKeeper zk;
	
	@ResponseBody
	@RequestMapping("/test")
	public void test() throws Exception {
		System.err.println(zk.getChildren("/", false));
		
		String znode = zk.create("/test", "data".getBytes(), Ids.OPEN_ACL_UNSAFE, CreateMode.EPHEMERAL_SEQUENTIAL);
		System.err.println("create:" + znode);
		
		Stat stat = new Stat();
		zk.getData(znode, false, stat);
		System.err.println("dataVersion:" + stat.getVersion());
		
		stat = zk.setData(znode, "newData".getBytes(), -1);
		System.err.println("dataVersion:" + stat.getVersion());
		
		zk.delete(znode, -1);
	}
}
