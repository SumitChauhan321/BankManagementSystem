package com.example.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.dto.EmailCheckResponseDto;
import com.example.dto.LoginRequestDto;
import com.example.dto.LoginResponseDto;
import com.example.dto.SignupRequestDto;
import com.example.dto.SignupResponseDto;
import com.example.entity.User;
import com.example.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtTokenService jwtTokenService;
	
	@Autowired
	private EmailService emailService;


	public EmailCheckResponseDto checkEmail(String email) {

		boolean exists=userRepository.existsByEmail(email.trim().toLowerCase());
		if (exists) {
	        return new EmailCheckResponseDto(true,"Email already exists");
	    }
	    return new EmailCheckResponseDto(false,"");
	}



	public SignupResponseDto signup(SignupRequestDto signupRequestDto) {

		String email=signupRequestDto.getEmail().trim().toLowerCase();

		if(userRepository.existsByEmail(email)) {
		    return new SignupResponseDto(
		        "Email already exists"
		    );
		}

		User user=new User();
		user.setUsername(signupRequestDto.getUsername());
		user.setEmail(email);
		user.setMobileNumber(signupRequestDto.getPhoneNumber());
		user.setAddress(signupRequestDto.getAddress());
		user.setDateOfBirth(signupRequestDto.getDateOfBirth());
		user.setPassword(passwordEncoder.encode(signupRequestDto.getPassword()));
		user.setRole("USER");
		user.setBalance(0.0);

		User savedUser =userRepository.save(user);
		String accountNumber = "ACC" + String.format("%04d", savedUser.getId());

		savedUser.setAccountNumber(accountNumber);

		userRepository.save(savedUser);
		
		try {
		    emailService.sendWelcomeEmail(user.getEmail(),user.getUsername(),user.getAccountNumber());
		    System.out.println("Email Sent Successfully");
		} catch (Exception e) {
		    System.out.println("Email failed");
		}
		System.out.println("sucess");
		return new SignupResponseDto("Account created successfully");
	}

	public LoginResponseDto login(LoginRequestDto loginRequestDto) {

		try {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(
							loginRequestDto.getEmail().trim().toLowerCase(),
							loginRequestDto.getPassword()));
			User user=(User) authentication.getPrincipal();
			String token=jwtTokenService.generateAccessToken(user);
			return new LoginResponseDto(
					user.getUsername(),user.getEmail(),user.getMobileNumber(),
					user.getAddress(),user.getDateOfBirth(),user.getAccountNumber(),
					Math.round(user.getBalance() * 100.0)/ 100.0,user.getRole(),user.getId(),token,"Login successful");
		}
		catch (Exception ex) {

			LoginResponseDto response = new LoginResponseDto();
	        response.setMessage("Invalid email or password");

	        return response;
	    }
	}

}
