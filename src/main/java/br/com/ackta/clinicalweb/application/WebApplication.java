package br.com.ackta.clinicalweb.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.ackta.clinicalweb.security.IUser;

/**
 *
 */
@SpringBootApplication
@RestController
public class WebApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebApplication.class, args);
	}

	@RequestMapping("/user")
	public IUser user(@AuthenticationPrincipal IUser user) {
		return user;
	}
}
