package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDto {


	private String username;
	private String email;
	private String mobileNumber;
	private String address;
	private String dateOfBirth;
	private String accountNumber;
	private double balance;
	private String role;
	private Long id;
	private String token;
	private String message;
}
