package br.com.ackta.clinicalweb.application;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import br.com.ackta.clinicalweb.controller.i18n.SerializableResourceBundleMessageSource;

/**
 *
 *
 * @author RMendonca
 * @version @version@
 * @since @since@
 */
@Configuration
public class WebConfig extends WebMvcConfigurerAdapter {

	@Bean
	public SerializableResourceBundleMessageSource messageSource() {
		final SerializableResourceBundleMessageSource serializableResourceBundleMessageSource = new SerializableResourceBundleMessageSource();
		serializableResourceBundleMessageSource.setBasename("classpath:/i18n/msgs");
		return serializableResourceBundleMessageSource;
	}

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/**/*.html").setViewName(null);
	}
}
