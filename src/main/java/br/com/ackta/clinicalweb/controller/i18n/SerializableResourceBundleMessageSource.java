/*
 * SerializableResourceBundleMessageSource.java		26/06/2015
 *
 * Copyright (C) 2016 ACKTA. All Rights Reserved.
 */
package br.com.ackta.clinicalweb.controller.i18n;

import java.util.Locale;
import java.util.Properties;

import org.springframework.context.support.ReloadableResourceBundleMessageSource;

/**
 *
 *
 * @author RMendonca
 * @version @version@
 * @since @since@
 */
public class SerializableResourceBundleMessageSource extends ReloadableResourceBundleMessageSource {

	public Properties getAllProperties(Locale locale) {
		clearCacheIncludingAncestors();
		final PropertiesHolder propertiesHolder = getMergedProperties(locale);
		final Properties properties = propertiesHolder.getProperties();

		return properties;
	}
}