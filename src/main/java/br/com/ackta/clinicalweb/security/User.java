package br.com.ackta.clinicalweb.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * Models an user from DAP's legacy database.
 *
 */
public class User implements IUser, UserDetails {

	/** default uid */
	private static final long serialVersionUID = -2078545227379984884L;

	private final Long id;

	private final String username;

	private final String password;

	private final String name;

	private final boolean isActive;

	private final boolean isCredentialsExpired;

	private final List<GrantedAuthority> authorities;

	/**
	 * Creates an DapLegacyUser
	 *
	 * @param id
	 *            unique identifier
	 * @param username
	 *            the user's username
	 * @param password
	 *            the user's password
	 * @param isActive
	 *            the user's account activation state
	 * @param authorities
	 *            the user's roles
	 */
	public User(long id, String username, String password, String name, boolean isActive,
			boolean isCredentialsExpired, List<GrantedAuthority> authorities) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.name = name;
		this.isActive = isActive;
		this.isCredentialsExpired = isCredentialsExpired;
		this.authorities = authorities;

	}

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * org.springframework.security.core.userdetails.UserDetails#getAuthorities
	 * ()
	 */
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * org.springframework.security.core.userdetails.UserDetails#getPassword()
	 */
	@Override
	public String getPassword() {
		return password;
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see org.springframework.security.core.userdetails.UserDetails#
	 * isAccountNonExpired ()
	 */
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see org.springframework.security.core.userdetails.UserDetails#
	 * isAccountNonLocked ()
	 */
	@Override
	public boolean isAccountNonLocked() {
		return isActive;
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see org.springframework.security.core.userdetails.UserDetails#
	 * isCredentialsNonExpired()
	 */
	@Override
	public boolean isCredentialsNonExpired() {
		return !isCredentialsExpired;
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * org.springframework.security.core.userdetails.UserDetails#isEnabled()
	 */
	@Override
	public boolean isEnabled() {
		return true;
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see br.com.ackta.clinicalweb.security.User#getId()
	 */
	@Override
	public Long getId() {
		return id;
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see br.com.ackta.clinicalweb.security.User#getUsername()
	 */
	@Override
	public String getUsername() {
		return username;
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see br.com.ackta.clinicalweb.security.User#getName()
	 */
	@Override
	public String getName() {
		return name;
	}

}
