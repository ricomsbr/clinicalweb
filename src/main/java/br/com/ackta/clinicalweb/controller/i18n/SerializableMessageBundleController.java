/*
 * SerializableMessageBundleController.java		26/06/2015
 *
 * Copyright (C) 2016 ACKTA. All Rights Reserved.
 */
package br.com.ackta.clinicalweb.controller.i18n;

import java.util.Locale;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 *
 * @author RMendonca
 * @version @version@
 * @since @since@
 */
@Controller
@RequestMapping("/rest/messageBundle")
public class SerializableMessageBundleController {

	private final SerializableResourceBundleMessageSource messageBundle;

	/**
	 * @param messageBundle
	 */
	@Autowired
	public SerializableMessageBundleController(SerializableResourceBundleMessageSource messageBundle) {
		this.messageBundle = messageBundle;
	}

	/**
	 * ReadAll
	 */
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public Properties list(@RequestParam String lang) {
		return messageBundle.getAllProperties(new Locale(lang));
	}
}