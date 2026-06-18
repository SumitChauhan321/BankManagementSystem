package com.example.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dto.DashboardResponseDto;
import com.example.dto.DepositRequestDto;
import com.example.dto.RecentTransactionDto;
import com.example.dto.TransferRequestDto;
import com.example.dto.TransferResponseDto;
import com.example.dto.WithdrawRequestDto;
import com.example.dto.WithdrawResponseDto;
import com.example.entity.Transaction;
import com.example.entity.User;
import com.example.repository.TransactionRepository;
import com.example.repository.UserRepository;
import com.example.security.EmailService;

import jakarta.transaction.Transactional;

@Service
public class AccountService {

	@Autowired
	private TransactionRepository transactionRepository;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private EmailService emailService;
	

	@Transactional
	public Map<String, Object> deposit(DepositRequestDto dto) {

		User user=userRepository.findByAccountNumber(dto.getAccountNumber());

		if (user == null) {
	        throw new RuntimeException("Account not found");
	    }

	    if (dto.getAmount() <= 0) {
	        throw new RuntimeException("Invalid amount");
	    }
	    double newBalance=user.getBalance()+dto.getAmount();
	    user.setBalance(newBalance);
	    userRepository.save(user);

	    Transaction transaction=new Transaction();
	    transaction.setTransactionType("Deposit");

	    transaction.setAmount(dto.getAmount());
	    transaction.setDescription("Money Deposit");
	    transaction.setTransactionDate(LocalDate.now());
	    transaction.setSenderAccount(null);
	    transaction.setReceiverAccount(dto.getAccountNumber());
	    transaction.setBalanceAfterTransaction(newBalance);
	    transaction.setUser(user);
	    transaction = transactionRepository.save(transaction);

	    String txnId = "TXN" +
	            String.format("%05d", transaction.getId());

	    transaction.setTransactionId(txnId);

	    transactionRepository.save(transaction);

	    newBalance =
	            Math.round(newBalance * 100.0)
	            / 100.0;
	    
	    
	    emailService.sendDepositEmail(user.getEmail(), user.getUsername(), 
	    		dto.getAccountNumber(),dto.getAmount(), newBalance);
	    
	    return Map.of(
	            "message",
	            "Amount deposited successfully",
	            "balance",
	            newBalance,
	            "transactionId",
	            txnId
	    );
	}

	@Transactional
	public WithdrawResponseDto withdraw(WithdrawRequestDto dto) {

		User user=userRepository.findByAccountNumber(dto.getAccountNumber());
		if (user == null) {
	        throw new RuntimeException("Account not found");
	    }

	    if (dto.getAmount() <= 0) {
	        throw new RuntimeException("Invalid amount");
	    }

	    if (user.getBalance() < dto.getAmount()) {
	         return   new WithdrawResponseDto("Insufficient balance",user.getBalance());
	    }

	    double newBalance=user.getBalance()-dto.getAmount();
	    user.setBalance(newBalance);
	    userRepository.save(user);


	    Transaction transaction=new Transaction();
	    transaction.setTransactionType("Withdraw");

	    transaction.setAmount(dto.getAmount());
	    transaction.setDescription("Cash Withdraw");
	    transaction.setTransactionDate(LocalDate.now());
	    transaction.setSenderAccount(null);
	    transaction.setReceiverAccount(null);
	    transaction.setBalanceAfterTransaction(newBalance);
	    transaction.setUser(user);
	    transaction = transactionRepository.save(transaction);

	    String txnId = "TXN" +
	            String.format("%05d", transaction.getId());

	    transaction.setTransactionId(txnId);

	    transactionRepository.save(transaction);
	    double userBalance =Math.round(user.getBalance() * 100.0)/ 100.0;
	    
	    
	    
	    emailService.sendWithdrawEmail(user.getEmail(), user.getUsername(),
	    		dto.getAccountNumber(), dto.getAmount(), userBalance);

		return new WithdrawResponseDto("Amount withdrawn successfully",userBalance);
	}

	public String checkReceiver(String accountNumber) {
		User user=userRepository.findByAccountNumber(accountNumber);
		if(user==null) {
			return "Receiver account not found";
		}
		return "User exists";
	}

