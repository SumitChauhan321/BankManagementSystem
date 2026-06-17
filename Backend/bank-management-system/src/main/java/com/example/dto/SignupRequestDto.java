package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequestDto {

	private String username;
	private String email;
	private String phoneNumber;
	private String dateOfBirth;
	private String address;
	private String password;

}
