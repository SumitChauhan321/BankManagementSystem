package com.example.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.DashboardResponseDto;
import com.example.dto.DepositRequestDto;
import com.example.dto.RecentTransactionDto;
import com.example.dto.TransferRequestDto;
import com.example.dto.TransferResponseDto;
import com.example.dto.WithdrawRequestDto;
import com.example.dto.WithdrawResponseDto;
import com.example.repository.UserRepository;
import com.example.service.AccountService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AccountController {

	@Autowired
	private AccountService accountService;
	@Autowired
	private UserRepository userRepository;

	@PostMapping("/deposit-money")
	public ResponseEntity<Map<String, Object>> depositMoney(@RequestBody DepositRequestDto depositRequestDto){
		return ResponseEntity.ok(accountService.deposit(depositRequestDto));
	}


	@PostMapping("/withdraw-money")
	public ResponseEntity<WithdrawResponseDto> withdraw(@RequestBody WithdrawRequestDto dto){
		return ResponseEntity.ok(accountService.withdraw(dto));
	}

	@GetMapping("/check-receiver")
	public ResponseEntity<String> checkRecevier(@RequestParam("receiverNumber") String accountNumber){
		return ResponseEntity.ok(accountService.checkReceiver(accountNumber));
	}

	@PostMapping("/transfer-money")
	public ResponseEntity<TransferResponseDto> transferMoney(@RequestBody TransferRequestDto transferRequestDto){
		return ResponseEntity.ok(accountService.transfer(transferRequestDto));
	}

	@GetMapping("/dashboard")
	public ResponseEntity<DashboardResponseDto> dashboard(@RequestParam("userId") Long userId){
		return ResponseEntity.ok(accountService.dashboard(userId));
	}


	@GetMapping("/recent-transaction")
	public ResponseEntity<RecentTransactionDto> recentTransaction(@RequestParam("userId") Long userId){
		return ResponseEntity.ok(accountService.recentTransaction(userId));
	}
















}
