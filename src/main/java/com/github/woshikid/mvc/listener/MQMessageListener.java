package com.github.woshikid.mvc.listener;

public class MQMessageListener {

	public void onMessage(Object message) {
		System.err.println(message);
	}

}