	@Transactional
	public TransferResponseDto transfer(TransferRequestDto dto) {

		System.out.println(dto.getSenderNumber());
		System.out.println(dto.getReceiverNumber());
		System.out.println(dto.getAmount());

		User sender=userRepository.findByAccountNumber(dto.getSenderNumber());
		User receiver=userRepository.findByAccountNumber(dto.getReceiverNumber());
		if(receiver==null) {
			return new TransferResponseDto("User does not exists",sender.getBalance());
		}
		if(sender.getBalance()<dto.getAmount()) {
			return new TransferResponseDto("Insufficient balance",sender.getBalance());
		}
		double newBalance=sender.getBalance()-dto.getAmount();
		sender.setBalance(newBalance);
		receiver.setBalance(receiver.getBalance()+dto.getAmount());

		userRepository.save(sender);
		userRepository.save(receiver);



		Transaction transaction=new Transaction();
	    transaction.setTransactionType("Transfer");

	    transaction.setAmount(dto.getAmount());
	    transaction.setDescription("Transer to "+receiver.getUsername());
	    transaction.setTransactionDate(LocalDate.now());
	    transaction.setSenderAccount(sender.getAccountNumber());
	    transaction.setReceiverAccount(receiver.getAccountNumber());
	    transaction.setBalanceAfterTransaction(newBalance);
	    transaction.setUser(sender);
	    transaction = transactionRepository.save(transaction);

	    String txnId = "TXN" +
	            String.format("%05d", transaction.getId());

	    transaction.setTransactionId(txnId);

	    transactionRepository.save(transaction);
	    newBalance =Math.round(newBalance * 100.0)/ 100.0;
	    
	    
	    emailService.sendTransferEmail(sender.getEmail(), sender.getUsername(), 
	    		receiver.getUsername(), dto.getAmount(), sender.getBalance());
	    
	    
	    
	    emailService.sendReceiveEmail(receiver.getEmail(), receiver.getUsername(),
	    		sender.getUsername(), dto.getAmount(), receiver.getBalance());

		return new TransferResponseDto("Amount transferred successfully",newBalance);
	}


	public DashboardResponseDto dashboard(
	        Long userId) {
		List<Transaction> transactions =transactionRepository.findByUserId(userId);
		List<Transaction> recentTransactions =transactionRepository.findTop4ByUserIdOrderByIdDesc(userId);
		double totalDeposit = transactions.stream().filter(t ->"Deposit".equalsIgnoreCase(t.getTransactionType()))
	            .mapToDouble(Transaction::getAmount).sum();

	    double totalWithdraw = transactions.stream()
	            .filter(t ->"Withdraw".equalsIgnoreCase(t.getTransactionType()))
	            .mapToDouble(Transaction::getAmount).sum();

	    totalDeposit =
	            Math.round(totalDeposit * 100.0)
	            / 100.0;

	    totalWithdraw =
	            Math.round(totalWithdraw * 100.0)
	            / 100.0;
	    DashboardResponseDto dto =new DashboardResponseDto();

	    dto.setList(recentTransactions);

	    dto.setTotalDeposit(totalDeposit);

	    dto.setTotalWithdraw(totalWithdraw);

	    dto.setTotalTransaction(transactions.size());
		System.out.println(String.format("%.2f",totalDeposit));

		return dto;
	}

	public RecentTransactionDto recentTransaction(Long userId) {
		List<Transaction> transactions =transactionRepository.findByUserId(userId);
		List<Transaction> recentTransactions =transactionRepository.findTop10ByUserIdOrderByIdDesc(userId);
		double totalDeposit = transactions.stream().filter(t ->"Deposit".equalsIgnoreCase(t.getTransactionType()))
	            .mapToDouble(Transaction::getAmount).sum();

	    double totalWithdraw = transactions.stream()
	            .filter(t ->"Withdraw".equalsIgnoreCase(t.getTransactionType()))
	            .mapToDouble(Transaction::getAmount).sum();

	    totalDeposit =Math.round(totalDeposit * 100.0)/ 100.0;

	    totalWithdraw =Math.round(totalWithdraw * 100.0)/ 100.0;

	    double totalTransfer=transactions.stream().filter(t->"Transfer".equalsIgnoreCase(t.getTransactionType()))
	    		.mapToDouble(Transaction::getAmount).sum();
	    totalTransfer=Math.round(totalTransfer * 100.0)/ 100.0;

	    RecentTransactionDto dto=new RecentTransactionDto();
	    dto.setList(recentTransactions);
	    dto.setTotalDeposit(totalDeposit);
	    dto.setTotalTransation(transactions.size());
	    dto.setTotalTransfer(totalTransfer);
	    dto.setTotalWithdraw(totalWithdraw);

		return dto;
	}



}
