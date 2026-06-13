package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.EmailCheckResponseDto;
import com.example.dto.LoginRequestDto;
import com.example.dto.LoginResponseDto;
import com.example.dto.SignupRequestDto;
import com.example.dto.SignupResponseDto;
import com.example.security.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {
	
	@Autowired
	private AuthService authService;
	
	@GetMapping("/check-email")
	public ResponseEntity<EmailCheckResponseDto> checkEmail(@RequestParam("email") String email){
		return ResponseEntity.ok(authService.checkEmail(email));
	}
	
	@PostMapping("/signup")
	public ResponseEntity<SignupResponseDto> signup(@RequestBody SignupRequestDto signupRequestDto){
		 return ResponseEntity.status(HttpStatus.CREATED).body(authService.signup(signupRequestDto));
	} 
	
	@PostMapping("/login")
	public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto){
		
		LoginResponseDto response=authService.login(loginRequestDto);

	    if (response.getToken() == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                .body(response);
	    }

	    return ResponseEntity.ok(response);
	}

}
